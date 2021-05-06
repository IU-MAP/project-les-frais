<template>
  <section class="import-page">
    <nav class="import-navigation">
      <Button :link="{ name: 'settings', query: { slug: 'settings_tabs_profile' }}">
        <BackIcon />
      </Button>
      <Button look="with-icon">
        {{ t('import_update_file') }}
        <FileIcon />
      </Button>
      <h1>{{ t('import_h1') }}</h1>
      <Button look="submit">{{ t('import_import') }}</Button>
    </nav>

    <p class="import-info text-regular">{{ t('import_info') }}</p>
    <p class="import-error text-regular text-color-error">{{ error }}</p>

    <div :style="styles" class="import-table">
      <div class="import-table_header" v-for="(header, i) in HEADERS" :key="i">
        <div class="import-table_header_title">
          <h3 class="text-ellipsis">{{ header.name }}</h3>
          <XIcon />
        </div>
        <Dropdown :items="COLUMNS" @select="chooseColumn(header.name, $event)">
          <template #default>
            {{ header.chosen ? t(header.chosen.name) : t('import_choose_field') }}
          </template>
          <template #option="{item}">
            {{ t(item.name) }}
          </template>
        </Dropdown>
      </div>

      <template v-for="(row, i) in ROWS">
        <div
          v-for="(item, j) in row"
          :key="i.toString() + j"
          :class="{first: j === 0}"
          class="import-table_cell"
        >
          <XIcon v-if="j === 0" />
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
  computed, defineComponent, ref,
} from 'vue';
import useTranslation from '../utils/useTranslation';
import Button from '../components/button/index.vue';
import BackIcon from '../assets/icons/back.svg';
import FileIcon from '../assets/icons/file.svg';
import XIcon from '../assets/icons/x.svg';
import Dropdown from '../components/dropdown/index.vue';

const HEADERS: { name: string, chosen: { slug: string, name: string }|null }[] = [
  {
    name: 'Title',
    chosen: null,
  },
  {
    name: 'Cat',
    chosen: null,
  },
  {
    name: 'Date',
    chosen: null,
  },
  {
    name: 'Time',
    chosen: null,
  },
  {
    name: 'Sum',
    chosen: null,
  },
];

const ROWS = [
  ['Row', '', '2020-03-14', '16:14:11', '5420'],
  ['New iPhone', 'tech', '2020-03-14', '', '86000'],
  ['Dinner', 'Food', '2020-03-15', '20:17:18', '86000'],
];

const COLUMNS = [
  {
    slug: 'date',
    name: 'import_date', // Is taken from the translations like t('import_date')
  },
  {
    slug: 'name',
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

    const styles = computed<number>(() => ({
      '--headers-length': HEADERS.length,
    }));

    const chooseColumn = (header: string, column: { slug: string, name: string }) => {
      const found = HEADERS.find((item) => item.name === header);
      found.chosen = column;
    };

    return {
      t,
      error,
      styles,
      HEADERS,
      ROWS,
      COLUMNS,
      chooseColumn,
    };
  },
});
</script>
