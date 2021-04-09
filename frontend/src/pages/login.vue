<template>
  <section class="auth-page">
    <h1>Login</h1>
    <p>
      No, i don't have an account.
      <router-link :to="{name: 'signup'}" class="text-regular text-link">Sign up</router-link>
    </p>
  </section>
</template>

<script lang="ts">
import '../assets/styles/pages/auth.css';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoginPage',
});
</script>
