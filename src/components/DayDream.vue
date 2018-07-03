<template>
	<div>
		<v-header header='DayDream'></v-header>
		<mu-container>
			<mu-form ref="form" :model="form" class="mu-demo-form" :label-position="labelPosition" label-width="100">
				<mu-form-item label="起始数字：" help-text="" prop="startNum" :rules="startNumRules">
					<mu-text-field type="number" v-model="form.startNum" prop="startNum" min='0' onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"></mu-text-field>
				</mu-form-item>
				<mu-form-item label="结束数字：" prop="endNum" :rules="endNumRules">
					<mu-text-field type="number" v-model="form.endNum" prop="endNum" min='0' onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"></mu-text-field>
				</mu-form-item>
				<mu-form-item label="数字数目：" prop="totalNum" :rules="totalNumRules">
					<mu-text-field type="number" v-model="form.totalNum" prop="totalNum" min='1' onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"></mu-text-field>
				</mu-form-item>
				<mu-form-item prop="isSole" label="是否唯一：">
					<mu-radio v-model="form.isSole" value="否" label="否"></mu-radio>
					<mu-radio v-model="form.isSole" value="是" label="是"></mu-radio>
				</mu-form-item>

				<mu-form-item prop="isOrder" label="是否排序：">
					<mu-select v-model="form.isOrder">
						<mu-option v-for="option,index in orderOptions" :key="option" :label="option" :value="option"></mu-option>
					</mu-select>
				</mu-form-item>
				<mu-form-item prop="result" label="输出结果：">
					<mu-text-field multi-line :rows="1" :rows-max="6" v-model="result"></mu-text-field>
				</mu-form-item>
				<mu-form-item>
					<mu-button color="primary" @click="submit">确定</mu-button>
					<mu-button @click="clear">重置</mu-button>
				</mu-form-item>
			</mu-form>
			<mu-dialog title="提示" width="360" :open.sync="openSimple">
				您好，你输入的信息有误
				<mu-button slot="actions" flat color="primary" @click="closeSimpleDialog">我知道了</mu-button>
			</mu-dialog>

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
				orderOptions: ['否', '从小到大', '从大到小'],
				labelPosition: 'left',
				openSimple: false,
				result: '',
				form: {
					startNum: '',
					endNum: '',
					totalNum: '',
					isSole: '否',
					isOrder: '否',
				},
				startNumRules: [{
					validate: (val) => !!val,
					message: '必须输入起始数字'
				}],
				endNumRules: [{
					validate: (val) => !!val,
					message: '必须输入结束数字'
				}],
				totalNumRules: [{
						validate: (val) => !!val,
						message: '必须输入数字数目'
					},
					{
						validate: (val) => val <= Math.abs(this.form.startNum - this.form.endNum) + 1,
						message: '数目应小于或等于起始数字与结束数字的差'
					},
					{
						validate: (val) => val > 0,
						message: '数目至少为1'
					}
				],
			}
		},
		methods: {
			closeSimpleDialog() {
				this.openSimple = false;
			},
			submit() {
				this.$refs.form.validate().then((result) => {
					if(!result) {
						this.openSimple = true;
					} else {
						this.getRandomNum(this.form)
					}
				});
			},
			clear() {
				this.$refs.form.clear();
				this.result = '';
				this.form = {
					startNum: '',
					endNum: '',
					totalNum: '',
					isSole: '否',
					isOrder: '否',
				};
			},
			getRandomNum(data) {
				var stratNum = data.startNum
				var endNum = data.endNum
				var len = data.totalNum
				var isSole = data.isSole
				var isOrder = data.isOrder
				var arr = [];
				var randomArr = []; //randomArr存放生成的随机数组
				var tmp = "";
				if(Number(stratNum) > Number(endNum)) {
					tmp = stratNum
					stratNum = endNum
					endNum = tmp
				}
				for(var i = Number(stratNum); i <= Number(endNum); i++) {
					arr.push(i);
				}
				for(var j = 0; j < len; j++) {
					var num = Math.floor(Math.random() * arr.length) //生成随机数num
					randomArr.push(arr[num])
					if(isSole == '是') {
						arr.splice(num, 1);
					}
				}
				if(isOrder == '从小到大') {
					randomArr = randomArr.sort(this.addNum)
				} else if(isOrder == '从大到小') {
					randomArr = randomArr.sort(this.decNum)
				}
				randomArr = randomArr.join(' ')
				this.result = randomArr
			},
			//数组排序由小到大
			addNum(a, b) {
				return a - b;
			},
			//数组排序由大到小
			decNum(a, b) {
				return b - a;
			},
		}
	}
</script>
<style scoped>
	.mu-demo-form {
		width: 100%;
		max-width: 460px;
	}
	
	</style>