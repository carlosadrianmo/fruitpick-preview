const App = {
template: `
<div>
    <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>
    <slot></slot>
    </div>
`,
data() { return {}; },
created(){},
mounted(){},
watch: {},
methods: {
},
components: {
}
}

export default App;
