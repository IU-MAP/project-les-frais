<template>
  <section class="dashboard-page">
    <div class="dashboard-page_list">
      <TransactionAddForm />
      <TransactionsList />
    </div>
    <div class="dashboard-page_statistics">
      <StatisticsCategories />
    </div>
  </section>
</template>

<script lang="ts">
import '../assets/styles/pages/dashboard.css';
import { defineComponent } from 'vue';
import TransactionAddForm from '../components/transactions/add-form.vue';
import TransactionsList from '../components/transactions/list.vue';
import StatisticsCategories from '../components/statistics/categories.vue';

export default defineComponent({
  components: {
    StatisticsCategories,
    TransactionAddForm,
    TransactionsList,
  },
});
</script>
