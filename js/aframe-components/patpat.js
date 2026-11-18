AFRAME.registerComponent('patpat', {
    
    events: {
        click(ev) {
            console.log(ev)
            
            let pet = ev.target;
                if(pet.animations.patpat) {
                    pet.setAttribute('animation-mixer', {
                        clip: pet.animations.patpat,
                        // duration: 0
                        loop: true // || duration
                    })
                    setTimeout(() => {
                      pet.setAttribute('animation-mixer', {
                        clip: pet.animations.standby,
                        // duration: 0
                        loop: true // || duration
                      })  
                    }, 2500)

                }
                
        }
    }
});

