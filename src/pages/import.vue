<template>
  <section class="import-page">
    <nav class="import-navigation">
      <Button :link="{ name: 'settings', query: { slug: 'settings_tabs_profile' }}">
        <BackIcon />
      </Button>
      <Button v-if="isImported" look="with-icon" @click="chooseFile">
        {{ t('import_update_file') }}
        <FileIcon />
      </Button>
      <h1>{{ t('import_h1') }}</h1>
      <Button v-if="isImported" look="submit" @click.prevent="finalImport">{{ t('import_import') }}</Button>
    </nav>

    <p class="import-info text-regular">{{ t('import_info') }}</p>

    <Button
      v-show="!isImported"
      look="submit"
      class="import-import"
      @click.self.prevent="chooseFile"
    >
      <input
        ref="fileInput"
        type="file"
        accept=".xlx,.xlsx"
        @change="changeFile"
      >
      {{ t('import_xls') }}
    </Button>

    <p class="import-error text-regular text-color-error">{{ error }}</p>

    <div v-if="isImported" :style="styles" class="import-table">
      <div v-for="(header, i) in data.headers" :key="i" class="import-table_header">
        <div class="import-table_header_title">
          <h3 class="text-ellipsis">{{ header.name }}</h3>
          <XIcon @click="removeColumn(i)" />
        </div>
        <Dropdown :items="filteredColumns" @select="chooseColumn(header.name, $event)">
          <template #default>
            {{ header.chosen ? t(header.chosen.name) : t('import_choose_field') }}
          </template>
          <template #option="{item}">
            {{ t(item.name) }}
          </template>
        </Dropdown>
      </div>

      <template v-for="(row, i) in data.rows">
        <div
          v-for="(item, j) in row"
          :key="i.toString() + j"
          :class="{first: j === 0}"
          class="import-table_cell"
        >
          <XIcon v-if="j === 0" @click="removeRow(i)" />
          <span class="text-regular text-ellipsis">
            {{ item }}
          </span>
        </div>
      </template>
    </div>
  </section>
</template>

<script lang="ts">
import '../assets/styles/pages/import.css';
import {
  computed, defineComponent, reactive, ref,
} from 'vue';
import type { ImportResponse, ImportSheet } from '../utils/api/import';
import type { AddTransactionBody } from '../utils/api/transactions';
import useTranslation from '../utils/useTranslation';
import api from '../utils/api';
import Dropdown from '../components/dropdown/index.vue';
import Button from '../components/button/index.vue';
import BackIcon from '../assets/icons/back.svg';
import FileIcon from '../assets/icons/file.svg';
import XIcon from '../assets/icons/x.svg';

type ColumnType = {slug: string|null, name: string};
const COLUMNS: ColumnType[] = [
  {
    slug: null,
    name: 'import_choose_field',
  },
  {
    slug: 'date',
    name: 'import_date', // Is taken from the translations like t('import_date')
  },
  {
    slug: 'title',
    name: 'import_name',
  },
  {
    slug: 'category',
    name: 'import_category',
  },
  {
    slug: 'price',
    name: 'import_price',
  },
];

const REQUIRED_COLUMNS = [
  'date',
  'title',
  'price',
  'category',
];

type HeadersType = { name: string, chosen: ColumnType|null }[];
type RowsType = (string|number|null)[][];
interface DataType {
  all: ImportResponse|null,
  activeSheet: string|null,
  sheet: ImportSheet|null,
  rows: RowsType,
  headers: HeadersType,
}

export default defineComponent({
  name: 'ImportPage',
  components: {
    Dropdown,
    Button,
    BackIcon,
    FileIcon,
    XIcon,
  },
  setup () {
    const t = useTranslation();
    const error = ref<string>('');
    const fileInput = ref<HTMLInputElement>();

    const data = reactive<DataType>({
      all: null,
      activeSheet: null,
      sheet: null,
      rows: [],
      headers: [],
    });

    const styles = computed(() => ({
      '--headers-length': data.headers.length || 0,
    }));

    const isImported = computed<boolean>(() => !!data.sheet);

    const chosenColumns = computed<string[]>(() => data.headers
      .map((header) => (header.chosen ? header.chosen.slug : null))
      .filter((slug) => !!slug) as string[]);

    const filteredColumns = computed<{slug: string|null, name: string}[]>(() => COLUMNS
      .filter((column) => (!column.slug ? false : !chosenColumns.value.includes(column.slug))));

    const chooseColumn = (header: string, column: ColumnType) => {
      const found = data.headers.find((item) => item.name === header);
      if (!found) return;

      found.chosen = column.slug === null ? null : column;
    };

    const updateData = (importResponse: ImportResponse) => {
      const sheetName = Object.keys(importResponse.sheets)?.[0] || null;
      if (!sheetName) return;

      const chosenSheet = importResponse.sheets[sheetName];
      data.all = importResponse;
      data.activeSheet = sheetName;
      data.sheet = chosenSheet;
      data.headers = chosenSheet.headers.map((header: string) => ({
        name: header,
        chosen: null,
      }));
      data.rows = chosenSheet.data;
    };

    const chooseFile = () => {
      fileInput.value?.click();
    };

    const changeFile = async (e: InputEvent) => {
      error.value = '';

      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const res = await api.import.parseXLS(file);
        if (typeof res === 'string') {
          error.value = res;
          return;
        }

        updateData(res);
      }
    };

    const removeRow = (index: number) => {
      data.rows = data.rows.filter((_, i) => i !== index);
    };

    const removeColumn = (index: number) => {
      data.headers = data.headers.filter((_, i) => i !== index);
      for (const row of data.rows) { // eslint-disable-line no-restricted-syntax
        row.splice(index, 1);
      }
    };

    const checkColumns = (): boolean => {
      const difference = REQUIRED_COLUMNS.filter((item) => chosenColumns.value.indexOf(item) < 0);
      return !difference.length;
    };

    const finalImport = async (): Promise<void> => {
      if (!data.sheet || !checkColumns()) return;

      // Place header slugs into an array with indexes that properly correspond with rows
      const headerIndexes: (string|null)[] = [];
      data.headers.forEach((column) => {
        headerIndexes.push(column.chosen?.slug || null);
      });

      // Make data rows become a transaction by connecting them with chosen headers
      const constructRow = ((row: (string | number | null)[]) => {
        const rowData: AddTransactionBody = {
          type: 'loss',
          title: '',
          price: '',
          category: '',
          currency: '',
          description: '',
          isTemplate: false,
        };

        headerIndexes.forEach((col: keyof AddTransactionBody|string|null, i) => {
          if (col) {
            // @ts-ignore
            rowData[col] = row[i];
          }
        });

        return rowData;
      });

      // Group assigned transactions into packs of 10
      const rowGroups: AddTransactionBody[][] = [];
      data.rows.forEach((row, i) => {
        if (i % 10 === 0) {
          rowGroups.push([constructRow(row)]);
        } else {
          const lastGroup = rowGroups[rowGroups.length - 1];
          lastGroup.push(constructRow(row));
        }
      });

      const requests = rowGroups.map((group) => api.import.create(group));
      const responses = await Promise.all(requests);
      console.log(responses);
    };

    return {
      t,
      error,
      styles,
      fileInput,
      isImported,
      data,
      filteredColumns,
      COLUMNS,
      chooseColumn,
      chooseFile,
      changeFile,
      removeRow,
      removeColumn,
      finalImport,
    };
  },
});
</script>
