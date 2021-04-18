import { createApp } from 'vue';
import App from './app.vue';
import router from './router';
import { store, injectionKey } from './store';
import clickOutside from './utils/click-outside';

/**
 * Import all global styles. Does not contain component-related styles
 * which are imported directly to those components.
 */
import './assets/styles/variables.css';
import './assets/styles/normalize.css';
import './assets/styles/breakpoints.css';
import './assets/styles/ui/ui.css';
import './assets/styles/ui/typography.css';
import './assets/styles/ui/color-number.css';

store.dispatch('initStore');

/**
 * Register Vue 3 application with router, store, router and useful directives.
 */
createApp(App)
  .use(router)
  .use(store, injectionKey)
  .directive('click-outside', clickOutside)
  .mount('#app');
