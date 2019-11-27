import Vue from 'vue'
import App from './App.vue'
import router from "./router/index.js"

//6.引入vuex store
import store from "./store/index.js"
Vue.config.productionTip = false
//1.引入fastclick
import FastClick from "fastclick"
if ('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', function() {
		FastClick.attach(document.body);
	}, false);
}
//2.引入全局样式
import "@/style/common.less"
//3.引入全局ui  vant
import "@/plugins/vant.js"
//4.引入rem
import "@/config/rem.js"
//5.引入全局过滤器
import "@/config/filters.js"

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
