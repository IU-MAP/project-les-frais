<template>
  <section class="dashboard-page">
    <div class="dashboard-page_list">
      <TransactionAddForm @update="update" />

      <suspense>
        <TransactionsList :update-val="updateVal" />
        <template #fallback>
          <div />
        </template>
      </suspense>
    </div>
    <div class="dashboard-page_statistics">
      <StatisticsCategories />
    </div>
  </section>
</template>

<script lang="ts">
import '../assets/styles/pages/dashboard.css';
import { defineComponent, ref } from 'vue';
import type { Transaction } from '../utils/api/transactions';
import TransactionAddForm from '../components/transactions/add-form.vue';
import TransactionsList from '../components/transactions/list.vue';
import StatisticsCategories from '../components/statistics/categories.vue';

export default defineComponent({
  components: {
    StatisticsCategories,
    TransactionAddForm,
    TransactionsList,
  },
  setup () {
    const updateVal = ref<Transaction|null>(null);

    const update = (val: Transaction) => {
      updateVal.value = val;
    };

    return {
      update,
      updateVal,
    };
  },
});
</script>
