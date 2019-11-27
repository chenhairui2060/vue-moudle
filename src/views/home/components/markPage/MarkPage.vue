<template>
	<div class="markPage" @click="scrollToTop"><img class="markPage-icon" src="@/images/backTop.png" /></div>
</template>

<script>
export default{
	name:"markPage",
	methods:{
		scrollToTop(){
			this.$emit('scrollToTop')
		}
	}
}
</script>

<style scoped lang="less">
.markPage {
	height: 2.67rem;
	width: 2.67rem;
	position: fixed;
	bottom: 6.8rem;
	right: 0.67rem;
	.markPage-icon {
		height: 2.67rem;
		width: 2.67rem;
	}
}
</style>
