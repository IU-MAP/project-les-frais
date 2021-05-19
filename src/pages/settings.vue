<template>
  <section class="settings-page">
    <Tabs :initial="activeTab" :items="tabs" @change="changeActive">
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
          <Button :link="{ name: 'import' }">{{ t('settings_import_btn') }}</Button>
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
          <Button v-if="!deleteAccountClicked" look="danger" @click="deleteAccount">
            {{ t('settings_delete_btn') }}
          </Button>
          <Button v-else look="remove" @click="deleteAccount">
            {{ t('settings_delete_btn_sure') }}
          </Button>
        </div>
      </div>

      <div v-else-if="activeTab === 'settings_tabs_categories'" class="settings category-settings">
        <CategoryAddForm :edit="categoryToEdit" @edited="editCategory(null)" />

        <div class="card">
          <h1>{{ t('settings_tab_categories') }}</h1>

          <div>
            <span v-if="!categories.length" class="text-regular">
              {{ t('settings_tab_categories_no_categories') }}
            </span>
            <template v-else>
              <Category
                v-for="category in categories"
                :key="category.id"
                :name="category.name"
                :color="category.color"
                @click="editCategory(category)"
              />
            </template>
          </div>
        </div>
      </div>

      <div v-else-if="activeTab === 'settings_tabs_templates'" class="settings template-settings">
        <TransactionAddForm is-template @update="updateTemplates" />

        <suspense>
          <TransactionsList templates :update-val="updateTemplatesVal" />
          <template #fallback>
            <div />
          </template>
        </suspense>
      </div>
    </transition>
  </section>
</template>

<script lang="ts">
import '../assets/styles/pages/settings.css';
import {
  computed, defineComponent, ref, watchEffect,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { Transaction } from '../utils/api/transactions';
import type { Category as CategoryType } from '../utils/api/categories';
import { LANGS } from '../utils/constants';
import useStore from '../store';
import useTranslation from '../utils/useTranslation';
import api from '../utils/api';
import Button from '../components/button/index.vue';
import Category from '../components/category/index.vue';
import Dropdown from '../components/dropdown/index.vue';
import Tabs from '../components/tabs/index.vue';
import CategoryAddForm from '../components/category/add-form.vue';
import TransactionAddForm from '../components/transactions/add-form.vue';
import TransactionsList from '../components/transactions/list.vue';

type TabsType = 'settings_tabs_profile'|'settings_tabs_categories'|'settings_tabs_templates';
const TABS: TabsType[] = ['settings_tabs_profile', 'settings_tabs_categories', 'settings_tabs_templates'];

export default defineComponent({
  components: {
    TransactionsList,
    TransactionAddForm,
    CategoryAddForm,
    Tabs,
    Dropdown,
    Category,
    Button,
  },
  setup () {
    const t = useTranslation();
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const activeLan = computed(() => store.state.language);
    const categories = computed<CategoryType[]>(() => store.state.categories);
    const updateTemplatesVal = ref<Transaction|null>(null);

    const initialTab = computed<TabsType>(() => (((route.query.slug) && TABS.includes(route.query.slug as TabsType))
      ? route.query.slug as TabsType
      : 'settings_tabs_profile'));
    const activeTab = ref<TabsType>(initialTab);

    const categoryToEdit = ref<CategoryType|null>(null);
    const deleteAccountClicked = ref<boolean>(false);

    const changeActive = (tab: TabsType) => {
      activeTab.value = tab;
      router.push({ query: { slug: tab } });
    };

    const selectLan = (lan: LANGS) => {
      store.dispatch('changeLang', lan);
    };

    const logout = () => {
      store.dispatch('changeUser', null);
      store.dispatch('changeToken', null);
      router.push({ name: 'home' });
    };

    const editCategory = (val: CategoryType|null) => {
      categoryToEdit.value = val;
    };

    const deleteAccount = async () => {
      if (!deleteAccountClicked.value) {
        deleteAccountClicked.value = true;
        return;
      }

      const res = await api.auth.deleteAccount();
      if (!res) deleteAccountClicked.value = false;
      else logout();
    };

    watchEffect(() => {
      activeTab.value = initialTab.value;
    });

    const updateTemplates = (val: Transaction) => {
      updateTemplatesVal.value = val;
    };

    return {
      t,
      activeTab,
      activeLan,
      tabs: TABS,
      languages: Object.values(LANGS),
      categories,
      categoryToEdit,
      deleteAccountClicked,
      updateTemplatesVal,
      changeActive,
      logout,
      selectLan,
      editCategory,
      deleteAccount,
      updateTemplates,
    };
  },
});
</script>
