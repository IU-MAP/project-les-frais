<template>
  <div class="card tabs-nav">
    <button
      v-for="tab in items"
      :key="tab"
      :class="{active: tab === active}"
      type="button"
      class="tab"
      @click="changeActive(tab)"
    >
      <slot name="item" :item="tab">
        {{ tab }}
      </slot>
    </button>
  </div>
</template>

<script lang="ts">
import './tabs.css';
import { defineComponent, PropType, ref } from 'vue';

export default defineComponent({
  name: 'Tabs',
  props: {
    items: {
      type: Array as PropType<string[]>,
      required: true,
    },
    initial: {
      type: String,
      default: null,
    },
  },
  emits: ['change'],
  setup (props, context) {
    const active = ref(props.initial || props.items?.[0] || null);

    const changeActive = (tab: string) => {
      active.value = tab;
      context.emit('change', tab);
    };

    return {
      active,
      changeActive,
    };
  },
});
</script>
