const SlideYPage = {
  template: `
  <aside class="text-left shadow-xl shadow-gray-900/20 border-2 border-b-0 border-solid bg-gray-100 border-gray-300 rounded-t-lg p-4 w-4/5 h-full fixed left-1/10 top-50 mask-bg-blur-50">
          <div v-show="!loading">
      <header class="p-2 relative text-right border-b-1 border-solid border-gray-20">
         
          <h2 class="font-bold text-4xl text-right inline-block" v-html="title"></h2>
          <RouterLink to="/game" class="rounded-full bg-gray-200 text-gray-600 p-2 text-2xl absolute inline-block top-0 left-2 scale-125">
            <icon-chevron-down-circle />
            </RouterLink>

      </header>
      <div class="py-2 px-1 overflow-y-scroll ov max-h-[50vh]">
        <slot v-bind:formData="formData"></slot>
      
      </div>
            
  
        </div>

              <div v-show="loading" class="flex justify-center items-center justify-items-center h-full">
            <span class="animate-pulse text-5xl">Loading...</span>
        </div>

      
    </aside>
`,
  props: {
    title: String,
    formData: Object,
    loading: Boolean
  },
  data() { return {}; },
  created() {},
  
  mounted() {
    
  },
  watch: {},
  methods: {},
  components: {}
}

export default SlideYPage;