<template>
	<div class="header">
		<div class="search">
			<img src="@/images/search.png" class="search-icon" />
			<span class="search-text">请输入搜索内容</span>
		</div>
	</div>
</template>

<script></script>

<style lang="less" scoped>
.header {
	height: 3.125rem;
	width: 100%;
	top: 0;
	z-index: 999;
	background-color: #ffffff;
	line-height: 3.125rem;
	box-sizing: border-box;
	border-bottom: 1px solid #eeeeee;
	border-top: 1px solid #eeeeee;
	position: relative;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	.search {
		height: 2rem;
		width: 86%;
		background: #eeeeee;
		margin: 0 auto;
		margin-top: 0.5625rem;
		border-radius: 0.3rem;
		line-height: 2rem;
		position: relative;
		.search-icon {
			position: absolute;
			height: 1.6rem;
			top: 0.2rem;
		}
		.search-text {
			position: absolute;
			left: 2.07rem;
			font-size: 0.75rem;
			color: #999;
		}
	}
}
</style>
