<template>
	<div>
		<v-header header='Me'></v-header>

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
		data() {
			return {

			}
		},
		method: {
			timeElapse(date) {
				var current = Date();
				var seconds = (Date.parse(current) - Date.parse(date)) / 1000;
				var days = Math.floor(seconds / (3600 * 24));
				seconds = seconds % (3600 * 24);
				var hours = Math.floor(seconds / 3600);
				if(hours < 10) {
					hours = "0" + hours;
				}
				seconds = seconds % 3600;
				var minutes = Math.floor(seconds / 60);
				if(minutes < 10) {
					minutes = "0" + minutes;
				}
				seconds = seconds % 60;
				if(seconds < 10) {
					seconds = "0" + seconds;
				}
				var result = "<span class=\"digit\">" + days + "</span> 天 <span class=\"digit\">" + hours +
					"</span> 时 <span class=\"digit\">" + minutes + "</span> 分 <span class=\"digit\">" +
					seconds + "</span> 秒";
				$("#elapseClock").html(result);
			}
		}

	}
</script>