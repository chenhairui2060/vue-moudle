<template>
	<div class="wrapper">
		<div class="itemWrapper">
			<div class="imgageWarpper"><img class="image" :src="product.small_image" /></div>
			<div>
				<div class="name">{{product.product_name}}</div>
				<div class="originPrice">{{product.origin_price|moneyFormat}}</div>
				<div class="priceWrapper">
					<div class="price">
						{{product.price|moneyFormat}}
					</div>
					<div class="iconCartWrapper">
						<img src="@/images/tabbar/carts-active.png" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'FlashSaleItem',
	props:{
		product:Object
	}
};
</script>

<style scoped lang="less">
.wrapper {
	display: inline-block;
	padding: 0 0.3125rem;
	margin: 0 0.5rem;
	white-space: normal;
	width: 28%;
}

.imgageWarpper {
	height: 0;
	padding-bottom: 100%;
	overflow: hidden;
	margin-bottom: 0.6525rem;
}
.image {
	width: 100%;
	height: auto;
	display: block;
}
.name {
	margin-bottom: 0.625rem;
	height: 2.5rem;
	line-height: 1.25rem;
	font-size: 0.8125rem;
	word-break: break-all;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	color: #333;
}
.originPrice {
	margin-bottom: 0.3125rem;
	font-size: 0.6875rem;
	color: #999;
	text-decoration: line-through;
}
.noticeSoldOut span {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50% -50%);
	display: inline-block;
	width: 60%;
	text-align: center;
	color: #ffffff;
	font-size: 0.75rem;
	line-height: 1.25rem;
	background: rgba(0, 0, 0, 0.4);
	border-radius: 1.25rem;
}
.priceWrapper {
	position: relative;
	color: red;
}
.price {
	height: 1.875rem;
	line-height: 1.875rem;
	font-size: 0.6875rem;
	color: #fe6263;
}
.iconCartWrapper {
	position: absolute;
	top: 0;
	right: 0;
	width: 1.875rem;
	img{
		height: 1.875rem;
		width: 1.875rem;
	}
}
</style>
