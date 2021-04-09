<template>
  <section class="auth-page">
    <div class="card">
      <h1>Login</h1>

      <form @submit.prevent="submit">
        <input v-model="name" type="text">
        <Button look="submit">Submit</Button>
      </form>

      <p>
        No, i don't have an account.
        <router-link :to="{name: 'signup'}" class="text-regular text-link">Sign up</router-link>
      </p>
    </div>
  </section>
</template>

<script lang="ts">
import '../assets/styles/pages/auth.css';
import { defineComponent, ref } from 'vue';
import Button from '../components/button/index.vue';

export default defineComponent({
  name: 'LoginPage',
  components: { Button },
  setup () {
    const name = ref<string>('');

    const submit = () => {
      // console.log(name);
    };

    return {
      name,
      submit,
    };
  },
});
</script>
