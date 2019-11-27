<template>
	<div id="category">
		<!-- 头部 -->
		<category-header></category-header>
		<!-- 内容 -->
		<div class="listWrapper" v-if="!showLoading">
			<!-- 左边 -->
			<div class="leftWrapper">
				<ul class="wrapper">
					<li
						class="categoryItem"
						@click="chooseItem(index)"
						ref="menuList"
						v-for="(cate, index) in categoriesData"
						:class="{ selected: currentIndex === index }"
						:key="cate.id"
					>
						<span class="textWrapper">{{ cate.name }}</span>
					</li>
				</ul>
			</div>
			<!-- 右边 -->
			<content-view :categoriesDetailData="categoriesDetailData"></content-view>
		</div>
		<template v-else>
			<van-loading type="spinner" color="#1989fa" style="position: absolute;top: 40%;left: 50%;transform: translate(-50%);">数据加载中...</van-loading>
		</template>
	</div>
</template>

<script>
//引入网络请求
import { getCategories, getCategoriesDetail } from '@/service/api/index.js';
import categoryHeader from './components/header/Header.vue';
import ContentView from './components/contentView/ContentView.vue';
import BScroll from 'better-scroll';
export default {
	name: 'category',
	components: {
		categoryHeader,
		ContentView
	},
	data() {
		return {
			showLoading: true,
			categoriesData: [],
			categoriesDetailData: [],
			currentIndex: 0
		};
	},
	created() {
		this.initData();
	},
	methods: {
		async initData() {
			//获取左边数据
			let leftRes = await getCategories();
			if (leftRes.data.success) {
				this.categoriesData = leftRes.data.data.cate;
				// console.log('左边数据', this.categoriesData);
			}
			//获取右边数据
			let rightRes = await getCategoriesDetail('/lk001');
			if (rightRes.data.success) {
				this.categoriesDetailData = rightRes.data.data.cate;
				// console.log('右边数据', this.categoriesDetailData);
			}
			//隐藏loading状态
			this.showLoading = false;
			//初始化滚动框架
			this.$nextTick(() => {
				this.leftScroll = new BScroll('.leftWrapper', {
					probeType: 3,
					click: true,
					scrollY: true,
					tap: true,
					mouseWheel: true
				});
			});
		},
		async chooseItem(index) {
			this.currentIndex = index;
			//滚动到对应位置
			let menuLists = this.$refs.menuList;
			let el = menuLists[index];
			// 2.3 滚动到对应元素上
			this.leftScroll.scrollToElement(el, 300);
			// 2.4 获取右边的数据
			let rightRes = await getCategoriesDetail(`/lk00${index + 1}`);
			if (rightRes.data.success) {
				this.categoriesDetailData =  rightRes.data.data.cate;
				console.log('右边数据', this.categoriesDetailData);
			}
		}
	}
};
</script>

<style lang="less" scoped>
#category {
	width: 100%;
	height: 100%;
	background-color: #f5f5f5;
	overflow: hidden;
	.listWrapper {
		display: flex;
		position: absolute;
		top: 3.125rem;
		bottom: 3.333333rem;
		width: 100%;
		overflow: hidden;
		.leftWrapper {
			background-color: #f4f4f4;
			width: 5.3125rem;
			flex: 0 0 5.3125rem;
			.categoryItem {
				padding: 0.75rem 0;
				border-bottom: solid 1px #e8e9e8;
				position: relative;
			}
		}
	}
}
.categoryItem .textWrapper {
	line-height: 1.25rem;
	border-left: solid 0.1875rem transparent;
	padding: 0.3125rem 0.6875rem;
	font-size: 0.8125rem;
	color: #666666;
}

.categoryItem.selected {
	background: #fff;
}

.categoryItem.selected .textWrapper {
	border-left-color: #3cb963;
	font-weight: bold;
	font-size: 0.875rem;
	color: #333333;
}

@media (min-width: 960px) {
	.wrapper {
		border-right: 1px solid #e8e9e8;
	}

	.wrapper .categoryItem {
		background: #fff;
	}
}
</style>
