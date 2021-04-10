<template>
  <component
    :is="component"
    :class="['dot', 'color-number-' + number, { radio }]"
  >
    <template v-if="radio">
      <input type="checkbox">
      <CheckIcon />
    </template>
  </component>
</template>

<script lang="ts">
import './dot.css';
import { defineComponent, computed } from 'vue';
import CheckIcon from '../../assets/icons/at-sign.svg?component';

export default defineComponent({
  name: 'Dot',
  components: {
    CheckIcon,
  },
  props: {
    number: {
      type: [Number, String],
      required: true,
    },
    radio: {
      type: Boolean,
      default: false,
    },
  },
  setup (props) {
    const component = computed(() => (props.radio ? 'label' : 'span'));

    return {
      component,
    };
  },
});
</script>
