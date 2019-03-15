<template>
	<div>
		<v-header header='Me'></v-header>
		<img src="../assets/img/fat.jpeg" alt="">
		<bottom-navigation></bottom-navigation>
	</div>
</template>
<style scoped="scoped">
	img {
		width: 90%;
	}
</style>

<script>
	import bottomNavigation from './BottomNavigation.vue';
	import vHeader from './Header.vue';
	export default {
		components: {
			bottomNavigation,
			vHeader
		},
	}
</script>
