<template>
  <div class="category">
    <Dot :number="color" />
    <span class="text-small">{{ name }}</span>
  </div>
</template>

<script lang="ts">
import './category.css';
import { defineComponent } from 'vue';
import Dot from '../dot/index.vue';

export default defineComponent({
  name: 'Category',
  components: {
    Dot,
  },
  props: {
    color: {
      type: [Number, String],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
});
</script>
