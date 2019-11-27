<template>
	<div id="home">
		<!-- 首页banners -->
		<template v-if="!showLoading">
			<header-top></header-top>
			<home-swiper :banners="banners" @homeLoad="homeLoad"></home-swiper>
		</template>
		<template v-else>
			<van-loading type="spinner" color="#1989fa" style="position: absolute;top: 40%;left: 50%;transform: translate(-50%);">数据加载中...</van-loading>
		</template>
		<!-- 中部导航 -->
		<nav-bar :navList="navList"></nav-bar>
		<!-- 限时抢购 -->
		<flash-sale :productList="productList"></flash-sale>
		<!-- 猜猜你喜欢 -->
		<you-like :youLikeList="youLikeList"></you-like>
		<!-- 返回顶部 -->
		<mark-page v-if="showBackStatus" @scrollToTop="scrollToTop"></mark-page>
	</div>
</template>

<script>
// vue工程利用pubsub-js实现兄弟组件之间的通信
import PubSub from 'pubsub-js';
import { Toast } from 'vant';

//引入网络请求
import { getHomeData } from '@/service/api/index.js';
import headerTop from './components/header/Header.vue';
import homeSwiper from './components/HomeSwiper/HomeSwiper.vue';
import NavBar from './components/nav/Nav.vue';
import FlashSale from './components/flashSale/FlashSale.vue';
import YouLike from './components/youLike/YouLike.vue';
import markPage from './components/markPage/MarkPage.vue';
import { showBack, animate } from '@/config/global.js';

//引入vuex
import { mapMutations } from 'vuex';
export default {
	name: 'home',
	components: {
		headerTop,
		homeSwiper,
		NavBar,
		FlashSale,
		YouLike,
		markPage
	},
	data() {
		return {
			showLoading: true,
			banners: [],
			navList: [], //导航列表
			productList: [], //限时抢购列表
			youLikeList: [], //猜猜你喜欢列表
			showBackStatus: false
		};
	},
	mounted() {
		
		//订阅消息
		PubSub.subscribe('homeAddToCart', (msg, goods) => {
			// console.log(goods.product_name)
			if (msg === 'homeAddToCart') {
				this.ADD_GOODS({
					goodsId:goods.id,
					goodsName:goods.product_name,
					smallImage:goods.small_image,
					goodsPrice:goods.price
				})
				Toast('添加成功！');
			}
			// console.log(this.$store.state)
		});
	},
	created() {
		getHomeData()
			.then(res => {
				// console.log(res);
				if (res.data.success) {
					this.banners = res.data.data.list[0].icon_list;
					this.banners.forEach(v => {
						v.image = v.icon_url;
						v.id = v.cid;
					});
					this.navList = res.data.data.list[2].icon_list;
					this.productList = res.data.data.list[3].product_list;
					this.youLikeList = res.data.data.list[12].product_list;
					this.showLoading = false;
					//开始监听滚动
					showBack(status => {
						this.showBackStatus = status;
						// console.log(status)
					});
				}
			})
			.catch(err => {
				console.log(err);
			});
	},
	methods: {
		...mapMutations(['ADD_GOODS']),
		//轮播图是否加载
		homeLoad() {
			console.log('加载完了');
		},
		scrollToTop() {
			console.log('返回顶部！');
			let docB = document.documentElement;
			// console.log(docB)
			animate(docB, { scrollTop: '0' }, 400, 'ease-out');
		}
	}
};
</script>

<style lang="less" scoped>
#home {
	height: 100%;
	width: 100%;
	background-color: #f5f5f5;
}
</style>
