<template>
  <div class="transactions-list">
    <MonthPicker />

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
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    transactions.value = await api.transactions.read({ month, year });

    return {
      transactions,
    };
  },
});
</script>
