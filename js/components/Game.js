import _ from 'underscore'
import ls from 'localstorage-slim'
import services from '../services.js'

import { getNearbyCoordsFrom, addFruitsNearby } from '../utils.js'
const doc = document;



function createPet(attrs) {
    
    let pet = doc.createElement('a-entity'),
        user = ls.get('user'),
        app = ls.get('app')
        
        ;
    
    // will b set on db
    // user.current_pet_phase = app.assets.pets[0].phases[0]
        
    pet.setAttribute('gltf-model', `#${user.current_pet_phase.slug}`);
    pet.setAttribute('scale', Array(3).fill(user.current_pet_phase.scale).join(' '));
    
    
    pet.setAttribute('patpat', null);
    pet.setAttribute('id', 'pet');
    pet.setAttribute('draggable', null);
    pet.setAttribute('obb-collider', null);
    
    pet.setAttribute('animations', user.current_pet_phase.animations)
    
    pet.setAttribute('sound', {
        src: '#bite-long',
        on: 'fruitbite',
        
    })
    
    
    if(user.current_pet_phase.animations.standby) {
        pet.setAttribute('animation-mixer', {
            clip: user.current_pet_phase.animations.standby,
            // duration: 0
            loop: true // || duration
        })
    }
    
    
    // pet.setAttribute('look-at', '[gps-new-camera]');
    pet.addEventListener('model-loaded', ev => {
        console.log('Pet loaded')
        dispatchEvent(new CustomEvent('petchanged', {details: {pet}}))
    })
    
    
        setInterval(() => {
            pet.setAttribute('look-at', '[gps-new-camera]')
        }, 20000)
    
    return pet
}

function addAssetItem(item, lib, tagName = 'a-asset-item') {
    let assetItem = doc.createElement(tagName);
    
    assetItem.setAttribute('id', item.slug)
    assetItem.setAttribute('src', item.file_url) 
    assetItem.setAttribute('preload', 'auto')
    
    if(tagName == 'audio') {
       services.addSound(item.slug, new Howl({
            src: [item.file_url]
        }))
        // sound.play()
    }
    
    
    lib.appendChild(assetItem)
}


function initAssets() {
    
    const descriptor = ls.get('app'),
        user = ls.get('user'),
        scene = doc.querySelector('a-scene');
    
    let lib = doc.createElement('a-assets');
    
    lib.setAttribute('timeout', 30000);
    
    // Add pet to the scene and update its position according to camera location
    lib.addEventListener('loaded', () => {
        
        let camera = doc.querySelector('[gps-new-camera]'),
            user = ls.get('user'),
            pet = createPet(user.pet)
        ;
        
        scene.appendChild(pet);
        
        camera.addEventListener('gps-camera-update-position', (ev) => {
            let coords = ev.detail.position,
                amount;
            
            // tune position of pet and place it on t
            coords.longitude += 0.000001 * _.random(-5, 5);
            
            pet.setAttribute('gps-new-entity-place', coords);
            
            /*
            pet.object3D.rotation.x = 0
            pet.object3D.rotation.y = 0
            pet.object3D.rotation.z = 0
            */
            
            // add some fruits on every location update
            amount = addFruitsNearby(_.pluck(descriptor.assets.fruits, 'slug'), coords, scene)
            
            console.log(`found ${amount} fruits on ${String(coords.latitude).substr(0, 5)}, ${String(coords.longitude).substr(0, 5)}`)
            
        });
        
        
        
            
    });
    
    let petPhases = _.flatten(_.pluck(descriptor.assets.pets, 'phases')) //.each(item => { petPhases = _.union(petPhases, item) })
    let assetsList = _.union(descriptor.assets.fruits, petPhases, descriptor.assets.characters)
    
    
    assetsList.forEach(item => { addAssetItem(item, lib) })
    descriptor.assets.sounds.forEach(item => { addAssetItem(item, lib, 'audio') })
    
    scene.prepend(lib);
    
    return lib;
}

const Game = {
    template: `
			<div>
  <div class="container mx-auto text-center py-4 h-[100vh]">
    <div class="h-full mx-auto bg-green-200 border-solid border-1 border-gray-400 rounded-md shadow-md shadow-gray-400">
    
      <a-scene vr-mode-ui="enabled: false;" cursor="rayOrigin: mouse" raycaster="objects: [gltf-model]" arjs="trackingMethod:best; videoTexture: true; sourceType: webcam; debugUIEnabled: false;"
			   renderer="logarithmicDepthBuffer: true; precision: medium;antialias: true; alpha: true;" obb-collider device-orientation-permission-ui embedded>
	
       <a-entity id="rig" position="-0.85 1.6 0.5"> 
    <a-camera gps-new-camera look-controls-enabled wasd-controls-enabled></a-camera>
    
        </a-entity>
        
      </a-scene>
    </div>
    <nav class="fixed grid grid-cols-4 gap-1 bottom-0 w-3/4 left-1/8 bottom-20 md:w-1/2 md:left-1/4 border-1 border-solid border-orange-900 rounded-full bg-white/90 pl-4 shadow-md shadow-orange-500">
      <span class="p-4 inline-block rounded-full bg-red-500/85 text-white w-30 h-30 text-5xl text-center border-6 border-solid border-white absolute -left-15 -top-15 mask:bg-blur"><span class="line-height-18 pt-3 block">{{ user.score }}</span><span class="block text-xs">pts</span></span>
      
      <RouterLink v-for="(item, i) in menuItems" :to="item.url" class="p-2 inline-block text-lg text-center text-sm" :class="{'border-l-1 border-solid border-gray-900' : i == menuItems.length - 1}" v-show="!item.auth || (item.auth && user.username)">
        <div><Component :is="item.icon" class="inline-block" /></div> <div v-text="item.text"></div>
      </RouterLink>
      
    </nav>
    
    <footer class="p-5 fixed bottom-0 w-full left-0">
      <p class="text-gray text-sm text-center">© 2026 Devignia</p>
    </footer>
  </div>
  <RouterView v-slot="{ Component }">
    <Transition name="slide-y">
      <Component :is="Component" />
    </Transition>
  </RouterView>
</div>
	   `,
    data() {
        return {
            perms: {
                granted: true
            },
           menuItems:[ {
      url: '/game/me',
      icon: 'icon-gamepad',
      text: 'Profile',
               auth: false
      },
    {
      url: '/game/my-pets',
      icon: 'icon-paw-print',
      text: 'Pets',
        auth: true
      },
    {
      url: '/game/ranking',
      icon: 'icon-trophy',
      text: 'Top 10',
        auth: true
      },
    {
      url: '/game/settings',
      icon: 'icon-cog',
      text: 'Settings',
        auth: false
      }],
            user: {}
        }
    },
    
    created() {
        if (!this.perms.granted)
            return this.$router.push('/');
        
        this.user = ls.get('user')
        
        addEventListener('userloggedin', ev => {
            this.user = ev.detail
        })
        
        addEventListener('petchanged', ev => {
            if(this.$route.path == '/game/my-pets')
              this.$router.push('/game')
   
        })
        
        
    },
    
    mounted() {
        
    
        initAssets();    
        
        const scoreSound = (new Howl({
          src: [
            document.querySelector('#score-1').getAttribute('src')
          ]
        }))
        
        
        const biteSound = (new Howl({
          src: [
            document.querySelector('#bite-short').getAttribute('src')
          ]
        }))
        
        const bgMusic = (new Howl({
          src: [
            document.querySelector('#hyoukinahana-tou').getAttribute('src')
          ],
            loop: true
        }))
        
        if(parseInt(document.body.dataset.bgMusic) && !parseInt(document.body.dataset.musicIsPlaying)) {
            bgMusic.play()
            document.body.dataset.musicIsPlaying = 1
        }
            

        addEventListener('scoreupdate', ev => {
            this.user.score += ev.detail.points;
            ls.set('user', this.user)
            if(parseInt(document.body.dataset.fxSounds)) 
                scoreSound.play()
        })
        
        addEventListener('bgmusicstatuschange', ev => {
            
            document.body.dataset.musicIsPlaying = parseInt(ev.detail.status)
            return parseInt(ev.detail.status) ? bgMusic.play() : bgMusic.stop();
        })

        addEventListener('fruitbite', ev => {
          if(parseInt(document.body.dataset.fxSounds)) 
            biteSound.play()
        })
        
    }
}

export { Game };