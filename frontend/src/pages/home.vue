<template>
  <section class="home-page container">
    <div>
      <h1>
        An expense tracker you deserve!
      </h1>
      <h3 class="text-regular">
        Import your data from any source and enjoy the power
        of this tool: statistics, wallets, budgeting, currency
        converter. And even investment and cryptocurrencies
        control! Everything is in your hand!
      </h3>
      <Button :link="{ name: 'signup' }" look="submit">
        Create account
      </Button>
    </div>
    <img src="/home-diagram.png" alt="diagram">
  </section>
</template>

<script lang="ts">
import '../assets/styles/pages/home.css';
import { defineComponent } from 'vue';
import Button from '../components/button/index.vue';

export default defineComponent({
  name: 'HomePage',
  components: { Button },
});
</script>
