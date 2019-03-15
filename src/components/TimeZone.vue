<template>
	<div>
		<v-header header='TimeZone'></v-header>
		<mu-container>
			<mu-tabs :value.sync="timeZoonActive" text-color="rgba(0, 0, 0, .54)" inverse color="#2196f3"  indicator-color="#2196f3" full-width>
				<mu-tab>夏令时</mu-tab>
				<mu-tab>冬令时</mu-tab>
				<mu-tab>时区</mu-tab>
			</mu-tabs>
			<div class="demo-text" v-if="timeZoonActive === 0">
				<mu-form :model="daylightSavingTimeForm"  label-position="right" label-width="110">
					<mu-form-item prop="input" label="已知时区">
						<mu-select v-model="daylightSavingTimeForm.daylightSavingKnowntimeZone" @change="getDaylightSavingUnkowntime()">
							<mu-option v-for="item in daylightSavingTimeCityData" :key="item.timeRange" :label="item.city" :value="item.timeRange"></mu-option>
						</mu-select>
					</mu-form-item>
					<mu-form-item prop="select" label="已知时区时间:">
						<mu-date-input v-model="daylightSavingTimeForm.daylightSavingKnowntime" type="dateTime" actions clock-type="24hr" @input='getDaylightSavingUnkowntime()'
						 view-type="list"></mu-date-input>
					</mu-form-item>
					<mu-form-item prop="date" label="换算时区:">
						<mu-select v-model="daylightSavingTimeForm.daylightSavingUnknowntimeZone" @change="getDaylightSavingUnkowntime()">
							<mu-option v-for="item in daylightSavingTimeCityData" :key="item.city" :label="item.city" :value="item.timeRange"></mu-option>
						</mu-select>
					</mu-form-item>
					<mu-form-item prop="radio" label="换算时区时间:">
						<mu-date-input v-model="daylightSavingTimeForm.daylightSavingUnkowntime" type="dateTime"  disabled></mu-date-input>
					</mu-form-item>
				</mu-form>
			</div>
			<div class="demo-text" v-if="timeZoonActive === 1">
				<mu-form :model="standardTimeForm"  label-position="right" label-width="110">
					<mu-form-item prop="input" label="已知时区">
						<mu-select v-model="standardTimeForm.standardKnowntimeZone" @change="getstandardUnkowntime()">
							<mu-option v-for="item in standardTimeCityData" :key="item.timeRange" :label="item.city" :value="item.timeRange"></mu-option>
						</mu-select>
					</mu-form-item>
					<mu-form-item prop="select" label="已知时区时间:">
						<mu-date-input v-model="standardTimeForm.standardKnowntime" type="dateTime" actions clock-type="24hr" @input='getstandardUnkowntime()'
						 view-type="list"></mu-date-input>
					</mu-form-item>
					<mu-form-item prop="date" label="换算时区:">
						<mu-select v-model="standardTimeForm.standardUnknowntimeZone" @change="getstandardUnkowntime()">
							<mu-option v-for="item in standardTimeCityData" :key="item.city" :label="item.city" :value="item.timeRange"></mu-option>
						</mu-select>
					</mu-form-item>
					<mu-form-item prop="radio" label="换算时区时间:">
						<mu-date-input v-model="standardTimeForm.standardUnkowntime" type="dateTime"  disabled></mu-date-input>
					</mu-form-item>
				</mu-form>
			</div>
			<div class="demo-text" v-if="timeZoonActive === 2">
				<mu-form :model="timeZoneForm"  label-position="right" label-width="110">
					<mu-form-item prop="input" label="已知时区">
						<mu-select v-model="timeZoneForm.knownTimeZone" @change="getmatrixingTimeZoneTime()">
							<mu-option v-for="item in timeZoneData" :key="item.name" :label="item.name" :value="item.value"></mu-option>
						</mu-select>
					</mu-form-item>
					<mu-form-item prop="select" label="已知时区时间:">
						<mu-date-input v-model="timeZoneForm.knownTimeZoneTime" type="dateTime" actions clock-type="24hr" @input='getmatrixingTimeZoneTime()'
						 view-type="list"></mu-date-input>
					</mu-form-item>
					<mu-form-item prop="date" label="换算时区:">
						<mu-select v-model="timeZoneForm.matrixingTimeZone" @change="getmatrixingTimeZoneTime()">
							<mu-option v-for="item in timeZoneData" :key="item.city" :label="item.name" :value="item.value"></mu-option>
						</mu-select>
					</mu-form-item>
					<mu-form-item prop="radio" label="换算时区时间:">
						<mu-date-input v-model="timeZoneForm.matrixingTimeZoneTime" type="dateTime"  disabled></mu-date-input>
					</mu-form-item>
				</mu-form>
			</div>
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
				timeZoonActive:0,
				// 夏令时
				daylightSavingTimeForm: {
					daylightSavingKnowntimeZone: '',
					daylightSavingKnowntime: '',
					daylightSavingUnknowntimeZone: '',
					daylightSavingUnkowntime: '',
				},
				daylightSavingTimeCityData: [{
					city:'北京',
					timeRange:0
				}, {
					city: '纽约、华盛顿--东部时区(12)',
					timeRange: 12
				}, {
					city: '芝加哥--中部时区(13)',
					timeRange: 13
				}, {
					city: '盐湖城--山地时区(14)',
					timeRange: 14
				}, {
					city: '洛杉矶--太平洋时区(15)',
					timeRange: 15
				}, {
					city: '费尔班克斯--阿拉斯加时区(16)',
					timeRange: 16
				}, {
					city: '火奴鲁鲁--夏威夷时区(17)',
					timeRange: 17
				}],
				// 冬令时
				standardTimeForm: {
					standardKnowntimeZone: '',
					standardKnowntime: '',
					standardUnknowntimeZone: '',
					standardUnkowntime: '',
				},
				standardTimeCityData: [{
					city:'北京',
					timeRange:0
				}, {
					city: '纽约、华盛顿--东部时区(13)',
					timeRange: 13
				}, {
					city: '芝加哥--中部时区(14)',
					timeRange: 14
				}, {
					city: '盐湖城--山地时区(15)',
					timeRange: 15
				}, {
					city: '洛杉矶--太平洋时区(16)',
					timeRange: 16
				}, {
					city: '费尔班克斯--阿拉斯加时区(17)',
					timeRange: 17
				}, {
					city: '火奴鲁鲁--夏威夷时区(18)',
					timeRange: 18
				}],
				// 时区
				timeZoneForm: {
					knownTimeZone: '',
					knownTimeZoneTime: '',
					matrixingTimeZone: '', //换算时区
					matrixingTimeZoneTime: '', //换算时区时间
				},
				timeZoneData: [{
					name: '零时区(中时区)',
					value: 0
				}, {
					name: '东一区',
					value: 1
				}, {
					name: '东二区',
					value: 2
				}, {
					name: '东三区',
					value: 3
				}, {
					name: '东四区',
					value: 4
				}, {
					name: '东五区',
					value: 5
				}, {
					name: '东六区',
					value: 6
				}, {
					name: '东七区',
					value: 7
				}, {
					name: '东八区',
					value: 8
				}, {
					name: '东九区',
					value: 9
				}, {
					name: '东十区',
					value: 10
				}, {
					name: '东十一区',
					value: 11
				}, {
					name: '东西十二区',
					value: 12
				}, {
					name: '西一区',
					value: -1
				}, {
					name: '西二区',
					value: -2
				}, {
					name: '西三区',
					value: -3
				}, {
					name: '西四区',
					value: -4
				}, {
					name: '西五区',
					value: -5
				}, {
					name: '西六区',
					value: -6
				}, {
					name: '西七区',
					value: -7
				}, {
					name: '西八区',
					value: -8
				}, {
					name: '西九区',
					value: -9
				}, {
					name: '西十区',
					value: -10
				}, {
					name: '西十一区',
					value: -11
				}],
			}
		},
		// html渲染前
		created() {
			// 夏令时
			this.daylightSavingTimeForm.daylightSavingKnowntimeZone = this.daylightSavingTimeCityData[0].timeRange
			this.daylightSavingTimeForm.daylightSavingKnowntime = new Date()
			this.daylightSavingTimeForm.daylightSavingUnknowntimeZone = this.daylightSavingTimeCityData[4].timeRange
			this.getDaylightSavingUnkowntime()
			// 冬令时
			this.standardTimeForm.standardKnowntimeZone = this.standardTimeCityData[0].timeRange
			this.standardTimeForm.standardKnowntime = new Date()
			this.standardTimeForm.standardUnknowntimeZone = this.standardTimeCityData[4].timeRange
			this.getstandardUnkowntime()
			// 时区
			this.timeZoneForm.knownTimeZone = this.timeZoneData[8].value
			this.timeZoneForm.knownTimeZoneTime = new Date()
			this.timeZoneForm.matrixingTimeZone = this.timeZoneData[8].value
			this.getmatrixingTimeZoneTime()
		},
		methods: {
			// 夏令时
			getDaylightSavingUnkowntime(){
				this.daylightSavingTimeForm.daylightSavingUnkowntime = new Date(new Date(this.daylightSavingTimeForm.daylightSavingKnowntime).getTime() - (this.daylightSavingTimeForm.daylightSavingUnknowntimeZone - this.daylightSavingTimeForm.daylightSavingKnowntimeZone)*1000*60*60)
			},
			// 冬令时
			getstandardUnkowntime(){
				this.standardTimeForm.standardUnkowntime = new Date(new Date(this.standardTimeForm.standardKnowntime).getTime() - (this.standardTimeForm.standardUnknowntimeZone - this.standardTimeForm.standardKnowntimeZone)*1000*60*60)
			},
			// 时区
			getmatrixingTimeZoneTime(){			
				this.timeZoneForm.matrixingTimeZoneTime = new Date(new Date(this.timeZoneForm.knownTimeZoneTime).getTime() - ((this.timeZoneForm.knownTimeZone - this.timeZoneForm.matrixingTimeZone) *60 * 60 * 1000))
			}
		}
	}
</script>
