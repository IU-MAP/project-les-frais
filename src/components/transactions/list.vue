<template>
  <div class="transactions-list">
    <MonthPicker
      v-model:year="year"
      v-model:month="month"
      @update:month="updateList"
    />

    <div class="transactions-list_grid">
      <h3 v-if="!Object.keys(transactions).length" class="no-transactions">
        No transactions found for this period
      </h3>

      <template v-else>
        <div
          v-for="(day, dayNumber) in transactions"
          :key="dayNumber"
          class="transactions-list_day"
        >
          <p class="transactions-list_day_title">
            {{ dayNumber }}<sup>th</sup>
          </p>

          <div class="transactions-list_list">
            <Transaction
              v-for="transaction in day"
              :key="transaction.id"
              :transaction="transaction"
            />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import './list.css';
import { defineComponent, ref } from 'vue';
import Transaction from './transaction.vue';
import MonthPicker from './month-picker.vue';
import { Transaction as TransactionType } from '../../utils/api/transactions';
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
    const transactions = ref<Record<string, TransactionType[]>>({});

    const date = new Date();
    const month = ref(date.getMonth() + 1);
    const year = ref(date.getFullYear());

    const updateList = async () => {
      const res = await api.transactions.read({
        month: month.value,
        year: year.value,
      });

      transactions.value = res.reduce((accum, current) => {
        const day = new Date(current.date).getDate();
        if (!accum[day]) {
          accum[day] = [current];
        } else {
          accum[day].push(current);
        }
        return accum;
      }, {} as Record<number, TransactionType[]>);
    };

    await updateList();

    return {
      transactions,
      month,
      year,
      updateList,
    };
  },
});
</script>
