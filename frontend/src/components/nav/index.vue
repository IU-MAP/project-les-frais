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
      <Dropdown :items="items" @select="selectLan($event)">
        <template #default>
          {{ t('langs_' + activeLan) }}
        </template>
        <template #option="{item}">
          {{ t('langs_' + item) }}
        </template>
      </Dropdown>

      <Button :link="{ name: 'login'}">
        {{ t('login') }}
      </Button>
    </nav>
  </header>
</template>

<script lang="ts">
import './nav.css';
import { defineComponent, computed } from 'vue';
import Button from '../button/index.vue';
import Dropdown from '../dropdown/index.vue';
import useT from '../../utils/translations';
import { LANGS } from '../../utils/constants';
import useStore from '../../store';

export default defineComponent({
  name: 'AppNav',
  components: { Dropdown, Button },
  setup () {
    const store = useStore();
    const t = useT();

    const activeLan = computed(() => store.state.language);

    const selectLan = (lan: LANGS) => {
      store.dispatch('changeLang', lan);
    };

    return {
      t,
      items: Object.values(LANGS),
      activeLan,
      selectLan,
    };
  },
});
</script>
