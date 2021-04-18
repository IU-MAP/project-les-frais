<template>
  <div class="transactions-list">
    <MonthPicker />

    <div class="transactions-list_grid">
      <div class="transactions-list_day">
        <Transaction />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import './list.css';
import { defineComponent } from 'vue';
import Transaction from './transaction.vue';
import MonthPicker from './month-picker.vue';

export default defineComponent({
  name: 'TransactionsList',
  components: {
    MonthPicker,
    Transaction,
  },
  props: {
  },
});
</script>
