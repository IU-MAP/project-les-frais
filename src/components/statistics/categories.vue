<template>
  <transition name="fade">
    <div v-if="categories.length" class="statistics-categories">
      <div class="statistics-categories_diagram">
        <DonutChart :values="categories" />
      </div>

      <div class="statistics-categories_list">
        <StatisticRow
          v-for="(category, i) in categories"
          :key="i"
          :price="category.transactions_sum || 0"
          class="statistics-categories_list_item"
        >
          <Category :color="category.color" :name="category.name" />
        </StatisticRow>
      </div>

      <div class="statistics-categories_totals">
        <div class="statistics-categories_totals_section">
          <StatisticRow label="Total loss" :price="`-${totalLoss}`" />
          <StatisticRow label="Total gain" price="+0" is-gain />
        </div>
        <div class="statistics-categories_totals_section">
          <StatisticRow label="Delta" :price="`-${totalLoss}`" is-loss />
        </div>
      </div>

      <Button link="#">More statistics</Button>
    </div>
  </transition>
</template>

<script lang="ts">
import './categories.css';
import {
  computed,
  defineComponent,
  PropType,
  ref,
  watchEffect,
} from 'vue';
import Category from '../category/index.vue';
import StatisticRow from './statistic-row.vue';
import Button from '../button/index.vue';
import DonutChart from './donut.vue';
import api from '../../utils/api';
import { CategoryStatistics } from '../../utils/api/statistics';

export default defineComponent({
  name: 'StatisticsCategories',
  components: {
    DonutChart,
    Button,
    StatisticRow,
    Category,
  },
  props: {
    date: {
      type: Object as PropType<({ year: number, month: number }) | null>,
      default: null,
    },
    updateVal: {
      type: Object,
      default: null,
    },
  },
  setup (props) {
    const categories = ref<CategoryStatistics[]>([]);
    const totalLoss = computed<number>(() => categories.value.reduce((accum, currentValue) => {
      accum += currentValue.transactions_sum || 0;
      return accum;
    }, 0));

    watchEffect(async () => {
      if (props.date || props.updateVal) {
        categories.value = await api.statistics.categories(props.date);
      }
    });

    return {
      categories,
      totalLoss,
    };
  },
});
</script>
