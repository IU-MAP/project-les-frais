<template>
  <div class="month-picker">
    <Button class="prev"><ChevronIcon /></Button>
    <h2>April, 2021</h2>
    <Button class="next"><ChevronIcon /></Button>
  </div>
</template>

<script lang="ts">
import './month-picker.css';
import { defineComponent } from 'vue';
import ChevronIcon from '../../assets/icons/chevron-down.svg?component';
import Button from '../button/index.vue';

export default defineComponent({
  name: 'MonthPicker',
  components: {
    Button,
    ChevronIcon,
  },
  props: {
  },
});
</script>
