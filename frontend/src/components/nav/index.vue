<template>
  <header class="header">
    <router-link
      :to="{name: 'home'}"
      class="logo"
    >
      <img
        src="/les-frais.png"
        alt="expenses"
      >
    </router-link>

    <nav>
      <Button :link="{ name: 'home'}">
        Log In
      </Button>
    </nav>
  </header>
</template>

<script lang="ts">
import './nav.css';
import { defineComponent } from 'vue';
import Button from '../button/index.vue';

export default defineComponent({
  name: 'AppNav',
  components: { Button },
});
</script>
