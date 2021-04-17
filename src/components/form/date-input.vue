<template>
  <div :class="{editing}" class="date-input" @keypress.enter.stop="changeDate">
    <CalendarIcon @click="() => toggleEditing()" />

    <span v-if="!editing" @click="() => toggleEditing(true)">
      {{ current }}
    </span>

    <input
      v-else
      v-model="newVal"
      type="text"
    >
  </div>
</template>

<script lang="ts">
import './date-input.css';
import { defineComponent, ref } from 'vue';
import CalendarIcon from '../../assets/icons/calendar.svg?component';
import formatDate from '../../utils/format-date';

export default defineComponent({
  name: 'DateInput',
  components: {
    CalendarIcon,
  },
  props: {
    date: {
      type: String,
      default: null,
    },
  },
  setup (props) {
    const editing = ref(false);
    const current = ref(props.date ? formatDate(props.date) : formatDate(new Date()));
    const newVal = ref('');

    const toggleEditing = (val?: boolean) => {
      if (typeof val === 'undefined') {
        editing.value = !editing.value;
      } else {
        editing.value = val;
      }
    };

    const changeDate = () => {
      current.value = formatDate(newVal.value);
      editing.value = false;
    };

    return {
      editing,
      current,
      newVal,
      toggleEditing,
      changeDate,
    };
  },
});
</script>
