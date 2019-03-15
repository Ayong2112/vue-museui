<template>
	<div>
		<v-header header='Note'></v-header>
		<mu-container>
			<div class="bodywrap">
				<div v-if='isShowChooseTime==0'>
					<mu-date-input v-model="timeTime" type="dateTime" actions clock-type="24hr" :view-type="viewType" @input="changeTimeTime()">
						<mu-button color="primary" @click="changeOriginalDate()">纪念日</mu-button>
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


		</mu-container>
		<bottom-navigation></bottom-navigation>
	</div>
</template>
<style scoped="scoped">
	.redTip {
		color: red
	}

	.bodywrap .mu-input {
		width: 90%
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
