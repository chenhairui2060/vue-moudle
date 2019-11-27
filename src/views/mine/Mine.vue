<template>
	<div id="mine"><van-nav-bar title="个人中心" :fixed="true" :border="false" /></div>
</template>

<script>
import { getUserInfo } from '@/service/api/index.js';
export default {
	data() {
		return {};
	},
	async created() {
		let code=await getUserInfo()
		console.log(code)
	}
};
</script>

<style lang="less" scoped>
#mine {
	height: 100%;
	width: 100%;
	background-color: #f5f5f5;
	.van-nav-bar__title {
		background: #fe6263;
		font-size: 1.066666rem;
	}
}
</style>
