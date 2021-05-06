<template>
  <div class="statistic-row">
    <slot>
      <span class="text-regular">{{ label }}</span>
    </slot>
    <span class="dots" />
    <span :class="{'text-color-success': isGain, 'text-color-error': isLoss}" class="price">{{ price }}</span>
  </div>
</template>

<script lang="ts">
import './statistic-row.css';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'StatisticRow',
  props: {
    label: {
      type: String,
      default: '',
    },
    price: {
      type: String,
      required: true,
    },
    isGain: {
      type: Boolean,
      default: false,
    },
    isLoss: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
