<template>
  <section class="auth-page">
    <div class="card">
      <h1>Signup</h1>

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

        <FormInput
          v-model:value="confirm"
          type="password"
          placeholder="********"
          label-text="Confirm password"
          required
        />

        <Button look="submit">Submit</Button>
      </form>

      <p>
        I have an account.
        <router-link :to="{name: 'login'}" class="text-regular text-link">Log in</router-link>
      </p>
    </div>
  </section>
</template>

<script lang="ts">
import '../assets/styles/pages/auth.css';
import { defineComponent, ref } from 'vue';
import Button from '../components/button/index.vue';
import AtSignIcon from '../assets/icons/at-sign.svg?component';
import FormInput from '../components/form-input/index.vue';
import api from '../utils/api';

interface ReqBody {
  username: string,
  email: string,
  password1: string,
  password2: string,
}

interface ReqRes {

}

export default defineComponent({
  name: 'SignupPage',
  components: { FormInput, Button, AtSignIcon },
  setup () {
    const email = ref<string>('');
    const password = ref<string>('');
    const confirm = ref<string>('');

    const submit = () => {
      api.post<ReqBody, ReqRes>('rest-auth/registration/', {
        email,
        username: email,
        password1: password,
        password2: confirm,
      });
    };

    return {
      email,
      password,
      confirm,
      submit,
    };
  },
});
</script>
