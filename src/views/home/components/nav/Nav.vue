<template>
	<div class="wrapper">
		<div class="itemWrapper" v-for="item in navList" :key="item.cid">
			<div class="imgageWarpper"><img class="image" :src="item.icon_url" /></div>
			<div class="titleWrapper"><span class="title">{{item.name}}</span></div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Nav',
	props: {
		navList:Array
	},
	data() {
		return {};
	}
};
</script>

<style lang="less" scoped>
.wrapper {
	padding-top: 0.9375rem;
	background: #ffffff;
	padding-bottom: 0.9375rem;
	.itemWrapper {
		display: inline-block;
		padding-top: 0.3125rem;
		width: 20%;
		.imgageWarpper {
			padding-bottom: 58.823%;
			height: 0;
			overflow: hidden;
			text-align: center;
			.image {
				height: 2.666rem;
				width: 2.666rem;
				border-radius: 50%;
			}
		}
		.titleWrapper {
			height: 1.4rem;
			width: 100%;
			text-align: center;
			color: #666666;
			line-height: 1.4rem;
			font-size: 0.6rem;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
}
</style>
