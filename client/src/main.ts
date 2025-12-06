import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from '@/router'

import { abilitiesPlugin } from '@casl/vue';
import { ability } from './plugins/ability';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(abilitiesPlugin, ability, {
    useGlobalProperties: true
})

app.mount('#app')
