<template>
  <div :class="{error}" class="form-input">
    <label v-if="!noLabel" :for="id" class="form-input_label">
      <slot name="label">{{ labelText }}</slot>
    </label>

    <div class="form-input_wrapper">
      <slot name="before" />

      <input
        v-if="type !== 'textarea'"
        :id="id"
        v-model="val"
        :type="type"
        :class="'form-input_input'"
        :required="required"
        :disabled="disabled"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        v-bind="inputAttrs"
        @focusin="$emit('focusin', $event)"
        @focusout="$emit('focusout', $event)"
        @input="input"
      >

      <textarea
        v-else
        :id="id"
        v-model="val"
        :type="type"
        :class="'form-input_input'"
        :required="required"
        :disabled="disabled"
        :placeholder="placeholder"
        v-bind="inputAttrs"
        v-maska="mask"
        @focusin="$emit('focusin', $event)"
        @focusout="$emit('focusout', $event)"
        @input="input"
      />

      <slot name="after" />
    </div>

    <div v-if="error" class="form-input_error">
      <slot name="error">{{ error }}</slot>
    </div>
  </div>
</template>

<script lang="ts">
import './form-input.css';
import {
  defineComponent, PropType, ref, watch,
} from 'vue';

let timeout: any = null;

export default defineComponent({
  name: 'FormInput',
  props: {
    value: {
      type: [String, Number] as PropType<string|number|null>,
      default: null,
    },
    id: {
      type: String,
      default: null,
    },

    /**
     * Label-related properties: its text and whether you need a label at all
     */
    labelText: {
      type: String,
      default: '',
    },
    noLabel: {
      type: Boolean,
      default: false,
    },

    /**
     * If an error occurred, pass descriptive text here
     */
    error: {
      type: String,
      default: '',
    },

    /**
     * How many milliseconds to wait after input is changed (before emitting the @change event)
     */
    inputDelay: {
      type: Number,
      default: 0,
    },

    /**
     * Make a masked input using ...
     */
    mask: {
      type: String,
      default: '',
    },

    /**
     * Basic HTML-attributes for the input element.
     * If you need other, pass inputAttrs object as a prop
     */
    type: {
      type: String as PropType<'text' | 'email' | 'password' | 'textarea' | string>,
      default: 'text',
    },
    autocomplete: {
      type: String as PropType<'on' | 'off'>,
      default: 'off',
    },
    placeholder: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    inputAttrs: {
      type: Object as PropType<Record<string, string>>,
      default: () => ({}),
    },
  },
  emits: ['delay', 'input', 'update:value', 'focusin', 'focusout'],
  setup (props, context) {
    const val = ref(props.value);

    watch((() => props.value), (newVal) => {
      val.value = newVal;
    });

    const input = () => {
      if (props.inputDelay) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          context.emit('delay', val.value);
        }, props.inputDelay);
      }

      context.emit('input', val.value);
      context.emit('update:value', val.value);
    };

    return {
      input,
      val,
    };
  },
});
</script>
