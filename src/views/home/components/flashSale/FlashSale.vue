<template>
	<div class="wrapper">
		<div class="titleWrapper">
			<div class="title">限时抢购</div>
			<span class="actionStateText">07:00场</span>
			<div class="actionStateTextEnd">已结束</div>
			<span class="more">更多</span>
		</div>
		<div class="itemWrapper">
			<flash-sale-item v-for="product in productList" :product="product" :key="product.id"></flash-sale-item>
		</div>
	</div>
</template>

<script>
	import FlashSaleItem from "./FlashSaleItem.vue"
	export default{
		name:"FlashSale",
		props:{
			productList:Array
		},
		components:{
			FlashSaleItem
		}
	}
</script>

<style lang="less" scoped>
	.wrapper{
		position: relative;
		margin-top: 0.625rem;
		padding: 1.25rem 0 0.9375rem 0;
		background-color: #FFFFFF;
		.titleWrapper{
			position: relative;
			margin: 0 0.625rem 0.625rem 0.625rem;
			height: 1.5625rem;
			.title{
				display: inline-block;
				border-left: 4px #3cb963 solid;
				padding-left: 0.3125rem;
				height: 1.3125rem;
				line-height: 1.3125rem;
				vertical-align: middle;
				font-size: 1.1875rem;
				color: #333;
			}
			.actionStateText{
				display: inline-block;
				vertical-align: middle;
				line-height: 0.8725rem;
				font-size: 0.8725rem;
				border-radius: 3px;
				padding: 0.15625rem;
				color: #fe3824;
				margin-left: 0.3125rem;
			}
			.actionStateTextEnd{
				display: inline-block;
				vertical-align: middle;
				line-height: 0.875rem;
				line-height: 0.875rem;
				border-radius: 3px;
				padding: 0.15625rem;
				border: 1px solid #999;
				color: #666;
				margin-left: 0.3125rem;
			}
			.more{
				position: absolute;
				top: 0;
				right: 0;
				height: 1.5625rem;
				line-height: 1.5625rem;
				font-size: 0.875rem;
				color: #2Eb257;
			}
		}
		.itemWrapper{
			white-space: nowrap;
			overflow-x: auto;
			overflow-y: hidden;
			-webkit-overflow-scrolling: touch;
			overflow-scrolling:touch;
		}
		.itemWrapper::-webkit-scrollbar{
			display: none;
		}
	}
</style>
