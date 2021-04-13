<template>
  <section class="settings-page">
    <Tabs :items="tabs" @change="changeActive">
      <template #item="{item}">
        {{ t(item) }}
      </template>
    </Tabs>

    <transition name="fade" mode="out-in" appear>
      <div v-if="activeTab === 'settings_tabs_profile'" class="card settings profile-settings">
        <h1>{{ t('settings_tab_profile') }}</h1>

        <div class="row">
          <p class="text-regular">{{ t('settings_language') }}</p>
          <Dropdown :items="languages" @select="selectLan($event)">
            <template #default>
              {{ t('langs_' + activeLan) }}
            </template>
            <template #option="{item}">
              {{ t('langs_' + item) }}
            </template>
          </Dropdown>
        </div>
        <div class="row">
          <p class="text-regular">{{ t('settings_currency') }}</p>
          <Button>{{ t('settings_currency_btn') }}</Button>
        </div>
        <div class="row">
          <p class="text-regular">{{ t('settings_import') }}</p>
          <Button>{{ t('settings_import_btn') }}</Button>
        </div>
        <div class="row">
          <p class="text-regular">{{ t('settings_export') }}</p>
          <Button>{{ t('settings_export_btn') }}</Button>
        </div>
        <div class="row">
          <p class="text-regular">{{ t('settings_logout') }}</p>
          <Button @click="logout">{{ t('settings_logout_btn') }}</Button>
        </div>
        <div class="row">
          <p class="text-regular">{{ t('settings_delete') }}</p>
          <Button look="danger">{{ t('settings_delete_btn') }}</Button>
        </div>
      </div>

      <div
        v-else-if="activeTab === 'settings_tabs_categories'"
        class="card settings category-settings"
      >
        <h1>{{ t('settings_tab_categories') }}</h1>

        <div>
          <Category
            v-for="category in CATEGORIES_MOCK"
            :key="category.id"
            :name="category.name"
            :color="category.color"
          />
        </div>
      </div>

      <div v-else-if="activeTab === 'settings_tabs_templates'" class="card settings">
        <h1>{{ t('settings_tab_templates') }}</h1>
      </div>
    </transition>
  </section>
</template>

<script lang="ts">
import '../assets/styles/pages/settings.css';
import { computed, defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import Button from '../components/button/index.vue';
import Category from '../components/category/index.vue';
import { CATEGORIES_MOCK } from '../utils/mocks';
import useStore from '../store';
import Dropdown from '../components/dropdown/index.vue';
import useT from '../utils/translations';
import { LANGS } from '../utils/constants';
import Tabs from '../components/tabs/index.vue';

type TabsType = 'settings_tabs_profile'|'settings_tabs_categories'|'settings_tabs_templates';
const TABS: TabsType[] = ['settings_tabs_profile', 'settings_tabs_categories', 'settings_tabs_templates'];

export default defineComponent({
  components: {
    Tabs,
    Dropdown,
    Category,
    Button,
  },
  setup () {
    const t = useT();
    const store = useStore();
    const router = useRouter();
    const activeTab = ref<TabsType>('settings_tabs_profile');
    const activeLan = computed(() => store.state.language);

    const changeActive = (tab: TabsType) => {
      activeTab.value = tab;
    };

    const selectLan = (lan: LANGS) => {
      store.dispatch('changeLang', lan);
    };

    const logout = () => {
      store.dispatch('changeUser', null);
      store.dispatch('changeToken', null);
      router.push({ name: 'home' });
    };

    return {
      t,
      activeTab,
      activeLan,
      tabs: TABS,
      languages: Object.values(LANGS),
      changeActive,
      CATEGORIES_MOCK,
      logout,
      selectLan,
    };
  },
});
</script>
