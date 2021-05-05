<template>
  <div class="transactions-list">
    <div class="transactions-list_toolbar">
      <div v-if="selection.length" class="transactions-list_toolbar_selection">
        <Button @click="cancelSelection">
          <XIcon />
          {{ t('cancel') }}
        </Button>
        <Button look="remove" @click="removeSelected">
          <TrashIcon />
          {{ t('remove') }} ({{ selection.length }})
        </Button>
      </div>

      <MonthPicker
        v-else-if="!templates"
        v-model:year="year"
        v-model:month="month"
        @update:month="updateList"
      />
    </div>

    <div class="transactions-list_grid">
      <h3 v-if="!Object.keys(transactions).length" class="no-transactions">
        {{ t('dashboard_no_transactions') }}
      </h3>

      <template v-else>
        <div
          v-for="(day, dayNumber) in transactions"
          :key="dayNumber"
          class="transactions-list_day"
        >
          <p v-if="!templates" class="transactions-list_day_title">
            {{ dayNumber }}<component
              :is="getOrdinalTranslation(dayNumber, month).tag"
              v-if="getOrdinalTranslation(dayNumber, month)"
            >
              {{ getOrdinalTranslation(dayNumber, month).suffix }}
            </component>
          </p>

          <div :class="{selection: !!selection.length}" class="transactions-list_list">
            <Transaction
              v-for="transaction in day"
              :key="transaction.id"
              :transaction="transaction"
              :class="{selected: selection.includes(transaction.id)}"
              :editing="editingId === transaction.id"
              :is-template="templates"
              @remove="removeTransaction(transaction.id)"
              @select="toggleSelection(transaction.id)"
              @click="addToSelection(transaction.id)"
              @edit="editingId = transaction.id"
              @update="afterEdit"
            />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import './list.css';
import {
  computed,
  defineComponent, PropType, ref, watch,
} from 'vue';
import type { Transaction as TransactionType } from '../../utils/api/transactions';
import useTranslation from '../../utils/useTranslation';
import getOrdinalTranslation from '../../utils/ordinal-number';
import api from '../../utils/api';
import Transaction from './transaction.vue';
import MonthPicker from './month-picker.vue';
import Button from '../button/index.vue';
import XIcon from '../../assets/icons/x.svg';
import TrashIcon from '../../assets/icons/trash.svg';
import useStore from '../../store';

export default defineComponent({
  name: 'TransactionsList',
  components: {
    Button,
    MonthPicker,
    Transaction,
    XIcon,
    TrashIcon,
  },
  props: {
    updateVal: {
      type: Object as PropType<TransactionType>,
      default: null,
    },
    templates: {
      type: Boolean,
      default: false,
    },
  },
  async setup (props) {
    const t = useTranslation();
    const store = useStore();

    const items = ref<TransactionType[]>([]);
    const templateItems = computed<TransactionType[]>(() => store.state.templates);
    const transactions = computed<Record<string, TransactionType[]>>(() => {
      if (props.templates) {
        return { 1: templateItems.value };
      }

      return items.value.reduce((accum, current) => {
        const day = new Date(current.date).getDate();
        if (!accum[day]) {
          accum[day] = [current];
        } else {
          accum[day].push(current);
        }
        return accum;
      }, {} as Record<number, TransactionType[]>);
    });

    const date = new Date();
    const month = ref(date.getMonth() + 1);
    const year = ref(date.getFullYear());

    const selection = ref<number[]>([]);
    const editingId = ref<number|null>(null);

    const updateList = async () => {
      const reqData = props.templates ? {
        isTemplate: true,
      } : {
        month: month.value,
        year: year.value,
        isTemplate: false,
      };

      if (props.templates) {
        await store.dispatch('changeTemplates');
      } else {
        items.value = await api.transactions.read(reqData);
      }
    };

    const removeTransaction = async (id: number) => {
      await api.transactions.delete(id);
      await updateList();
    };

    const toggleSelection = (id: number) => {
      if (selection.value.includes(id)) {
        selection.value = selection.value.filter((val) => val !== id);
      } else {
        selection.value = [...selection.value, id];
      }
    };

    const addToSelection = (id: number) => {
      if (!selection.value.length) return;
      toggleSelection(id);
    };

    const cancelSelection = () => {
      selection.value = [];
    };

    const removeSelected = async () => {
      await Promise.all(selection.value.map(async (id) => api.transactions.delete(id)));
      selection.value = [];
      await updateList();
    };

    const afterEdit = () => {
      editingId.value = null;
      updateList();
    };

    watch(() => props.updateVal, (newVal: TransactionType) => {
      if (newVal?.isTemplate) {
        updateList();
        return;
      }

      if (!newVal || !newVal.date) return;

      const newDate = new Date(newVal.date);
      if (newDate.getMonth() + 1 === month.value && newDate.getFullYear() === year.value) {
        updateList();
      }
    });

    if (!props.templates) {
      await updateList();
    }

    return {
      t,
      transactions,
      month,
      year,
      selection,
      editingId,
      updateList,
      getOrdinalTranslation,
      removeTransaction,
      toggleSelection,
      addToSelection,
      cancelSelection,
      removeSelected,
      afterEdit,
    };
  },
});
</script>
