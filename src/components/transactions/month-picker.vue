<template>
  <div class="month-picker">
    <Button class="prev" @click="change(false)">
      <ChevronIcon />
    </Button>
    <h2>
      {{ monthName }}, {{ year }}
    </h2>
    <Button class="next" @click="change(true)">
      <ChevronIcon />
    </Button>
  </div>
</template>

<script lang="ts">
import './month-picker.css';
import { defineComponent, computed } from 'vue';
import ChevronIcon from '../../assets/icons/chevron-down.svg';
import Button from '../button/index.vue';
import { MONTH_NAMES } from '../../utils/format-date';
import useStore from '../../store';

export default defineComponent({
  name: 'MonthPicker',
  components: {
    Button,
    ChevronIcon,
  },
  props: {
    month: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
  },
  emits: ['update:month', 'update:year'],
  setup (props, context) {
    const store = useStore();

    const monthName = computed(() => MONTH_NAMES[store.state.language][props.month - 1]);

    const change = (isNext: boolean) => {
      if (isNext) {
        if (props.month === 12) {
          context.emit('update:year', props.year + 1);
          context.emit('update:month', 1);
        } else {
          context.emit('update:year', props.year);
          context.emit('update:month', props.month + 1);
        }
      } else {
        if (props.month === 1) { // eslint-disable-line
          context.emit('update:year', props.year - 1);
          context.emit('update:month', 12);
        } else {
          context.emit('update:year', props.year);
          context.emit('update:month', props.month - 1);
        }
      }
    };

    return {
      monthName,
      change,
    };
  },
});
</script>
