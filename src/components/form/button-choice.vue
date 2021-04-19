<template>
  <div class="button-choice">
    <span class="text-regular">{{ label }}</span>

    <Button
      v-for="item in items"
      :key="item.id"
      :class="{current: item.id === val.id}"
      @click="() => changeItem(item)"
    >
      {{ item.label }}
    </Button>
  </div>
</template>

<script lang="ts">
import './button-choice.css';
import {
  defineComponent, PropType, ref, watch,
} from 'vue';
import Button from '../button/index.vue';

type ItemType = {
  id: string|number,
  label: string,
}

export default defineComponent({
  name: 'ButtonChoice',
  components: { Button },
  props: {
    label: {
      type: String,
      required: true,
    },
    items: {
      type: Array as PropType<ItemType[]>,
      required: true,
    },
    value: {
      type: Object as PropType<ItemType|null>,
      default: null,
    },
  },
  emits: ['update:value'],
  setup (props, context) {
    const val = ref<ItemType>(props.value || props.items[0]);

    const changeItem = (item: ItemType) => {
      val.value = item;
      context.emit('update:value', item);
    };

    watch(() => props.value, (newVal: ItemType|null) => val.value = newVal || props.items[0]);

    return {
      val,
      changeItem,
    };
  },
});
</script>
