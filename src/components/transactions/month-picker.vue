<template>
  <div class="month-picker">
    <button class="prev"><ChevronIcon /></button>
    <h2>April, 2021</h2>
    <button class="next"><ChevronIcon /></button>
  </div>
</template>

<script lang="ts">
import './month-picker.css';
import { defineComponent } from 'vue';
import ChevronIcon from '../../assets/icons/chevron-down.svg?component';

export default defineComponent({
  name: 'MonthPicker',
  components: {
    ChevronIcon,
  },
  props: {
  },
});
</script>
