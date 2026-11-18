import config from '../config.js';

const Home = {
	
	data() {
		return {
name: config.name
};
	},
	
	//			<div class="mx-auto relative flex w-80 flex-col justify-center bg-white rounded-2xl shadow-xl shadow-gray-400/20">
	
	template: `
			<div class="h-full">
    <section class="container mx-auto py-5 text-center h-screen flex flex-col justify-evenly items-center align-center justify-items-center">
      
      <div class="text-center">
         <img src="images/logo.png" class="rounded-full bg-orange-100/50 border-0 inline-block w-50 h-50">
      </div>
     
      <h1 class="text-2xl" v-text="name"></h1>
      <p class="text p-4 text-xl text-gray-700">Frutitas virtuales en el mundo real.</p>
			
						<RouterLink to="/game" class="px-12 py-4 inline-block rounded-full bg-teal-200 text-teal-800 text-6xl text-center text-shadow-sm text-shadow-white shadow-teal-400 shadow-sm border-teal-400 border-2 border-solid animate-pulse passion">Play</RouterLink>

      
			 <nav class="flex flex-row items-center justify-center gap-4 text py-4">
				
				<RouterLink to="/about/how-to" class="inline-block rounded-full border-1 border-solid border-gray-900 px-2 py-1">How to</RouterLink>
				<RouterLink to="/about/credits" class="inline-block rounded-full border-1 border-solid border-gray-900 px-2 py-1">About</RouterLink>
			  </nav>
			
			<footer>
        <p class="text-gray text-sm p-4">© 2026 Devignia</p>
      </footer>
     </section>
			
  <RouterView v-slot="{ Component }">
    
					  <Transition name="slide-x">
						<Component :is="Component" />
					  </Transition>
				  
     </RouterView>
			  
					</div>
				`,
async created() {
	   // enable button
	  
//  	 await navigator.permissions.query({name: 'camera'}).then(res => console.log(JSON.stringify(res.detail)))
	  
	   // requires camera perm
	   // await navigator.mediaDevices.enumerateDevices().then(res => {})
}	
}

export { Home };