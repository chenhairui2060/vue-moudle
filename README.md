# znshop

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 创建项目
```
一，项目初始化
1.vue create projectName
	2.选择自定义   Manually select features
	   3.Babel，Router， Vuex，CSS Pre-processors， Linter / Formatter
	  4. Use history mode for router? (Requires proper server setup for index fallback in production)  是否使用history模式  选择n  
	   5.css预处理语言 选择less
	   6.然后一路回车
	删除项目中的
	asssts文件夹
	router 文件夹
	store  文件夹
	main.js删除  router，store的引用
	App.vue中删除  router-link  ,  多余的样式
	views中所有文件
	components 中的所有组件
	让项目变成一个干净的项目
二，
1.0在src目录创建项目必要的文件夹
	1.config  //配置文件 全局性的
	2.images  //图片文件夹
	3.plugins  //插件
	4.router   //路由
	5.store	   //vuex
	6.service //服务端
	7.style  //样式
2.0 配置FastClick
	处理300ms延迟  ，卡顿的问题
	npm i fastclick --save 
	 1.引入FastClick
	 在main.js中
	 import FastClick from "fastclick"
	 if ('addEventListener' in document) {
	     document.addEventListener('DOMContentLoaded', function() {
	         FastClick.attach(document.body);
	     }, false);
	 }
	 2.配置全局样式
	 style文夹下新建： common.less
	 dashboard  主页面
	 一级页面搭建  mine home category cart
	 views目录下面
	3.配置路由
	        3.1router文件下新建index.js
	        3.2在main.js中引入router  
			3.2.1  引入import router from "./router/index"
			3.2.2  挂载到vue中   new Vue({
									router,	
									render: h => h(App)
								}).$mount('#app')
								
    4.引入vant ui库
	  npm i vant --save
	  自动按需引入组件
	  npm i babel-plugin-import -D
	   在babel.config.js里面加入
		plugins: [
	      ['import', {
	        libraryName: 'vant',
	        libraryDirectory: 'es',
	        style: true
	      }, 'vant']
	    ]
		在plugins文件夹下新建  vant.js 文件
				import Vue from "vue"
				import { Tabbar, TabbarItem} from 'vant';
				Vue.use(Tabbar).use(TabbarItem);
		引入tabbar组件  按需引入
    5.引入axios 请求网络数据
	安装axios   npm i axios --save
	
	6.安装轮播插件  npm install vue-awesome-swiper --save
	
	7.通过keepAlive
	   meta:{
				keepAlive:true
			}
	属性来控制是否需要缓存  
	<router-view v-if="!$route.meta.keepAlive"></router-view>
	<keep-alive>
		<router-view v-if="$route.meta.keepAlive"></router-view>
	</keep-alive>
	8.引用全局js global.js  
	import { showBack, animate } from '@/config/global.js';
	//开始监听滚动  
	showBack(status => {
		this.showBackStatus = status;
	});
	scrollToTop() {
		console.log('返回顶部！');
		//返回顶部动画
		let docB =  document.documentElement;
		// console.log(docB)
		animate(docB, { scrollTop: '0' }, 400, 'ease-out');
	}
	8.引入better-scroll
	npm install better-scroll -S
	import BScroll from 'better-scroll'
	let scroll = new BScroll('.wrapper')
	9.vue工程利用pubsub-js实现兄弟组件之间的通信
	npm install pubsub-js --save
	10.动态验证（数据动态，规则动态）async-validat
	   npm i async-validate --save
```
