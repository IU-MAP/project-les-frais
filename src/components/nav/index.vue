<template>
  <header class="header container">
    <router-link
      :to="{name: 'home'}"
      class="logo"
    >
      <img
        src="../../assets/les-frais.png"
        alt="expenses"
      >
    </router-link>

    <nav>
      <Dropdown v-if="!isAuthed" :items="items" @select="selectLan($event)">
        <template #default>
          {{ t('langs_' + activeLan) }}
        </template>
        <template #option="{item}">
          {{ t('langs_' + item) }}
        </template>
      </Dropdown>

      <Button v-if="!isAuthed" :link="{ name: 'login'}">
        {{ t('login') }}
      </Button>

      <Button v-if="isAuthed" :link="{ name: 'settings'}">
        {{ t('settings') }}
      </Button>
    </nav>
  </header>
</template>

<script lang="ts">
import './nav.css';
import { defineComponent, computed } from 'vue';
import Button from '../button/index.vue';
import Dropdown from '../dropdown/index.vue';
import useTranslation from '../../utils/useTranslation';
import { LANGS } from '../../utils/constants';
import useStore from '../../store';

export default defineComponent({
  name: 'AppNav',
  components: { Dropdown, Button },
  setup () {
    const store = useStore();
    const t = useTranslation();

    const isAuthed = computed(() => !!store.state.user);
    const activeLan = computed(() => store.state.language);

    const selectLan = (lan: LANGS) => {
      store.dispatch('changeLang', lan);
    };

    return {
      t,
      items: Object.values(LANGS),
      activeLan,
      isAuthed,
      selectLan,
    };
  },
});
</script>
