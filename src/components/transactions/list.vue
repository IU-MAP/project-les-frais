<template>
  <div class="transactions-list">
    <MonthPicker
      v-model:year="year"
      v-model:month="month"
      @update:month="updateList"
    />

    <div class="transactions-list_grid">
      <div class="transactions-list_day">
        <p class="transactions-list_day_title">
          25<sup>th</sup>
        </p>
        <div class="transactions-list_list">
          <Transaction />
          <Transaction />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import './list.css';
import { defineComponent, ref } from 'vue';
import Transaction from './transaction.vue';
import MonthPicker from './month-picker.vue';
import api from '../../utils/api';

export default defineComponent({
  name: 'TransactionsList',
  components: {
    MonthPicker,
    Transaction,
  },
  props: {
  },
  async setup () {
    const transactions = ref<Transaction[]>(null);

    const date = new Date();
    const month = ref(date.getMonth() + 1);
    const year = ref(date.getFullYear());

    const updateList = async () => {
      transactions.value = await api.transactions.read({
        month: month.value,
        year: year.value,
      });
    };

    transactions.value = await updateList();

    return {
      transactions,
      month,
      year,
      updateList,
    };
  },
});
</script>
