<template>
	<div>
		<mt-tabbar v-model="selected">
			<mt-tab-item id="DayDream">
				<img slot="icon" src="../assets/logo.png"> DayDream
			</mt-tab-item>
			<mt-tab-item id="Time">
				<img slot="icon" src="../assets/logo.png"> Time
			</mt-tab-item>
			<mt-tab-item id="timeZone">
				<img slot="icon" src="../assets/logo.png"> TimeZone
			</mt-tab-item>
			<mt-tab-item id="Me">
				<img slot="icon" src="../assets/logo.png"> Me
			</mt-tab-item>
		</mt-tabbar>
	</div>
</template>
<script>
	export default {
 		data(){
 			return{
 				selected:'DayDream'
 			}
 		}
	};
</script>

<style>

</style>