<template>
  <section class="auth-page">
    <div class="card">
      <h1>{{ t('auth_signup') }}</h1>

      <form @submit.prevent="submit">
        <FormInput
          v-model:value="email"
          type="email"
          placeholder="example@domain.com"
          :label-text="t('auth_email')"
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
          :label-text="t('auth_password')"
          required
        />

        <FormInput
          v-model:value="confirm"
          type="password"
          placeholder="********"
          :label-text="t('auth_confirm')"
          required
        />

        <Button look="submit">{{ t('auth_action') }}</Button>
      </form>

      <p>
        {{ t('auth_have') }}
        <router-link :to="{name: 'login'}" class="text-regular text-link">
          {{ t('login') }}
        </router-link>
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
import useT from '../utils/translations';

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
    const t = useT();

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
      t,
      email,
      password,
      confirm,
      submit,
    };
  },
});
</script>
