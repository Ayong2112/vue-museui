<template>
	<div>
		<v-header header='Note'></v-header>
		<mu-container>
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
					<mu-date-input v-model="bjDate" type="dateTime" actions clock-type="24hr" @change="handleOldBjDate()"></mu-date-input>
				</mu-col>
			</mu-row>
			<mu-row align-items='baseline'>
				<mu-col span="3">
					<div>换算地区:</div>
				</mu-col>
				<mu-col span="7">
					<mu-select v-model="citySelect" @change='handleChangeCity()'>
						<mu-option v-for="otherCity,item in otherCity" :key="item.index" :label="otherCity.city" :value="otherCity.timeRange"></mu-option>
					</mu-select>
				</mu-col>
			</mu-row>
			<mu-row align-items='baseline'>
				<mu-col span="3">
					<div>换算地区时间:</div>
				</mu-col>
				<mu-col span="7">
					<mu-date-input v-model="otherCityDate" type="dateTime" actions clock-type="24hr" @change="hangleOldOtheDate()"></mu-date-input>
				</mu-col>
			</mu-row>
			<mu-row align-items='baseline'>
				<mu-col>
					<div>只有更改换算地区时间才会修改北京的时间</div>
				</mu-col>
			</mu-row>



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
				beijing: '北京',
				bjDate: "",
				citySelect: '洛杉矶--太平洋时区',
				otherCityDate: "",
				oldBjDate: "",
				oldOtherCityDate: ''
			}
		},
		watch: {
			bjDate: function() {
				this.handleChangeDate("1")
			},
			otherCityDate: function() {
				this.handleChangeDate("2")
			}
		},
		// html渲染前
		created() {
			// 显示当前北京时间
			this.bjDate = new Date()
			this.oldBjDate = new Date()
			// 换算出洛杉矶的时间
			let timerange = 16 * 60 * 60 * 1000
			let curDate = new Date().getTime()
			var result = curDate - timerange;
			this.otherCityDate = new Date(result)
			this.oldOtherCityDate = new Date(result)
		},
		methods: {

			handleOldBjDate() {
				this.oldBjDate = this.bjDate
			},
			hangleOldOtheDate() {
				this.oldOtherCityDate = this.otherCityDate
			},
			handleChangeCity() {
				if (this.citySelect == "洛杉矶--太平洋时区") {
					this.otherCityDate = new Date(new Date(this.bjDate) - (16 * 60 * 60 * 1000))
				} else {
					this.otherCityDate = new Date(new Date(this.bjDate) - (+this.citySelect * 60 * 60 * 1000))
				}
			},
			handleChangeDate(value) {
				let tt = {
					nj: this.bjDate,
					oj: this.oldBjDate,
					no: this.otherCityDate,
					oo: this.oldOtherCityDate,
					njt: new Date(this.bjDate).getTime(),
					ojt: new Date(this.oldBjDate).getTime(),
					not: new Date(this.otherCityDate).getTime(),
					oot: new Date(this.oldOtherCityDate).getTime(),
				}

				console.log(value)
				if (value == "1") {
					if (tt.njt == tt.ojt) {
						debugger
					} else {
						debugger
						if (this.citySelect == "洛杉矶--太平洋时区") {
							this.otherCityDate = new Date(new Date(this.bjDate) - (16 * 60 * 60 * 1000))
						} else {
							this.otherCityDate = new Date(new Date(this.bjDate) - (+this.citySelect * 60 * 60 * 1000))
						}
					}

				} else if (value == "2") {
					if (tt.not == tt.oot) {
						debugger
					} else {
						debugger
						if (this.citySelect == "洛杉矶--太平洋时区") {
							this.bjDate = new Date(new Date(this.otherCityDate) + (16 * 60 * 60 * 1000))
						} else {
							this.bjDate = new Date(new Date(this.otherCityDate) + (+this.citySelect * 60 * 60 * 1000))
						}
					}

				}
			}
		}
	}
</script>
