<template>
  <div class="donut-chart">
    <div class="donut-chart_wrapper">
      <div
        v-for="(item, i) in extendedValues"
        :key="i"
        :style="{'clip-path': `polygon(${item.angle})`, transform: `rotate(${45 + item.rotate}deg)`}"
        :class="'color-number-' + item.color"
        class="donut-chart_piece"
      />

      <div class="donut-chart_center">
        <p class="text-small">{{ truncateMoney(totalAmount) }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import './donut.css';
import {
  computed, defineComponent, PropType,
} from 'vue';
import { truncateMoney } from '../../utils/format-money';

interface ValueType {
  name: string,
  price: number,
  color: number,
}

export default defineComponent({
  name: 'DonutChart',
  props: {
    values: {
      type: Array as PropType<ValueType[]>,
      default: () => ([]),
    },
  },
  setup (props) {
    const totalAmount = computed<number>(() => props.values
      .reduce((accum, currentValue) => {
        accum += currentValue.price;
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

      const sorted = [...props.values].sort((a, b) => b.price - a.price);
      return sorted.map((val) => {
        const percent = val.price / totalAmount.value;
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
      totalAmount,
      extendedValues,
      truncateMoney,
    };
  },
});
</script>
