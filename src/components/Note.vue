<template>
	<div>
		<v-header header='Note'></v-header>
		<mu-container>
			<mu-form ref="form" :model="form" class="mu-demo-form" :label-position="labelPosition" label-width="100">
				<mu-form-item label="年月日：" prop="endNum" :rules="endNumRules">
					<mu-date-input v-model="value1" label="选择日期" label-float full-width></mu-date-input>
				</mu-form-item>
				<mu-form-item label="时间：" prop="totalNum" :rules="totalNumRules">
					<mu-date-input  icon="today" landscape v-model="value8" label="选择时间" type="time" label-float full-width></mu-date-input>
				</mu-form-item>
				<mu-form-item prop="isOrder" label="现在的时区：">
					<mu-select v-model="form.isOrder">
						<mu-option v-for="option,index in orderOptions" :key="option" :label="option" :value="option"></mu-option>
					</mu-select>
				</mu-form-item>
				<mu-form-item prop="isSole" label="需要转的时区：">
					<mu-select v-model="form.isSole">
						<mu-option v-for="option,index in orderOptions" :key="option" :label="option" :value="option"></mu-option>
					</mu-select>
				</mu-form-item>
				<mu-form-item prop="result" label="输出结果：">
					<mu-text-field multi-line :rows="1" :rows-max="6" v-model="result" readonly="readonly"></mu-text-field>
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
				orderOptions: ['中国', '美国', '日本','韩国','日本'],
				labelPosition: 'left',
				openSimple: false,
				result: '',
				form: {
					startNum: '',
					endNum: '',
					totalNum: '',
					isSole: '中国',
					isOrder: '美国',
				},
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
					isSole: '中国',
					isOrder: '美国',
				};
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