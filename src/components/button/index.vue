<template>
  <router-link
    v-if="link"
    :to="link"
    class="btn"
    :class="look"
  >
    <slot />
  </router-link>

  <button
    v-else
    class="btn"
    :class="look"
    :type="isSubmit ? 'submit' : 'button'"
    @click="clk"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import './button.css';
import { ref, PropType, defineComponent } from 'vue';

export default defineComponent({
  name: 'Button',
  props: {
    look: {
      type: String as PropType<'default'|'submit'|'with-icon'|'danger'|'add'>,
      default: 'default',
    },
    link: {
      type: [String, Object],
      default: null,
    },
  },
  emits: ['click'],
  setup (props, context) {
    const isSubmit = ref(props.look === 'submit' || props.look === 'add');

    const clk = (e: Event) => {
      context.emit('click', e);
    };

    return {
      isSubmit,
      clk,
    };
  },
});
</script>
