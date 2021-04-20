<template>
  <div
    v-click-outside="clickOutside"
    :class="{editing}"
    class="date-input"
    @keypress.enter.stop.prevent="changeDate"
  >
    <CalendarIcon v-if="!editing" @click="() => toggleEditing(true)" />
    <CheckIcon v-else @click="() => toggleEditing(false)" />

    <span v-if="!editing" @click="() => toggleEditing(true)">
      {{ current }}
    </span>

    <input
      v-show="editing"
      v-model="newVal"
      v-maska="'####-##-##'"
      type="text"
    >
  </div>
</template>

<script lang="ts">
import './date-input.css';
import {
  defineComponent, ref, onMounted, watch,
} from 'vue';
import CalendarIcon from '../../assets/icons/calendar.svg?component';
import CheckIcon from '../../assets/icons/check.svg?component';
import formatDate from '../../utils/format-date';

export default defineComponent({
  name: 'DateInput',
  components: {
    CalendarIcon,
    CheckIcon,
  },
  props: {
    date: {
      type: String,
      default: null,
    },
  },
  emits: ['change'],
  setup (props, context) {
    const editing = ref(false);
    const current = ref(props.date ? formatDate(props.date) : formatDate(new Date()));
    const newVal = ref('');

    const changeDate = () => {
      const newValue = formatDate(newVal.value);
      current.value = newValue;
      editing.value = false;
      context.emit('change', newValue);
    };

    const toggleEditing = (val: boolean) => {
      editing.value = val;
      if (!val) changeDate();
      else newVal.value = current.value;
    };

    const clickOutside = () => {
      if (!editing.value) return;
      changeDate();
    };

    watch(() => props.date, (newValue: string|null) => {
      const newV = newValue ? formatDate(newValue) : formatDate(new Date());
      current.value = newV;
      context.emit('change', newV);
    });

    onMounted(() => {
      if (!props.date) context.emit('change', current.value);
    });

    return {
      editing,
      current,
      newVal,
      toggleEditing,
      clickOutside,
      changeDate,
    };
  },
});
</script>
