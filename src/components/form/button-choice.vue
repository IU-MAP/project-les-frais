<template>
  <div class="button-choice">
    <span class="text-regular">{{ label }}</span>

    <Button
      v-for="item in items"
      :key="item"
      :class="{current: item === val}"
      @click="() => changeItem(item)"
    >
      {{ item }}
    </Button>
  </div>
</template>

<script lang="ts">
import './button-choice.css';
import { defineComponent, PropType, ref } from 'vue';
import Button from '../button/index.vue';

export default defineComponent({
  name: 'ButtonChoice',
  components: { Button },
  props: {
    label: {
      type: String,
      required: true,
    },
    items: {
      type: Array as PropType<string[]>,
      required: true,
    },
    value: {
      type: String,
      default: null,
    },
  },
  emits: ['update:value'],
  setup (props, context) {
    const val = ref(props.value || props.items[0]);

    const changeItem = (item: string) => {
      console.log(item);
      val.value = item;
      context.emit('update:value', item);
    };

    return {
      val,
      changeItem,
    };
  },
});
</script>
