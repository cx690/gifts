<template>
	<div class="container">
		<div class="content-center">
			<div class="title">自动缺陷检测分类系统登录</div>
			<a-form-model :model="form" :rules="rules" ref="ruleForm" :label-col="labelCol" :wrapper-col="wrapperCol">
				<a-form-model-item ref="userName" prop="userName">
					<a-input v-model="form.userName" placeholder="请输入用户名" />
				</a-form-model-item>
				<a-form-model-item prop="password">
					<a-input v-model="form.password" type="password" placeholder="请输入密码" />
				</a-form-model-item>
				<a-form-model-item>
					<a-button type="primary" block @click="login">登录</a-button>
				</a-form-model-item>
			</a-form-model>
		</div>
	</div>
</template>

<script>
	import {
		mapMutations
	} from "vuex";
	export default {
		name: "login",
		data() {
			return {
				labelCol: {
					span: 4
				},
				wrapperCol: {
					span: 14
				},
				form: {
					userName: "",
					password: "",
				},
				rules: {
					userName: [{
						required: true,
						message: "请输入用户名",
						trigger: "blur",
					}],
					password: [{
						required: true,
						message: "请输入密码",
						trigger: "blur",
					}]
				}
			};
		},
		methods: {
			...mapMutations(["changeUserName", "changeUserId"]),
			login() {
				this.$router.replace('/desk');
				// this.$refs.ruleForm.validate(valid => {
				// 	if (valid) {
				// 		alert('submit!');
				// 	} else {
				// 		console.log('error submit!!');
				// 		return false;
				// 	}
				// });
			}
		}
	};
</script>

<style lang="less" scoped>
	.container {
		background: url("../../assets/images/login_backgroud.png") no-repeat;
		background-size: 100% 100%;
		width: 100%;
		height: 100%;
		position: relative;

		.content-center {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -60%);
			width: 400px;

			.title {
				line-height: 50px;
				font-size: 16px;
				color: #fff;
			}
		}
	}
</style>
