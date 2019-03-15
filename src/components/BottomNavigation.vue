<template xmlns:v-bind="">
	<mu-container>
		<mu-bottom-nav :value="bottomNav">
			<mu-bottom-nav-item value='/dayDream' title="DayDream" icon="home" to="/dayDream" />
			<mu-bottom-nav-item value='/timeZone' title="TimeZone" icon="access_time" to="/timeZone" />
			<mu-bottom-nav-item value='/note' title="Note" icon="book" to="/note" />
			<mu-bottom-nav-item value='/me' title="Me" icon="face" to="/me" />
		</mu-bottom-nav>
	</mu-container>

</template>
<script type="text/javascript">
	export default {
		data() {
			return {
				bottomNav:''
			}
		},
		created: function() {
			if(this.$route.path=='/'){
				this.bottomNav='/dayDream'
			}else{
				this.bottomNav = this.$route.path;
			}
			
		}
	}
</script>
<style scoped>
	@import 'http://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.css';
	.mu-bottom-item{
		color:#757575;
	}
	.mu-bottom-nav-shift-wrapper .mu-bottom-item-active{
		color:#2196f3
	}
	.container{
		position: fixed;
		width: 100%;
		bottom: 0;
		left: 0;
		right: 0;
	}
</style>