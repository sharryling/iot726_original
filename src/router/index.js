import Vue from 'vue'
import Router from 'vue-router'
import Menu from '@/components/Menu'
/* import pageon from '@/components/pageon' 
import list_show from '@/components/list_show'  */

Vue.use(Router)

export default new Router({
	linkActiveClass: 'active',
	routes: [
		{
			path: '/',
			component: Menu
		},
	   	{ 
	   		path: '/menu', 
	   		component: Menu,
	   		children : [{
	   			path : '/customer-login',
	    		// 懒加载
				component : resolve => require(['@/components/Login.vue'],resolve),
	    	},{
	    		path : '/regist',
	    		// 懒加载
	    		component : resolve => require(['@/components/Regist.vue'],resolve)
			},				
				{
					path: '/list_show',/* /:id/:token */
					name: '/list_show',
					component : resolve => require(['@/components/list_show.vue'],resolve),
					children : [{
						path : '/pageon',/* /:imei/:status/:id/:token */
						name: '/pageon',
					 // 懒加载
					 component : resolve => require(['@/components/pageon.vue'],resolve),
				 }]


				  }
			]
		
		
		
		},
		/* {
			path: '/pageon/',
			name: '/pageon',
			component: pageon
		  },  */
		  /* {
			path: '/list_show',
			name: '/list_show',
			component : resolve => require(['@/components/list_show.vue'],resolve)
		  },  */
	  /*   {
	    	path: '/home',
	    	component: Home,
	    	children : [
	    	]
		} */
	]
})
