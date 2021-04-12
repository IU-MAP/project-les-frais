<template>
  <div :class="open" class="dropdown">
    <button type="button" class="trigger" @click="toggleOpen">
      <slot>
        {{ label }}
      </slot>
      <ChevronIcon />
    </button>

    <ul class="menu">
      <li
        v-for="item in items"
        :key="item"
      >
        <slot name="option" :item="item">
          {{ item }}
        </slot>
      </li>
    </ul>
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
  setup () {
    const open = ref(false);

    const toggleOpen = () => {
      open.value = !open.value;
    };

    return {
      open,
      toggleOpen,
    };
  },
});
</script>
