<template>
  <section class="auth-page">
    <div class="card">
      <h1>Signup</h1>

      <form>
        <input v-model="name" type="text">
        <Button look="submit">Submit</Button>
      </form>

      <p>
        No, i have an account.
        <router-link :to="{name: 'login'}" class="text-regular text-link">Log in</router-link>
      </p>
    </div>
  </section>
</template>

<script lang="ts">
import '../assets/styles/pages/auth.css';
import { defineComponent } from 'vue';
import Button from '../components/button/index.vue';

export default defineComponent({
  name: 'SignupPage',
  components: { Button },
});
</script>
