import _ from 'underscore'
import { marked } from 'marked'

import config from '../config.js'

const PageX = {
    template: `
    							<slide-x-page :loading="loading" :title="page.title">
         <div v-html="page.content"></div>
    					</slide-x-page>
							`,
    data() {
        return {
            page: {
                title: '',
                content: ''
            },
            loading: false
        };
    },
    async created() {
        
        this.loading = true
        try {
            const res = await fetch(config.apiUrl + '/pages')
            const pages = await res.json()
            
            this.page = _.findWhere(pages, { slug: this.$route.params.slug }) // as object
            
            if (!this.page) {
                this.$route.redirect('/404')
                return;
            }
            
            
            this.page.content = marked.parse(this.page.content)
            
            this.loading = false
        } catch (e) {
            this.loading = false
            this.$route.redirect('/500')
            console.log(JSON.stringify(e))
        }
        
    }
};

export { PageX };