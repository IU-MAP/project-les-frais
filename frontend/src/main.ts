import { createApp } from 'vue';
import maska from 'maska';
import App from './app.vue';
import router from './router';

import './assets/styles/variables.css';
import './assets/styles/normalize.css';
import './assets/styles/breakpoints.css';
import './assets/styles/ui/ui.css';
import './assets/styles/ui/typography.css';
import './assets/styles/ui/color-number.css';

createApp(App)
  .use(router)
  .use(maska)
  .mount('#app');
