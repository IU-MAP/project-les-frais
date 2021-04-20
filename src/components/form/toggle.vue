<template>
  <label :class="{checked: val}" class="toggle">
    <span class="toggle_label toggle_left">{{ leftLabel }}</span>
    <input
      type="checkbox"
      class="toggle_input"
      @change="update"
    >
    <span class="toggle_switcher" />

    <span class="toggle_label toggle_right">{{ rightLabel }}</span>
  </label>
</template>

<script lang="ts">
import './toggle.css';
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'Toggle',
  props: {
    leftLabel: {
      type: String,
      required: true,
    },
    rightLabel: {
      type: String,
      required: true,
    },
    value: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:value'],
  setup (props, context) {
    const val = ref(props.value);

    watch((() => props.value), (newVal) => {
      val.value = newVal;
    });

    const update = (event: Event) => {
      const { checked } = event.target as HTMLInputElement;
      val.value = checked;
      context.emit('update:value', checked);
    };

    return {
      val,
      update,
    };
  },
});
</script>
