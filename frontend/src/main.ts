import { createApp } from 'vue';
import maska from 'maska';
import App from './app.vue';
import router from './router';
import { store, injectionKey } from './store';
import clickOutside from './utils/click-outside';

import './assets/styles/variables.css';
import './assets/styles/normalize.css';
import './assets/styles/breakpoints.css';
import './assets/styles/ui/ui.css';
import './assets/styles/ui/typography.css';
import './assets/styles/ui/color-number.css';

createApp(App)
  .use(router)
  .use(maska)
  .use(store, injectionKey)
  .directive('click-outside', clickOutside)
  .mount('#app');
