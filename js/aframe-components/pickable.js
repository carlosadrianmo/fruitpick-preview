const ANIMATION_DURATION = 840;
const ANIMATION_DELAY_START = 120;
const ANIMATION_SIT = 'IdleSit';
const ANIMATION_WALK = 'WalkCycle';

AFRAME.registerComponent('pickable', {
  events: {
    obbcollisionstarted(ev) {
        let biteDur = 758, 
            totalBites = 3
        ;
            
      dispatchEvent((new CustomEvent('fruitbite')))
      
      if(parseInt(document.body.dataset.fxSounds)) {
        let biteCounts = 0, 
            intvl = setInterval(() => {
                biteCounts++
                biteSound.play()
                if(biteCounts == totalBites - 1)
                    clearInterval(intvl)
            }, biteDur)
        // wait until fruit gets eaten to remove 
        setTimeout(() => {
          dispatchEvent((new CustomEvent('scoreupdate', { detail: { points: Number(ev.target.getAttribute('points')) } })))
            ev.target.remove()

        }, biteDur * totalBites)
      }
      
    },
    click(ev) {
      let f = ev.target,
        fruitCoords = f.getAttribute('gps-new-entity-place'),
        position = f.getAttribute('position'),
        points = parseInt(f.getAttribute('points')),
        pet = document.querySelector('#pet'),
        score = document.querySelector('.score'),
        animations = pet.getAttribute('animations')
      ;
      
      
      pet.setAttribute('animation__position', {
        property: 'position',
        to: position,
        dur: ANIMATION_DURATION,
        delay: ANIMATION_DELAY_START,
        loop: false
        // startEvents: 'click'
      })
      pet.setAttribute('look-at', position)
      
      if(animations.walk) {
            pet.setAttribute('animation-mixer', {
                clip: animations.walk,
                // duration: 0
                loop: true // || duration
            })
      }
        
      setTimeout(() => {
        pet.setAttribute('gps-new-entity-place', fruitCoords)
        pet.removeAttribute('animation_position')
        if(animations.sit) {
            pet.setAttribute('animation-mixer', {
                clip: animations.sit,
                // duration: 0
                loop: true // || duration
            })
        }
        
        pet.setAttribute('look-at', '[gps-new-camera]');
      }, ANIMATION_DURATION + ANIMATION_DELAY_START)
      
    }
  },
  init() {
    
    
  }
})