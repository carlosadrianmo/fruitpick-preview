import _ from 'underscore'
import config from './config.js'
import { marked } from 'marked'
import ls from 'localstorage-slim'

import { Home as HomeComponent } from './components/Home.js'

import { PageX as PageXComponent } from './components/PageX.js'
import { Settings as SettingsComponent } from './components/Settings.js'
import { Ranking as RankingComponent } from './components/Ranking.js'
import { MyPets as MyPetsComponent } from './components/MyPets.js'
import { Me as MeComponent } from './components/Me.js'
import { Game as GameComponent } from './components/Game.js'
import { Logout as LogoutComponent } from './components/Logout.js'


const routes = [
	{
		path: '/',
		component: HomeComponent,
		children: [
		{
			path: 'about/:slug',
			component: PageXComponent
		}]
	},
	
	{
		path: '/game',
		component: GameComponent,
		children: [
			{
				path: 'settings',
				component: SettingsComponent
			},
			{
				path: 'ranking',
				component: RankingComponent
			},
			{
				path: 'my-pets',
				component: MyPetsComponent
			},
			{
				path: 'me',
				component: MeComponent
				
			},
			
		]
	},
	{
		path: '/logout',
		component: LogoutComponent
	}
	
];

export default routes;