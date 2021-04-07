<template>
  <button
    :class="look"
    :type="isSubmit ? 'submit' : 'button'"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { ref, PropType, defineComponent } from 'vue';

export default defineComponent({
  name: 'Button',
  props: {
    look: {
      type: String as PropType<'default'|'submit'|'with-icon'>,
      default: 'default',
    },
  },
  setup(props) {
    const isSubmit = ref(props.look === 'submit');

    return {
      isSubmit,
    };
  },
});
</script>
