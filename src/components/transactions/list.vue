<template>
  <div class="transactions-list">
    <MonthPicker />
    <Transaction />
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
