import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from '@/router'

import { abilitiesPlugin } from '@casl/vue';
import { ability } from './plugins/ability';
import i18n from './i18n';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(abilitiesPlugin, ability, {
    useGlobalProperties: true
})

app.mount('#app')
