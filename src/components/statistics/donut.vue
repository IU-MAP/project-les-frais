<template>
  <div class="donut-chart">
    <div class="donut-chart_wrapper">
      <div
        v-for="(item, i) in extendedValues"
        :key="i"
        :style="{'clip-path': `polygon(${item.angle})`, transform: `rotate(${45 + item.rotate}deg)`}"
        :class="'color-number-' + item.color"
        class="donut-chart_piece"
        @mouseenter="hovered = item"
        @mouseleave="hovered = null"
      />

      <div class="donut-chart_center">
        <p class="text-small">{{ truncateMoney(totalAmount) }}</p>
      </div>
    </div>

    <div v-if="hovered" class="donut-chart_info">
      <Dot :number="hovered.color" />
      <span class="text-small text-ellipsis">{{ hovered.name }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import './donut.css';
import {
  computed, defineComponent, PropType, ref,
} from 'vue';
import { truncateMoney } from '../../utils/format-money';
import Dot from '../dot/index.vue';

interface ValueType {
  name: string,
  transactions_sum: number,
  color: number,
}

export default defineComponent({
  name: 'DonutChart',
  components: { Dot },
  props: {
    values: {
      type: Array as PropType<ValueType[]>,
      default: () => ([]),
    },
  },
  setup (props) {
    const hovered = ref<ValueType|null>(null);

    const totalAmount = computed<number>(() => props.values
      .reduce((accum, currentValue) => {
        accum += currentValue.transactions_sum;
        return accum;
      }, 0));

    const drawClipPath = (angle: number): string => {
      /**
       * Radians is actually a percentage value of the length of a square border that is opposite to the
       * inner angle made between two diagonals of the square. Calculated using the knowledge that:
       * diagonal = border*sqrt(2). If diagonal is of size 2, than border = 2/sqrt(2).
       * Then, we can get the opposite border using sine theorem. Finishing formula is below.
       */
      const countable = angle % 90;
      const radians = (Math.sin((countable * Math.PI) / 180) / Math.sin(((135 - countable) * Math.PI) / 180)) * (Math.sqrt(2) / 2) * 100;

      /** Rectangular clip-path string generation. The points are repeated for the better transitions. */
      if (angle <= 90) return `0% 0%, ${radians}% 0%, ${radians}% 0%, ${radians}% 0%, ${radians}% 0%, 50% 50%`;
      if (angle <= 180) return `0% 0%, 100% 0%, 100% ${radians}%, 100% ${radians}%, 100% ${radians}%, 50% 50%`;
      if (angle <= 270) return `0% 0%, 100% 0%, 100% 100%, ${radians}% 100%, ${radians}% 100%, 50% 50%`;
      if (angle <= 360) return `0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% ${radians}%, 50% 50%`;
      return '';
    };

    const extendedValues = computed(() => {
      /** Persist previous angle (45deg is initial, written in template) */
      let rotate = 0;

      const sorted = [...props.values].sort((a, b) => b.transactions_sum - a.transactions_sum);
      return sorted.map((val) => {
        const percent = val.transactions_sum / totalAmount.value;
        const item = {
          ...val,
          percent: `${percent * 100}%`,
          angle: drawClipPath(percent * 360),
          rotate,
        };

        rotate += percent * 360;
        return item;
      });
    });

    return {
      hovered,
      totalAmount,
      extendedValues,
      truncateMoney,
    };
  },
});
</script>
