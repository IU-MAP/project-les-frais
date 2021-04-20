<template>
  <component
    :is="component"
    :class="['dot', 'color-number-' + number, { radio, active: val }]"
  >
    <template v-if="radio">
      <input :checked="checked" type="checkbox" @change="change">
      <CheckIcon />
    </template>
  </component>
</template>

<script lang="ts">
import './dot.css';
import {
  defineComponent, computed, ref, watch, 
} from 'vue';
import CheckIcon from '../../assets/icons/check.svg?component';

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
    checked: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['change'],
  setup (props, context) {
    const component = computed(() => (props.radio ? 'label' : 'span'));
    const val = ref(props.checked);

    const change = (e: Event) => {
      const check = (e.target as HTMLInputElement).checked;
      val.value = check;
      context.emit('change', check);
    };

    watch(() => props.checked, (newVal: boolean) => {
      val.value = newVal;
    });

    return {
      component,
      change,
      val,
    };
  },
});
</script>
