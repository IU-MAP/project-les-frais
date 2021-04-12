<template>
  <section class="auth-page">
    <div class="card">
      <h1>Login</h1>

      <form @submit.prevent="submit">
        <FormInput
          v-model:value="email"
          type="email"
          placeholder="Email"
          label-text="Email"
          required
        >
          <template #after>
            <div class="form-input_icon">
              <AtSignIcon />
            </div>
          </template>
        </FormInput>

        <FormInput
          v-model:value="password"
          type="password"
          placeholder="********"
          label-text="Password"
          required
        />

        <p v-if="error" class="text-regular text-color-error">{{ error }}</p>

        <Button look="submit">Submit</Button>
      </form>

      <p>
        I don't have an account.
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
import AtSignIcon from '../assets/icons/at-sign.svg?component';
import api from '../utils/api';

interface ReqBody {
  username: string,
  email: string,
  password: string,
}

interface ReqRes {

}

export default defineComponent({
  name: 'LoginPage',
  components: {
    FormInput,
    Button,
    AtSignIcon,
  },
  setup () {
    const email = ref<string>('');
    const password = ref<string>('');
    const error = ref<string>('');

    const submit = async () => {
      try {
        await api.post<ReqBody, ReqRes>('rest-auth/login/', {
          email,
          password,
          username: email,
        });
      } catch (e) {
        error.value = e.message;
      }
    };

    return {
      email,
      password,
      error,
      submit,
    };
  },
});
</script>
