import ls from 'localstorage-slim'
import { nextTick } from 'vue'

import config from '../config.js'

const MyPets = {
    data() {
        
        return {
            pets: [],
            loading: false,
            currentPetId: 0
        };
    },
    template: `
			<slide-y-page title="My Pets" :loading="loading">
					<div>
	   <transition-group name="fade" tag="ul" class="grid grid-cols-2 gap-4" @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave">
	   <li v-for="(pet, p) in pets" :data-index="p" :key="pet">
	       <figure class="rounded-sm border-solid border-1 border-gray-200 shadow-md shadow-gray-200 hover:shadow-gray-400" :class="{ 'bg-orange-200' : currentPetId === pet.id }" :data-id="pet.id" @click="setCurrentPet(pet)">
	           <img :src="pet.image_url" class="cover w-full block bg-orange-100 rounded-t-sm" />
	           <figcaption class="text-center py-2">{{ pet.name }}</figcaption>
	       </figure>
	   </li>
	   </transition-group>
					</div>
					</slide-y-page>
			`,
    created() {
        
        const user = ls.get('user')
        this.currentPetId = user.current_pet_id
        
    },
    async mounted() {
        // Pets list refreshes on every request so animation can be appreciated
        try {
            this.loading = true
            const app = ls.get('app')
            
            app.assets.pets.forEach((item, i) => {
                this.pets.splice(i, 0, item)
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
            el.style.transform = 'scale(0.65)';
        },
        onEnter(el, done) {
            gsap.to(el, {
                opacity: 1,
                scale: 1,
                delay: el.dataset.index * config.delayPerToast,
                onComplete: done
            });
        },
        onLeave(el, done) {
            gsap.to(el, {
                opacity: 0,
                scale: 0.65,
                delay: el.dataset.index * config.delayPerToast,
                onComplete: done
            });
        },
        setCurrentPet(pet) {
            let petEl = document.querySelector('#pet'),
                user = ls.get('user')
            
            user.current_pet = pet
            user.current_pet_id = user.current_pet.id
            user.current_pet_phase = user.current_pet.phases[0]
            user.current_pet_phase_id = user.current_pet_phase.id
            this.currentPetId = user.current_pet_id
            
            ls.set('user', user)
            
            petEl.setAttribute('gltf-model', `#${user.current_pet_phase.slug}`);
            petEl.setAttribute('scale', Array(3).fill(user.current_pet_phase.scale).join(' '));
            
                
            petEl.setAttribute('animations', user.current_pet_phase.animations)
            
            if(user.current_pet_phase.animations.standby) {
                petEl.setAttribute('animation-mixer', {
                    clip: user.current_pet_phase.animations.standby,
                    // duration: 0
                    loop: true // || duration
                })
            }
            

        
        }
    }
    
    
}

export { MyPets };