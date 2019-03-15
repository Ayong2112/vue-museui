<template>
	<div>
		<mu-container>
			<mu-form :model="timeZoneForm" class="mu-demo-form" label-position="right" label-width="110">
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


		</mu-container>
	</div>
</template>
<script>
	export default {
		created(){
			this.timeZoneForm.knownTimeZone = this.timeZoneData[8].value
			this.timeZoneForm.knownTimeZoneTime = new Date()
			this.timeZoneForm.matrixingTimeZone = this.timeZoneData[8].value
			this.getmatrixingTimeZoneTime()
		},
		data() {
			return {
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
		methods:{
			getmatrixingTimeZoneTime(){

							
				this.timeZoneForm.matrixingTimeZoneTime = new Date(new Date(this.timeZoneForm.knownTimeZoneTime).getTime() - ((this.timeZoneForm.knownTimeZone - this.timeZoneForm.matrixingTimeZone) *60 * 60 * 1000))
			}
		},
	};
</script>

<style>

</style>
