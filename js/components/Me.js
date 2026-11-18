import ls from 'localstorage-slim'
import config from '../config.js'

const Me = {
	data() {
		return {
			form: {
				
				data: {
					username: '',
					email: '',
					
				},
				status: 'default'
			},
			user: {}
		};
	},
	
	template: `
			<slide-y-page title="Profile" v-slot:default="slotProps">
					<div class="grid grid-cols-2">
	<div class="">
					<form @submit.prevent="save()">
			 <input type="text" v-model.lazy="form.data.username" class="p-4 text-2xl text-gray-700 border-4 rounded-full border-solid border-gray-700 mb-4 outline-0 focus:ring-4" :placeholder="user.username || 'Write a nice username'" /><br />
	<input type="email" v-model.lazy="form.data.email" class="p-4 text-2xl text-gray-700 border-4 rounded-full border-solid border-gray-700 mb-4 outline-0 focus:ring-4" :placeholder="user.email || 'Your email'" /><br />
				<button type="submit" class="px-8 py-2 text-2xl rounded-full text-gray-200 text-shadow-gray-400 border-4 border-solid border-gray-400" :class="{'bg-gray-900': form.status == 'default', 'bg-green-600': form.status == 'success'}">Save</button>
							</form>
	
	</div>
	<div class="text-right">
				<RouterLink to="/logout" class="px-4 py-2 inline-block p-2 text-gray-600">Logout <icon-log-out class="inline" /></RouterLink>
	</div>
	</div>
	
					</slide-y-page>
	
			`,
	methods: {
		save() {
			// fetch()
			
			for (let d in this.form.data) {
				this.user[d] = this.form.data[d]
			}
			
			
			
			ls.set('user', this.user)
			
			dispatchEvent(new CustomEvent('userloggedin', { detail: this.user }))
			
			this.form.status = 'success'
			setTimeout(() => {
				this.form.status = 'default'
				this.$router.push('/game')
			}, config.UI_TIMEOUT)
		},
		
	},
	
	created() {
		
			this.user = ls.get('user')
			
			// setup form data
			for (let d in this.form.data) {
				this.form.data[d] = this.user[d]
			}
			
	}
	
}

export { Me }