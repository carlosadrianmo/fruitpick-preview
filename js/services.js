import ls from 'localstorage-slim'
import config from './config.js'
import {user as userModel} from './models.js'

const services = {
    
    sounds: {},
    
    // Stores a user reference or resets it
    async registerUser(reset) {
        if (reset) {
            ls.remove('user')
            ls.set('user', userModel)
        }
        
        if(ls.get('user') == null)
            ls.set('user', userModel)
        
        let app = ls.get('app'),
            user = ls.get('user')
        ;
        
        user.current_pet = user.current_pet_id == 0 ? app.assets.pets[0] : user.current_pet
        user.current_pet_phase = user.current_pet.phases[0]
        
        user.current_pet_id = user.current_pet.id
        user.current_pet_phase_id = user.current_pet_phase.id
        
        
        // Store the User Model
        ls.set('user', user)
        
        
    },
    
    // Resets the user reference to a new model state
    resetUser() {
        this.registerUser(true)
    },
    
    addSound(slug, obj) {
        this.sounds[slug] = obj
    },
    
    playSound(slug){
        this.sounds[slug].play()
    },
    
    // Stores the app descriptor on localstorage
    async registerApp() {
        
        if (!ls.get('app'))
            ls.set('app', config)
        
        document.body.dataset.fxSounds = config.settings.fx_sounds
        document.body.dataset.bgMusic = config.settings.bg_music
        
        // Refresh local assets urls
        config.assets = await this.call('/assets')
        ls.set('app', config)
        
    },
    
    async getRanking() {
        return await this.call('/ranking')
    },
    
    async call(path, params, method = 'get') {
        try {
            
            const response = await fetch(
                `${config.apiUrl}${path}?_=${(new Date()).toISOString()}`
            )
            
            return await response.json()
        } catch (e) {
            throw Error(`Error fetching API: ${e}`)
        }
        
    },
    
    async saveSettings(fdObj) {
        const fd = this.asFormData(fdObj)
        return await this.call('/settings', fd)
    },
    
    asFormData(data) {
        const fd = new FormData()
        for (let d in data)
            fd.append(d, data[d])
    }
}

export default services;
