<template>
  <header class="header container">
    <router-link
      :to="{name: 'home'}"
      class="logo"
    >
      <img
        src="/les-frais.png"
        alt="expenses"
      >
    </router-link>

    <nav>
      <Dropdown :items="items">
        <template #default>
          {{ t('langs_rus') }}
        </template>
        <template #option="{item}">
          {{ t('langs_' + item) }}
        </template>
      </Dropdown>

      <Button :link="{ name: 'login'}">
        Log In
      </Button>
    </nav>
  </header>
</template>

<script lang="ts">
import './nav.css';
import { defineComponent } from 'vue';
import Button from '../button/index.vue';
import Dropdown from '../dropdown/index.vue';
import useT from '../../utils/translations';
import { LANGS } from '../../utils/constants';

export default defineComponent({
  name: 'AppNav',
  components: { Dropdown, Button },
  setup () {
    const { t } = useT();

    return {
      items: Object.values(LANGS),
      t,
    };
  },
});
</script>
