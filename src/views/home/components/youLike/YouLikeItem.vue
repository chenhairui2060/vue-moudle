<template>
	<div class="wrapper">
		<div class="content">
			<div class="imgageWarpper">
				<van-image class="image" :src="product.small_image">
					<template v-slot:loading>
						<van-loading type="spinner" size="20">加载中...</van-loading>
					</template>
				</van-image>
			</div>
			<div class="infoWrapper">
				<div class="name"><span class="nameText">{{product.product_name}}</span></div>
				<div class="tagsWrapper"><div class="H1B9Rvu"></div></div>
				<div class="priceWrapper">
					<div class="priceInfo">
						<div class="pricePart">
							<div class="price">{{product.origin_price|moneyFormat}}</div>
							<div class="originPrice">{{product.price|moneyFormat}}</div>
						</div>
					</div>
					<div class="iconCartWrapper"><img @click="AddGoods(product)" class="iconCart" src="@/images/tabbar/carts-active.png" /></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// vue工程利用pubsub-js实现兄弟组件之间的通信
import PubSub from 'pubsub-js';
export default {
	name: 'YouLikeItem',
	props:{
		product:Object
	},
	methods:{
		AddGoods(product){
			// console.log('添加商品')
			PubSub.publish('homeAddToCart', product)
		}
	}
};
</script>

<style scoped lang="less">
.wrapper {
	position: relative;
	display: inline-block;
	width: 50%;
	padding: 0.3125rem;
	vertical-align: top;
	.content {
		background: #ffffff;
		border-radius: 0.3125rem;
		overflow: hidden;
		.imgageWarpper {
			position: relative;
			height: 0;
			padding-bottom: 100%;
			overflow: hidden;
			border-radius: 0.3125rem;
			.lazyLoad {
				padding: 0.625rem;
			}
			.is-visible {
			}
			.van-loading{
				position: absolute;
				top: 5rem;
				left: 50%;
				transform: translate(-50%);
			}
			.image {
				width: 100%;
				height: auto;
				display: block;
				border-radius: 0.1875rem;
			}
		}
		.infoWrapper {
			padding: 0 0.6125rem 0.6125rem 0.6125rem;
			.name {
				height: 2.5rem;
				line-height: 1.25rem;
				font-size: 0.875rem;
				color: #333333;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				.nameText {
					vertical-align: middle;
				}
			}
			.tagsWrapper {
				margin: 0.125rem 0;
				height: 1.0625rem;
				line-height: 0.8125rem;
				overflow: hidden;
				.H1B9Rvu {
					height: 1rem;
				}
			}
			.priceWrapper {
				display: table;
				height: 2.5rem;
				width: 100%;
				.priceInfo {
					height: 100%;
					display: table-cell;
					vertical-align: middle;
					.pricePart {
						height: 1.25rem;
						position: relative;
						.price {
							display: inline-block;
							height: 1.25rem;
							line-height: 1.25rem;
							font-weight: bold;
							font-size: 0.75rem;
							color: #ee6263;
						}
						.originPrice {
							display: inline-block;
							vertical-align: bottom;
							margin-left: 0.3125rem;
							height: 1.25rem;
							line-height: 1.25rem;
							text-decoration: line-through;
							font-size: 0.6875rem;
							color: #b2b2b2;
							top: 0.15625rem;
						}
					}
				}
				.iconCartWrapper {
					position: relative;
					display: table-cell;
					vertical-align: middle;
					.iconCart {
						position: absolute;
						right: 0;
						top: 50%;
						margin-top: -0.9375rem;
						display: block;
						width: 1.875rem;
						width: 1.875rem;
					}
				}
			}
		}
	}
}
</style>
