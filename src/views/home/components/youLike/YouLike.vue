<template>
	<div class="wrapper">
		<div class="titleWrapper">
			<div class="middleLine"></div>
			<div class="title">猜猜 你喜欢</div>
		</div>
		<div class="contentWrapper">
			<you-like-item v-for="product in youLikeList" :product="product" :key="product.id"></you-like-item>
		</div>
	</div>
</template>

<script>
	import YouLikeItem from "./YouLikeItem.vue"
	export default{
		name:"YouLike",
		props:{
			youLikeList:Array
		},
		components:{
			YouLikeItem
		}
	}
</script>

<style lang="less" scoped>
	.wrapper{
		margin-top: 0.625rem;
		.titleWrapper{
			position: relative;
			padding: 0 0.625rem;
			height: 2.1875rem;
			text-align: center;
		}
		.middleLine{
			padding-top: 1.09375rem;
			border-bottom: 1px solid #D8D8D8;
		}
		.title{
			position: relative;
			display: inline-block;
			top: -1.09375rem;
			padding: 0 1.25rem;
			line-height: 2.1875rem;
			font-size: 1rem;
			background-color: #f5f5f5;
		}
		.contentWrapper{
			margin-bottom: 3.3334rem;
		}
	}
</style>
