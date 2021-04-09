<template>
  <section class="auth-page">
    <div class="card">
      <h1>Login</h1>

      <form @submit.prevent="submit">
        <FormInput v-model:value="name" placeholder="Email" label-text="Email" />
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
import FormInput from '../components/form-input/index.vue';

export default defineComponent({
  name: 'LoginPage',
  components: { FormInput, Button },
  setup () {
    const name = ref<string>('');

    const submit = () => {
      // console.log(name.value);
    };

    return {
      name,
      submit,
    };
  },
});
</script>
