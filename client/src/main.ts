import { createPinia } from 'pinia'
import { Dialog, Quasar } from 'quasar'
import { createRouter, createWebHistory } from 'vue-router'

import { VueQueryPlugin } from '@tanstack/vue-query'
import Vue3Toastify from 'vue3-toastify'

import App from './App.vue'
import { routes } from './router'

import { setupNprogress } from '~/modules/nprogress'
import { setupPwa } from '~/modules/pwa'
import { vueQueryPluginOptions } from '~/modules/vue-query'

import '@quasar/extras/material-icons/material-icons.css'
import '@unocss/reset/tailwind.css'
import 'quasar/src/css/index.sass'
import 'uno.css'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import 'vue3-toastify/dist/index.css'
import './styles/main.css'
import './styles/quasar.scss'
import './styles/vars.css'

const app = createApp(App)

const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
})

const pinia = createPinia()

setupNprogress(router)

setupPwa(router)

setupTypeboxErrors()
setupTypeboxFormats()

app.use(Vue3Toastify, { autoClose: 3000 })

app.use(VueQueryPlugin, vueQueryPluginOptions)

app.use(Quasar, { plugins: { Dialog } })

app.use(router)

app.use(pinia)

app.mount('#app')
