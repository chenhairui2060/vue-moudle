<template>
	<div id="dashboard">
		<van-tabbar v-model="active" active-color="#e9464c">
			<van-tabbar-item replace to="/dashboard/home">
				<span>首页</span>
				<img slot="icon" slot-scope="props" :src="props.active ? homeIcon.active : homeIcon.inactive" />
			</van-tabbar-item>
			<van-tabbar-item replace to="/dashboard/category">
				<span>分类</span>
				<img slot="icon" slot-scope="props" :src="props.active ? categoryIcon.active : categoryIcon.inactive" />
			</van-tabbar-item>
			<van-tabbar-item replace to="/dashboard/cart">
				<span>购物车</span>
				<img slot="icon" slot-scope="props" :src="props.active ? cartIcon.active : cartIcon.inactive" />
			</van-tabbar-item>
			<van-tabbar-item replace to="/dashboard/mine">
				<span>我的</span>
				<img slot="icon" slot-scope="props" :src="props.active ? mineIcon.active : mineIcon.inactive" />
			</van-tabbar-item>
		</van-tabbar>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
		<keep-alive><router-view v-if="$route.meta.keepAlive"></router-view></keep-alive>
	</div>
</template>

<script>
export default {
	data() {
		return {
			active: Number(sessionStorage.getItem('tabbarIndex'))||0,
			homeIcon: {
				active: require('@/images/tabbar/home-active.png'),
				inactive: require('@/images/tabbar/home.png')
			},
			categoryIcon: {
				active: require('@/images/tabbar/classify-active.png'),
				inactive: require('@/images/tabbar/classify.png')
			},
			cartIcon: {
				active: require('@/images/tabbar/carts-active.png'),
				inactive: require('@/images/tabbar/carts.png')
			},
			mineIcon: {
				active: require('@/images/tabbar/my-active.png'),
				inactive: require('@/images/tabbar/my.png')
			}
		};
	},
	watch: {
		active(value) {
			// console.log(value);
			let tabbarIndex = value > 0 ? value : 0;
			//缓存到本地
			sessionStorage.setItem('tabbarIndex', tabbarIndex);
		}
	},
	created() {
		// console.log(this.$route)
	}
};
</script>

<style lang="less" scoped>
#dashboard {
	height: 100%;
	width: 100%;
	background-color: blanchedalmond;
	.van-tabbar-item__icon img {
		display: block;
		height: 24px;
	}
}
</style>
