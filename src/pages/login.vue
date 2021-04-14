<template>
  <section class="auth-page">
    <div class="card">
      <h1>{{ t('auth_login') }}</h1>

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
          v-model:value="values.password"
          type="password"
          placeholder="********"
          :label-text="t('auth_password')"
          :error="errors.password"
          required
        />

        <p v-if="errors.non_field_errors" class="text-small text-color-error text-center">
          {{ errors.non_field_errors }}
        </p>

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
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';
import Button from '../components/button/index.vue';
import FormInput from '../components/form-input/index.vue';
import AtSignIcon from '../assets/icons/at-sign.svg?component';
import useTranslation from '../utils/useTranslation';
import api from '../utils/api';
import useStore from '../store';

export default defineComponent({
  name: 'LoginPage',
  components: {
    FormInput,
    Button,
    AtSignIcon,
  },
  setup () {
    const store = useStore();
    const router = useRouter();
    const t = useTranslation();

    const values = reactive({
      email: '',
      password: '',
    });

    const errors = reactive({
      email: '',
      password: '',
      non_field_errors: '',
    });

    const submit = async () => {
      const res = await api.auth.login({
        email: values.email,
        password: values.password,
        username: values.email,
      });

      if (res.error && typeof res.error === 'object') {
        errors.email = res.error.email || '';
        errors.password = res.error.password || '';
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
