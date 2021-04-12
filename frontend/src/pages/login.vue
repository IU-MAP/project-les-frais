<template>
  <section class="auth-page">
    <div class="card">
      <h1>{{ t('auth_login') }}</h1>

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

        <p v-if="error" class="text-regular text-color-error">{{ error }}</p>

        <Button look="submit">{{ t('auth_action') }}</Button>
      </form>

      <p>
        {{ t('auth_dont') }}
        <router-link :to="{name: 'signup'}" class="text-regular text-link">
          {{ t('signup') }}
        </router-link>
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
import useT from '../utils/translations';

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
    const t = useT();

    const email = ref<string>('');
    const password = ref<string>('');
    const error = ref<string>('');

    const submit = async () => {
      try {
        await api.post<ReqBody, ReqRes>('rest-auth/login/', {
          email: email.value,
          password: password.value,
          username: email.value,
        });
      } catch (e) {
        error.value = e.message;
      }
    };

    return {
      t,
      email,
      password,
      error,
      submit,
    };
  },
});
</script>
