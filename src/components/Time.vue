<template>
	<div>
		<v-header header='Time'></v-header>
		<mu-container>
			<mu-tabs :value.sync="timeZoonActive" color="green" indicator-color="yellow" full-width>
				<mu-tab>北京时区换算</mu-tab>
				<mu-tab>时区换算</mu-tab>
				<mu-tab>计时时间</mu-tab>
			</mu-tabs>
			<div class="demo-text" v-if="timeZoonActive === 0">
				<mu-row align-items='baseline'>
					<mu-col>
						<div class="redTip">只有更改换算地区时间才会修改北京的时间</div>
					</mu-col>
				</mu-row>
				<mu-row align-items='baseline'>
					<mu-col span="3">
						<div>固定地址:</div>
					</mu-col>
					<mu-col span="7">
						<mu-text-field v-model="beijing" disabled></mu-text-field>
					</mu-col>
				</mu-row>
				<mu-row align-items='baseline'>
					<mu-col span="3">
						<div>北京时间:</div>
					</mu-col>
					<mu-col span="7">
						<mu-date-input v-model="bjDate" type="dateTime" actions clock-type="24hr" @input="changeBjDate()" :view-type="viewType"></mu-date-input>
					</mu-col>
				</mu-row>
				<mu-row align-items='baseline'>
					<mu-col span="3">
						<div>换算地区:</div>
					</mu-col>
					<mu-col span="7">
						<mu-select v-model="citySelect" @change='changeCity()'>
							<mu-option v-for="otherCity,item in otherCity" :key="item.index" :label="otherCity.city" :value="otherCity.timeRange"></mu-option>
						</mu-select>
					</mu-col>
				</mu-row>
				<mu-row align-items='baseline'>
					<mu-col span="3">
						<div>换算地区时间:</div>
					</mu-col>
					<mu-col span="7">
						<mu-date-input v-model="otherCityDate" type="dateTime" actions clock-type="24hr" @input="changeOtherDate()"
						 :view-type="viewType"></mu-date-input>
					</mu-col>
				</mu-row>
				<mu-row align-items='baseline'>
					<mu-col span="3">
						<div>时间显示模式:</div>
					</mu-col>
					<mu-col span="7">
						<mu-radio class="demo-picker-form" v-model="viewType" value="clock" label="clock"></mu-radio>
						<mu-radio class="demo-picker-form" v-model="viewType" value="list" label="list"></mu-radio>
					</mu-col>
				</mu-row>
			</div>
			<div class="demo-text" v-if="timeZoonActive === 1">
				<mu-row align-items='baseline'>
					<mu-col>
						<div class="redTip">与东西12时区的计算可能存在错误以及没有夏令时冬令时的计算,请核实</div>
					</mu-col>
				</mu-row>
				<mu-row align-items='baseline'>
					<mu-col span="3">
						<div>已知时区:</div>
					</mu-col>
					<mu-col span="7">
						<mu-select v-model="knownTimeZoon" @change='changeTimeZoon()'>
							<mu-option v-for="item,index in timeZoonData" :key='index' :label="item.name" :value="item.value"></mu-option>
						</mu-select>
					</mu-col>
				</mu-row>
				<mu-row align-items='baseline'>
					<mu-col span="3">
						<div>已知时区时间:</div>
					</mu-col>
					<mu-col span="7">
						<mu-date-input v-model="knownTimeZoonTime" type="dateTime" actions clock-type="24hr" :view-type="viewType" @input="changeTimeZoon()"></mu-date-input>
					</mu-col>
				</mu-row>
				<mu-row align-items='baseline'>
					<mu-col span="3">
						<div>换算时区:</div>
					</mu-col>
					<mu-col span="7">
						<mu-select v-model="matrixingTimeZoon" @change='changeTimeZoon()'>
							<mu-option v-for="item,index in timeZoonData" :key='index' :label="item.name" :value="item.value"></mu-option>
						</mu-select>
					</mu-col>
				</mu-row>
				<mu-row align-items='baseline'>
					<mu-col span="3">
						<div>换算时区时间:</div>
					</mu-col>
					<mu-col span="7">
						<mu-date-input v-model="matrixingTimeZoonTime" type="dateTime" clock-type="24hr" disabled></mu-date-input>
					</mu-col>
				</mu-row>
			</div>
			<div class="demo-text" v-if="timeZoonActive === 2">
				<div class="bodywrap">
					<mu-row align-items='baseline'>
						<mu-col>
							<div class="redTip">点击时钟可选择显示/隐藏选择时间模块</div>
						</mu-col>
					</mu-row>
					<div v-if='isShowChooseTime==0'>
						<mu-date-input v-model="timeTime" type="dateTime" actions clock-type="24hr" :view-type="viewType" @input="changeTimeTime()">
							<mu-button color="primary" @click="changeOriginalDate()">ING</mu-button>
							<mu-button color="primary" @click="changeNowDate()">NOW</mu-button>
						</mu-date-input>
						
					</div>

					<div class='timewrap' @click="hideInputDate()">
						<div class='nowDate'>{{nowDate}}</div>
						<div class='nowTime'>{{nowTime}}</div>
						<div class="timing" v-html='timing'></div>
					</div>
					<bottom-navigation></bottom-navigation>
				</div>
			</div>

		</mu-container>
		<bottom-navigation></bottom-navigation>
	</div>
</template>
<style scoped="scoped">
	.redTip {
		color: red
	}
	.bodywrap .mu-input{
		width:90%
	}

	/* 时钟 */
	.bodywrap {}

	.timewrap {
		/* width: 100%; */
		background: #0f3854;
		background: -webkit-radial-gradient(center ellipse, #0a2e38 0%, #000000 70%);
		background: radial-gradient(ellipse at center, #0a2e38 0%, #000000 70%);
		background-size: 100%;
		font-family: 'Share Tech Mono', monospace;
		color: #ffffff;
		text-align: center;
		/* -webkit-transform: translate(-50%, -50%); */
		/* transform: translate(-50%, -50%); */
		color: #daf6ff;
		text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0);
		border-radius: 5%;
	}

	.nowDate {
		letter-spacing: 0.1em;
		font-size: 0.5rem;
	}

	.nowTime {
		letter-spacing: 0.05em;
		font-size: 1.4rem;
		padding: 5px 0;
	}
</style>
<style>
	.timing .digit {
		font-family: "digit";
		font-size: 0.8rem;
		color: #F63756
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

		data() {
			return {
				otherCity: [{
					city: '洛杉矶--太平洋时区(16)',
					timeRange: 16
				}, {
					city: '盐湖城--山地时区(15)',
					timeRange: 15
				}, {
					city: '芝加哥--中部时区(14)',
					timeRange: 14
				}, {
					city: '纽约、华盛顿--东部时区(13)',
					timeRange: 13
				}, {
					city: '火奴鲁鲁--夏威夷时区(18)',
					timeRange: 18
				}, {
					city: '费尔班克斯--阿拉斯加时区(17)',
					timeRange: 17
				}],
				beijing: '北京',
				bjDate: "",
				citySelect: '洛杉矶--太平洋时区(16)',
				otherCityDate: "",
				timeZoonActive: 0, //切换tab
				/*第二页时区data*/
				timeZoonData: [{
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
				knownTimeZoon: '',
				knownTimeZoonTime: '',
				matrixingTimeZoon: '', //换算时区
				matrixingTimeZoonTime: '', //换算时区时间
				viewType: 'clock',
				/* 时钟 */
				timer: null,
				timing: null,
				timeTime: '',
				isShowChooseTime: '0',
				nowDate: '',
				nowTime: '',
			}
		},
		// html渲染前
		created() {
			// 显示当前北京时间
			this.bjDate = new Date()
			// 换算出洛杉矶的时间
			let timerange = 16 * 60 * 60 * 1000
			let curDate = new Date().getTime()
			var result = curDate - timerange;
			this.otherCityDate = new Date(result)
			// 东西时区换算
			this.knownTimeZoon = this.timeZoonData[8].value
			this.knownTimeZoonTime = new Date()
			this.matrixingTimeZoon = this.timeZoonData[8].value
			this.changeTimeZoon()
			// 时钟
			this.timer = null;
			clearInterval(this.timer)
			let historyTime = localStorage.getItem('historyTime')
			if (historyTime) {
				this.timeTime = historyTime
				this.setTimer()
			} else {
				this.timeTime = new Date('2014-02-14 00:00:00')
				this.setTimer()
			}
			let isShowChooseTime = localStorage.getItem('isShowChooseTime')
			if (isShowChooseTime) {
				this.isShowChooseTime = isShowChooseTime
				console.log(this.isShowChooseTime)
			}
			this.getNowTime()
		},
		distroyed() {
			this.timer = null;
			clearInterval(this.timer)
		},
		methods: {
			// 修改北京时间更改其他地区的时间
			changeBjDate() {
				if (this.citySelect == "洛杉矶--太平洋时区(16)") {
					this.otherCityDate = new Date(new Date(this.bjDate).getTime() - (16 * 60 * 60 * 1000))
				} else {

					this.otherCityDate = new Date(new Date(this.bjDate).getTime() - (+this.citySelect * 60 * 60 * 1000))
				}
			},
			// 修改其他地区时间修改北京的时间
			changeOtherDate() {
				if (this.citySelect == "洛杉矶--太平洋时区(16)") {
					this.bjDate = new Date(new Date(this.otherCityDate).getTime() + (16 * 60 * 60 * 1000))
				} else {
					this.bjDate = new Date(new Date(this.otherCityDate).getTime() + (+this.citySelect * 60 * 60 * 1000))
				}
			},
			// 修改城市更改这个城市的时间
			changeCity() {
				if (this.citySelect == "洛杉矶--太平洋时区") {
					this.otherCityDate = new Date(new Date(this.bjDate).getTime() - (16 * 60 * 60 * 1000))
				} else {
					this.otherCityDate = new Date(new Date(this.bjDate).getTime() - (+this.citySelect * 60 * 60 * 1000))
				}
			},
			// 修改已知时区/已知时区时间/换算时区 都会修改换算时区的时间
			changeTimeZoon() {
				this.matrixingTimeZoonTime = new Date(new Date(this.knownTimeZoonTime).getTime() - ((this.knownTimeZoon - this.matrixingTimeZoon) *
					60 * 60 * 1000))
			},
			// 时钟
			// 计时器
			setTimer() {
				this.timer = setInterval(() => {
					this.getNowTime()
					this.Timing()
				}, 1000)
			},
			// 计算时间
			Timing() {
				var startTime = new Date(this.timeTime).getTime()
				var endTime = new Date().getTime();
				var timeRange = Math.abs(endTime - startTime);
				var d, h, m, s, ms;
				d = Math.floor(timeRange / 1000 / 60 / 60 / 24);
				h = Math.floor(timeRange / 1000 / 60 / 60 % 24);
				m = Math.floor(timeRange / 1000 / 60 % 60);
				s = Math.floor(timeRange / 1000 % 60);
				ms = Math.floor(timeRange % 1000);
				h = h < 10 ? "0" + h : h;
				m = m < 10 ? "0" + m : m;
				s = s < 10 ? "0" + s : s;
				ms = ms < 100 && ms > 9 ? "0" + ms : ms < 9 ? "00" + ms : ms;
				let format = "<span class=\"digit\">" + d + "</span> 天 <span class=\"digit\">" + h +
					"</span> 时 <span class=\"digit\">" + m + "</span> 分 <span class=\"digit\">" +
					s + "</span> 秒 ";
				this.timing = format
			},
			getNowTime() {
				var now = new Date(),
					YY = now.getFullYear(),
					MM = this.double(now.getMonth()),
					DD = this.double(now.getDate()),
					HH = this.double(now.getHours()),
					mm = this.double(now.getMinutes()),
					SS = this.double(now.getSeconds()),
					day = now.getDay();
				switch (day) {
					case 1:
						day = '星期一';
						break;
					case 2:
						day = '星期二';
						break;
					case 3:
						day = '星期三';
						break;
					case 4:
						day = '星期四';
						break;
					case 5:
						day = '星期五';
						break;
					case 6:
						day = '星期六';
						break;
					case 0:
						day = '星期日';
						break;
				}
				this.nowDate = YY + '年' + MM + '月' + DD + '日' + "  " + day
				this.nowTime = HH + ':' + mm + ':' + SS
			},
			double(num) {
				if (Number(num) < 10) {
					num = "0" + num
				}
				return num
			},
			// 选择时间后开始定时
			changeTimeTime() {
				localStorage.setItem('historyTime', this.timeTime)
				this.setTimer()
			},
			// 隐藏时间选择
			hideInputDate() {
				this.isShowChooseTime = this.isShowChooseTime == '0' ? '1' : this.isShowChooseTime == '1' ? '0' : '0'
				localStorage.setItem('isShowChooseTime', this.isShowChooseTime)
			},
			changeOriginalDate() {
				this.timeTime = new Date('2014-02-14 00:00:00')
				localStorage.setItem('historyTime', this.timeTime)
				this.setTimer()
			},
			changeNowDate() {
				this.timeTime = new Date()
				localStorage.setItem('historyTime', this.timeTime)
				this.setTimer()
			}


		}
	}
</script>
