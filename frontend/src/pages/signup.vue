<template>
  <section class="auth-page">
    <h1>Signup</h1>
    <p>
      No, i have an account.
      <router-link :to="{name: 'login'}" class="text-regular text-link">
        Log in
      </router-link>
    </p>
  </section>
</template>

<script lang="ts">
import '../assets/styles/pages/auth.css';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SignupPage',
});
</script>
