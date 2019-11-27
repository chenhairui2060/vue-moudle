<template>
	<swiper :interval="intervalTime" style="margin-top:3.125rem;">
		<swiper-item v-for="item in banners" :key="item.id">
			<a :href="item.link"><img :src="item.image" @load="imgageLoad" /></a>
		</swiper-item>
	</swiper>
</template>

<script>
import { Swiper, SwiperItem } from '@/components/common/swiper';
export default {
	name: 'HomeSwiper',
	props: {
		banners: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	data() {
		return {
			isLoad: false
		};
	},
	computed:{
		intervalTime(){
			return this.banners.length*1000
		}
	},
	components: {
		Swiper,
		SwiperItem
	},
	methods: {
		imgageLoad() {
			if (!this.isLoad) {
				this.$emit('homeLoad');
				this.isLoad = true;
			}
		}
	}
};
</script>

<style scoped>
	a{
		margin: 0;
		padding: 0;
	}
</style>
