import { createApp } from 'vue';
import App from './app.vue';
import router from './router';

import './assets/styles/variables.css';
import './assets/styles/normalize.css';
import './assets/styles/breakpoints.css';
import './assets/styles/ui.css';
import './assets/styles/typography.css';

createApp(App).use(router).mount('#app');
