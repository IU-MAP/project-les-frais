<template>
  <section class="settings-page">
    <div class="card tabs-nav">
      <button
        v-for="tab in TABS"
        :key="tab"
        :class="{active: tab === activeTab}"
        type="button"
        class="tab"
        @click="changeActive(tab)"
      >
        {{ tab }}
      </button>
    </div>

    <transition name="fade" mode="out-in" appear>
      <div v-if="activeTab === 'profile'" class="card settings profile-settings">
        <h1>Profile settings</h1>

        <div class="row">
          <p class="text-regular">Language</p>
          <Button>English</Button>
        </div>
        <div class="row">
          <p class="text-regular">Main currency</p>
          <Button>Russian Rouble</Button>
        </div>
        <div class="row">
          <p class="text-regular">Import data</p>
          <Button>Import from .XLS or .XLSX</Button>
        </div>
        <div class="row">
          <p class="text-regular">Export data</p>
          <Button>Export to .XLS</Button>
        </div>
        <div class="row">
          <p class="text-regular">Log Out</p>
          <Button>Log Out from account</Button>
        </div>
        <div class="row">
          <p class="text-regular">Delete account</p>
          <Button look="danger">Delete all user data</Button>
        </div>
      </div>

      <div v-else-if="activeTab === 'categories'" class="card settings category-settings">
        <h1>All categories</h1>

        <div>
          <Category
            v-for="category in CATEGORIES_MOCK"
            :key="category.id"
            :name="category.name"
            :color="category.color"
          />
        </div>
      </div>

      <div v-else-if="activeTab === 'templates'" class="card settings">
        <h1>Expense templates</h1>
      </div>
    </transition>
  </section>
</template>

<script lang="ts">
import '../assets/styles/pages/settings.css';
import { defineComponent, ref } from 'vue';
import Button from '../components/button/index.vue';
import Category from '../components/category/index.vue';
import { CATEGORIES_MOCK } from '../utils/mocks';

type TabsType = 'profile'|'categories'|'templates';
const TABS: TabsType[] = ['profile', 'categories', 'templates'];

export default defineComponent({
  components: {
    Category,
    Button,
  },
  setup () {
    const activeTab = ref<TabsType>('profile');

    const changeActive = (tab: TabsType) => {
      activeTab.value = tab;
    };

    return {
      activeTab,
      TABS,
      changeActive,
      CATEGORIES_MOCK,
    };
  },
});
</script>
