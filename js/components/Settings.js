import ls from 'localstorage-slim'
import services from '../services.js'

const Settings = {
	data() {
		const app = ls.get('app')
		
		return {
			loading: false,
			form: {
				data: app.settings, // {fx_sounds, bg_music}
				status: 'default'
			}
		};
	},
	template: `
			<slide-y-page title="Settings" :loading="loading">
					<fieldset>
						<form @submit.prevent="save()">
	<div class="py-4 flex items-center align-center">
	<label for="fx_sounds" class="text-2xl flex-none w-1/2">Sound effects</label>
	<input type="checkbox" id="fx_sounds" class="text-2xl scale-150" v-model="form.data.fx_sounds" :checked="form.data.fx_sounds" true-value="1" false-value="0" />
</div>	
	
	
	<div class="py-4 flex items-center align-center">
	<label for="bg_music" class="text-2xl flex-none w-1/2">Background music</label>
	<input type="checkbox" id="bg_music" class="text-2xl scale-150" v-model="form.data.bg_music" :checked="form.data.bg_music" true-value="1" false-value="0" />
</div>	
	
	
				<button type="submit" class="px-8 py-2 text-2xl rounded-full text-gray-200 text-shadow-gray-400 border-4 border-solid border-gray-400" :class="{'bg-gray-900': form.status == 'default', 'bg-green-600': form.status == 'success'}">Save</button>
<hr />
<button type="button" class="text-2xl py-2 px-4 rounded-full bg-black text-white focus:ring-2" @click="share()">Share</button>
<button type="button" class="text-2xl py-2 px-4 rounded-full bg-gray text-white focus:ring-2" disabled>Add to Home screen</button>	
							</form>

					</fieldset>
					</slide-y-page>
			`,
	created() {
		
	},
	methods: {
		async share() {
			try {
				await navigator.share({
					url: location.origin + location.pathname,
					title: document.title,
					text: `${document.title} - Encuentra frutitas virtuales en el mundo real.`
				})
			}
			catch(e) {
				
			}
		},
		async save() {
			this.loading = true
//			const result = await services.saveSettings(this.form.data)
		// 	for (let i in result)
				//this.form.data[i] = result[i]
			const app = ls.get('app')
			app.settings = this.form.data
			document.body.dataset.fxSounds = app.settings.fx_sounds
			document.body.dataset.bgMusic = app.settings.bg_music
			ls.set('app', app)
			
			
		dispatchEvent(new CustomEvent('bgmusicstatuschange', { detail: { status: app.settings.bg_music } } ))
			this.loading = false
			
			this.$router.push('/game')
			
			// Update pet sound settings
			   
			
			}
		
	}
}
export { Settings };