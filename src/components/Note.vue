<template>
	<div>
		<v-header header='Note'></v-header>
		<mu-container>
			<mu-form :model="form" class="mu-demo-form" :label-position="labelPosition" label-width="100">
				<mu-form-item prop="beijing" label="固定地址:" >
					<mu-text-field v-model="form.beijing" disabled></mu-text-field>
				</mu-form-item>
				<mu-form-item prop="bjDate" label="北京时间:" >
					<mu-date-input v-model="form.bjDate" type="dateTime" actions clock-type="24hr" @change=handleotherTime()></mu-date-input>
				</mu-form-item>
				<mu-form-item prop="citySelect" label="其他国家:" >
					<mu-select v-model="form.citySelect" @change=handleCity()>
						<mu-option v-for="otherCity,item in otherCity" :key="item.index" :label="otherCity.city" :value="otherCity.timeRange"></mu-option>
					</mu-select>
				</mu-form-item>
				<mu-form-item prop="otherCityDate" label="其他国家时间:" label-width="110" >
					<mu-date-input v-model="form.otherCityDate" type="dateTime" actions clock-type="24hr"></mu-date-input>
				</mu-form-item>
			</mu-form>
		</mu-container>

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
				otherCity: [{
					city: '洛杉矶--太平洋时区',
					timeRange: 16
				}, {
					city: '盐湖城--山地时区',
					timeRange: 15
				}, {
					city: '芝加哥--中部时区',
					timeRange: 14
				}, {
					city: '纽约、华盛顿--东部时区',
					timeRange: 13
				}, {
					city: '火奴鲁鲁--夏威夷时区',
					timeRange: 18
				}, {
					city: '费尔班克斯--阿拉斯加时区',
					timeRange: 17
				}],
				labelPosition: 'left',
				form: {
					beijing: '北京',
					bjDate:"",
					citySelect:'洛杉矶--太平洋时区',
					otherCityDate:"",
				}
			}
		},
			// html渲染前
				created() {
					// 显示当前北京时间
					this.form.bjDate = new Date()
					// 换算出洛杉矶的时间
					let timerange = 16 * 60 * 60 * 1000
					let curDate = new Date().getTime()
					var result = curDate - timerange;
					this.form.otherCityDate = new Date(result)
				},
		methods: {
			handleCity() {
				console.log(this.form.citySelect)//打印的时间
			},
			handleotherTime(){
				console.log(this.form.bjDate)
			}
		}
	}
</script>
