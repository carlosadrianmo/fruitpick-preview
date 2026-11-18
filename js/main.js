import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import ls from 'localstorage-slim'

import routes from './routes.js'
import config from './config.js'
import services from './services.js'
import iconsProvider from './icons-provider.js'

import App from './components/App.js'
import SlideXPage from './components/SlideXPage.js'
import SlideYPage from './components/SlideYPage.js'

try {
  const router = createRouter({
    history: createWebHashHistory(),
    routes,
  })
  
  
  const app = createApp({
    data() {
      return {};
    },
    async beforeCreate() {
      await services.registerApp()
      await services.registerUser()
      console.log(`${config.name} ${config.version}`)
    },
    created() {
      document.title = config.name
    },
    components: {
      'app': App,
    }
  })
  app.use(router)
  app.component('slide-x-page', SlideXPage)
  app.component('slide-y-page', SlideYPage)
  iconsProvider.provide(app)
  app.mount('#app')
  
} catch (e) {
  console.error(JSON.stringify(e.message))
}