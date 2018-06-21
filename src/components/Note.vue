<template>
	<div>
	<v-header header='Note'></v-header>
		<bottom-navigation></bottom-navigation>
		
	</div>
</template>

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