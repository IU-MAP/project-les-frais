<template>
  <section class="help-page container">

  </section>
</template>

<script lang="ts">
import '../assets/styles/pages/help.css';
import { defineComponent } from 'vue';
import useTranslation from '../utils/useTranslation';

export default defineComponent({
  name: 'HomePage',
  components: { },
  setup () {
    const t = useTranslation();

    return {
      t,
    };
  },
});
</script>
