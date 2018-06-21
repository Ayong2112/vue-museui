<template>
	<div>
		<bottom-navigation></bottom-navigation>
		<v-header header='Time'></v-header>
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