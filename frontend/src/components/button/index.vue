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
      type: String as PropType<'default'|'submit'|'with-icon'>,
      default: 'default',
    },
    link: {
      type: [String, Object],
      default: null,
    },
  },
  setup (props) {
    const isSubmit = ref(props.look === 'submit');

    return {
      isSubmit,
    };
  },
});
</script>
