<template>
	<div class="header">
		<img src="@/images/position.png" class="iconLocation"/>
		<span class="address">请选择所在地区</span>
		<div class="search">
			<img src="@/images/search.png" class="search-icon"/>
		</div>
	</div>
</template>

<script>
</script>

<style lang="less" scoped>
	.header{
		height: 3.125rem;
		width: 100%;
		top: 0;
		z-index: 999;
		background-color: #ffffff;
		line-height: 3.125rem;
		box-sizing: border-box;
		border-bottom: 1px solid #eeeeee;
		border-top:1px solid #eeeeee;
		position: relative;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		.iconLocation{
			position: absolute;
			left: 0.3rem;
			top: 0.8rem;
			width: 1.2rem;
			height: 1.475rem;
			vertical-align: middle;
		}
		.address{
			color: #333;
			padding-left: 1.9rem;
			display: inline-block;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			width: 30%;
			font-size: 0.45rem;
		}
		.search{
			height: 2rem;
			width: 60%;
			background: #eeeeee;
			float: right;
			margin-top: 0.5625rem;
			margin-right: .6rem;
			border-radius: .3rem;
			position: relative;
			.search-icon{
				position: absolute;
				height:1.6rem;
				top: .2rem;
			}
		}
	}
	
</style>
