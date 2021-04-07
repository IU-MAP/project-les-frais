<template>
  <header>
    <router-link :to="{name: 'home'}" class="logo">
      <img src="/les-frais.png" alt="expenses">
    </router-link>
    <nav>
      <router-link :to="{name: 'home'}" class="btn">
        Log In
      </router-link>
      <router-link :to="{name: 'home'}" class="btn">
        Settings
      </router-link>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppNav',
});
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

.logo {
  position: relative;
  color: #424567;
  font-size: 1.1em;
  text-decoration: none;
  border-bottom: 2px solid transparent;
  white-space: nowrap;
}

.logo img {
  height: 40px;
}

nav {
  display: flex;
}

nav > * {
  margin-left: 1.5rem;
}
</style>
