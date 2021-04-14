<template>
  <section class="home-page container">
    <div>
      <h1>
        {{ t('home_title') }}
      </h1>
      <h3 class="text-regular">
        {{ t('home_subtitle') }}
      </h3>
      <Button :link="{ name: 'signup' }" look="submit">
        {{ t('home_action') }}
      </Button>
    </div>
    <img src="../assets/home-diagram.png" alt="diagram">
  </section>
</template>

<script lang="ts">
import '../assets/styles/pages/home.css';
import { defineComponent } from 'vue';
import Button from '../components/button/index.vue';
import useTranslation from '../utils/useTranslation';

export default defineComponent({
  name: 'HomePage',
  components: { Button },
  setup () {
    const t = useTranslation();

    return {
      t,
    };
  },
});
</script>
