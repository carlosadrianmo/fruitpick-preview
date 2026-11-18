import { nextTick } from 'vue'

import config from '../config.js'
import services from '../services.js'


const Ranking = {
    data() {
        return {
            users: [],
            loading: false
        };
    },
    async mounted() {
        // Ranking refreshes on every request
        try {
            this.loading = true
            let ranking = await services.getRanking()
            
            this.users.forEach((item, i) => {
                this.users.splice(i, 1)
            })
            nextTick()
            ranking.forEach((item, i) => {
                this.users.splice(i, 0, item)
            })
            nextTick()
            this.loading = false
        } catch (e) {
            this.loading = false
            console.log(e)
        }
    },
    methods: {
        onBeforeEnter(el, done) {
                el.style.opacity = 0;
                el.style.transform = 'translateY(0)';
            },
            onEnter(el, done) {
                gsap.to(el, {
                    opacity: 1,
                    translateY: '64px',
                    delay: el.dataset.index * config.delayPerToast,
                    onComplete: done
                });
            },
            onLeave(el, done) {
                gsap.to(el, {
                    opacity: 0,
                    translateY: 0,
                    delay: el.dataset.index * config.delayPerToast,
                    onComplete: done
                });
            }
    },
    template: `
			<slide-y-page title="Ranking" :loading="loading">
    <h3 class="text-center">Invite people to the game! <icon-share :class="inline-block" /></h3>
    <transition-group tag="ol" name="fade-list" class="grid grid-cols-2 gap-2" @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave">
		   	    <li v-for="(user, key) in users" :data-index="key" :key="user">
            <article class="flex items-center gap-1 rounded-sm shadow-sm shadow-orange-200 h-48">
	               <figure class="w-2/5 flex-none p-3 border-solid border-r-2 border-orange-200 text-center justify-items-center relative">
	               <img v-if="user.profile_image_url" :src="user.profile_image_url" class="rounded-full bg-gray-3000" />
                <icon-user class="inline-block text-6xl" v-else />
                <span class="absolute animate-pulse block w-12 h-12 text-center text-3xl z-100 right-2 top-2 rounded-full bg-orange-500/50 text-white line-height-12">{{ key + 1 }}</span>
                </figure>
    
                <div class="w-3/5">
                    <div class="flex flex-col-reverse items-center justify-around">
        	           <h3 class="text-orange-800 text-shadow-xs text-shadow-orange-500">{{ user.username }}</h3>
        	           <p><strong class="text-4xl">{{ user.score }}</strong></p>
                    </div>
	               </div>
	           </article>
	      </li>
    </transition-group>
					
					</slide-y-page>
			`
    
}
export { Ranking };