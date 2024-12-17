import { createApp, onMounted } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import '@/assets/css/index.less';
import { Icon } from '@iconify/vue';
import globalDirect from '@/config/globalDirect';
import { createPinia } from 'pinia';
import { bookmarkStore } from '@/store';

// 创建vue实例
const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.component('Icon', Icon);
globalDirect(app);
// 挂载实例
app.mount('#app');
