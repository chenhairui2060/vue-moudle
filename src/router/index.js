import Vue from "vue"
import VueRouter from 'vue-router'
// import {
// 	getStore
// } from "@/config/global.js"
Vue.use(VueRouter)
//引入一级组件
import Dashboard from "@/views/dashboard/Dashboard.vue"
const Home = () => import('@/views/home/Home.vue')
const Cart = () => import('@/views/cart/Cart.vue')
const Category = () => import('@/views/category/Category.vue')
const Mine = () => import('@/views/mine/Mine.vue')
const Login = () => import('@/views/login/Login.vue')
const router = new VueRouter({
	routes: [{
			path: '/dashboard',
			name: 'dashboard',
			component: Dashboard,
			children: [{
					path: '/dashboard',
					redirect: '/dashboard/home'
				},
				{
					path: 'home',
					name: 'home',
					component: Home,
					meta: {
						keepAlive: true
					}
				},
				{
					path: 'cart',
					name: 'cart',
					component: Cart
				},
				{
					path: 'category',
					name: 'category',
					component: Category,
					meta: {
						keepAlive: false
					}
				},
				{
					path: 'mine',
					name: 'mine',
					component: Mine
				}
			]
		},
		{
			path: '/login',
			name: 'login',
			component: Login
		},
		{
			path: '/',
			redirect: '/dashboard'
		},
		{
			path: '*', // 错误路由
			redirect: '/dashboard' //重定向
		}
	]
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
	// to: Route: 即将要进入的目标 路由对象
	// from: Route: 当前导航正要离开的路由
	//如果next为空则路由正常进行跳转，如果next不为空，则进行跳转时，会中断
	console.log('目标路径', to)
	const nextRoute = ['home', 'cart', 'category', 'category'];
	let token = false  // 是否登录，一般从storage中读取
	console.log(token)
	// // 未登录状态；当路由到nextRoute指定页时，跳转至login
	if (nextRoute.indexOf(to.name) >= 0) {
		if (!token) {
			console.log('what fuck');
			router.push({
				name: 'login'
			})
		}
	}
	// 已登录状态；当路由到login时，如果已经登录过，则跳转至home
	if (to.name === 'login') {
		if (token) {
			router.push({
				name: 'home'
			});
		}
	}
	next();
});
export default router;
