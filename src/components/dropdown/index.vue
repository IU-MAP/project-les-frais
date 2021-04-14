<template>
  <div
    v-click-outside="() => toggleOpen(false)"
    :class="{open}"
    class="dropdown"
  >
    <button type="button" class="trigger" @click="() => toggleOpen()">
      <slot>
        {{ label }}
      </slot>
      <ChevronIcon />
    </button>

    <div class="dropdown-wrapper">
      <ul class="menu">
        <li
          v-for="item in items"
          :key="item"
          @click="select(item)"
        >
          <slot name="option" :item="item">
            {{ item }}
          </slot>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import './dropdown.css';
import { defineComponent, PropType, ref } from 'vue';
import ChevronIcon from '../../assets/icons/chevron-down.svg?component';

export default defineComponent({
  name: 'Dropdown',
  components: {
    ChevronIcon,
  },
  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: null,
    },
    items: {
      type: Array as PropType<string[]>,
      default: false,
    },
  },
  emits: ['select'],
  setup (props, context) {
    const open = ref(false);

    const toggleOpen = (val?: boolean) => {
      if (typeof val !== 'undefined') {
        open.value = val;
      } else {
        open.value = !open.value;
      }
    };

    const select = (item: string) => {
      context.emit('select', item);
      toggleOpen(false);
    };

    return {
      open,
      toggleOpen,
      select,
    };
  },
});
</script>
