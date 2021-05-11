<template>
  <div class="statistics-categories">
    <div class="statistics-categories_diagram">
      <DonutChart :values="CATEGORIES" />
    </div>

    <div class="statistics-categories_list">
      <StatisticRow
        v-for="(category, i) in CATEGORIES"
        :key="i"
        :price="category.price"
        class="statistics-categories_list_item"
      >
        <Category :color="category.color" :name="category.name" />
      </StatisticRow>
    </div>

    <div class="statistics-categories_totals">
      <div class="statistics-categories_totals_section">
        <StatisticRow label="Total loss" price="-46000" />
        <StatisticRow label="Total gain" price="+24000" is-gain />
      </div>
      <div class="statistics-categories_totals_section">
        <StatisticRow label="Delta" price="-22000" is-loss />
      </div>
    </div>

    <Button link="#">More statistics</Button>
  </div>
</template>

<script lang="ts">
import './categories.css';
import { defineComponent } from 'vue';
import Category from '../category/index.vue';
import StatisticRow from './statistic-row.vue';
import Button from '../button/index.vue';
import DonutChart from './donut.vue';

const CATEGORIES = [
  {
    name: 'Food',
    price: 12490,
    color: 2,
  },
  {
    name: 'Transport',
    price: 240,
    color: 6,
  },
  {
    name: 'Cloths',
    price: 3600,
    color: 16,
  },
  {
    name: 'Services and subscriptions',
    price: 700,
    color: 9,
  },
  {
    name: 'Parties',
    price: 8627,
    color: 21,
  },
  {
    name: 'Health',
    price: 5107,
    color: 1,
  },
  {
    name: 'Travels',
    price: 0,
    color: 12,
  },
  {
    name: 'Miscellaneous',
    price: 854,
    color: 18,
  },
];

export default defineComponent({
  name: 'StatisticsCategories',
  components: {
    DonutChart,
    Button,
    StatisticRow,
    Category,
  },
  props: {},
  setup () {
    return {
      CATEGORIES,
    };
  },
});
</script>
