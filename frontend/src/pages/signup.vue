<template>
  <section class="auth-page">
    <div class="card">
      <h1>{{ t('auth_signup') }}</h1>

      <form @submit.prevent="submit">
        <FormInput
          v-model:value="values.email"
          type="email"
          placeholder="example@domain.com"
          :label-text="t('auth_email')"
          :error="errors.email"
          required
        >
          <template #after>
            <div class="form-input_icon">
              <AtSignIcon />
            </div>
          </template>
        </FormInput>

        <FormInput
          v-model:value="values.password1"
          type="password"
          placeholder="********"
          :label-text="t('auth_password')"
          :error="errors.password1"
          required
        />

        <FormInput
          v-model:value="values.password2"
          type="password"
          placeholder="********"
          :label-text="t('auth_confirm')"
          :error="errors.password2"
          required
        />

        <p v-if="errors.non_field_errors" class="text-small text-color-error text-center">
          {{ errors.non_field_errors }}
        </p>

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
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';
import Button from '../components/button/index.vue';
import AtSignIcon from '../assets/icons/at-sign.svg?component';
import FormInput from '../components/form-input/index.vue';
import useT from '../utils/translations';
import useStore from '../store';
import useApi from '../utils/api';

export default defineComponent({
  name: 'SignupPage',
  components: { FormInput, Button, AtSignIcon },
  setup () {
    const store = useStore();
    const api = useApi();
    const router = useRouter();
    const t = useT();

    const values = reactive({
      email: '',
      password1: '',
      password2: '',
    });

    const errors = reactive({
      email: '',
      password1: '',
      password2: '',
      non_field_errors: '',
    });

    const submit = async () => {
      const res = await api.auth.signup({
        ...values,
        username: values.email,
      });

      if (res.error && typeof res.error === 'object') {
        errors.email = res.error.email || '';
        errors.password1 = res.error.password1 || '';
        errors.password2 = res.error.password2 || '';
        errors.non_field_errors = res.error.non_field_errors || '';
      }

      if (res.response) {
        await store.dispatch('changeToken', res.response.key);
        await router.push({ name: 'home' });
      }
    };

    return {
      t,
      values,
      errors,
      submit,
    };
  },
});
</script>
