import { registerPlugins } from './plugins'
import router from './router';
// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import store from './store';

const app = createApp(App)
app.use(router)
app.use(store)

registerPlugins(app)
app.mount('#app')
