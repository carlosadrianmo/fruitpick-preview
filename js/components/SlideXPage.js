const SlideXPage = {
    template: `
    <aside class=" text-left shadow-xl shadow-gray-900/20 border-l-2 border-solid bg-gray-100 border-gray-300 p-4 w-3/4 h-full block fixed top-0 right-0">
      <div v-show="!loading">
          <header class="relative text-right"> 
            
            <RouterLink to="/" class="inline-block rounded-full bg-gray-300 text-gray-600 px-4 py-2 border-gray-400 border-solid border-2 absolute top-0 left-2">⟨ Back</RouterLink>
            <h2 class="text-right font-bold text-6xl inline-block" v-html="title"></h2>
          </header>  
          <div class="py-2 px-1">
            <slot></slot>
          
          </div>
    </div>
        <div v-show="loading" class="flex justify-center items-center justify-items-center h-full">
            <span class="animate-pulse text-5xl">Loading...</span>
        </div>
    
    </aside>
    
`,
    props: {
        title: String,
        content: String,
        loading: Boolean
    },
    data() { return {}; },
    created() {},
    mounted() {},
    watch: {},
    methods: {},
    components: {}
}

export default SlideXPage;