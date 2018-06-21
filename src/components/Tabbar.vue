<template>
	<div>
		<!--<mt-tabbar v-model="message" fixed >
			<mt-tab-item id="DayDream">
				<img slot="icon" :src="this.atabs[0]"> 
			</mt-tab-item>
			<mt-tab-item id="Time">
				<img slot="icon" :src="this.atabs[1]"> 
			</mt-tab-item>
			<mt-tab-item id="Note">
				<img slot="icon" :src="this.atabs[2]"> 
			</mt-tab-item>
			<mt-tab-item id="Me">
				<img slot="icon" :src="this.atabs[3]"> 
			</mt-tab-item>
		</mt-tabbar>-->
		
		
		
		<mu-container>
		  <mu-bottom-nav>
		    <mu-bottom-nav-item title="home" icon="favorite"></mu-bottom-nav-item>
		    <mu-bottom-nav-item title="Time" icon="favorite"></mu-bottom-nav-item>
		    <mu-bottom-nav-item title="Note" icon="location_on"></mu-bottom-nav-item>
		    <mu-bottom-nav-item title="Me" icon="location_on"></mu-bottom-nav-item>
		  </mu-bottom-nav>
		</mu-container>
	</div>
</template>
<style>
	@import 'http://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.css';
</style>
<!--<script>
	export default {
		data() {
			    return{
    //选中的tabbar值message为外面页面传入的值selected
      message:this.selected,
    //这里使用的icon图标为图片，所以需要加图片改变的传入，若使用阿里图标，则不用加
      atabs:this.tabs,
    }
		},
		  props:{
		    selected: String,
		    tabs:Array,
		  },
		watch: {
			message: function(val, oldVala) {
				switch(val) {
					case 'DayDream':
						this.$router.push('/dayDream');
						break;
					case 'Time':
						this.$router.push('/time');
						break;
					case 'Note':
						this.$router.push('/note');
						break;
					case 'Me':
						this.$router.push('/me');
						break;
				}

			}
		}
	}
</script>-->




