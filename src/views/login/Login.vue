<template>
	<div class="login-container">
		<!-- 登录面板内容部分 -->
		<div class="login-inner">
			<div class="login-header">
				<van-image class="image" src="https://img.yzcdn.cn/vant/cat.jpeg">
					<template v-slot:error>
						加载失败
					</template>
				</van-image>
			</div>
			<div class="login-header-title">
				<span :class="{ current: loginMode }" @click="changeMode(true)">手机登录</span>
				<span :class="{ current: !loginMode }" @click="changeMode(false)">密码登录</span>
			</div>
			<!-- 登录面板 -->
			<div class="login-content">
				<template v-if="loginMode">
					<van-cell-group>
						<van-field
							required
							right-icon="question-o"
							@click-right-icon="$toast('请输入手机号')"
							type="number"
							maxlength="11"
							:error-message="errorMsg.phone"
							label="手机号"
							placeholder="请输入手机号码"
							v-model="loginParam.phone"
						>
							<van-button slot="button" :disabled="disabled" class="btn" size="mini" @click="sendcode" type="primary">{{ btntxt }}</van-button>
						</van-field>
						<van-field
							required
							right-icon="question-o"
							@click-right-icon="$toast('验证码')"
							type="number"
							:error-message="errorMsg.code"
							maxlength="6"
							rule="code"
							label="验证码"
							placeholder="请输入验证码"
							v-model="loginParam.code"
						></van-field>
					</van-cell-group>
				</template>
				<template v-else>
					<van-cell-group>
						<van-field
							required
							right-icon="question-o"
							@click-right-icon="$toast('请输入用户名')"
							type="text"
							maxlength="10"
							:error-message="usererrorMsg.username"
							label="用户名"
							left-icon="contact"
							placeholder="请输入用户名"
							v-model="userParam.username"
						></van-field>
						<van-field
							required
							right-icon="question-o"
							@click-right-icon="$toast('请输入密码')"
							:type="pwdMode ? 'password' : 'text'"
							@click-left-icon="changePwdMode"
							:error-message="usererrorMsg.userpwd"
							maxlength="6"
							:left-icon="pwdMode ? 'closed-eye' : 'eye-o'"
							label="密码"
							placeholder="请输入密码"
							v-model="userParam.userpwd"
						></van-field>
						<van-field
							required
							left-icon="diamond-o"
							type="text"
							maxlength="4"
							label="验证码"
							placeholder="验证码"
							:error-message="usererrorMsg.captcha"
							v-model="userParam.captcha"
							class="captcha"
						>
							<van-button slot="button" @click.prevent="getCaptcha">
								<img class="get-verification" src="http://demo.itlike.com/web/xlmc/api/captcha" alt="captcha" ref="captcha" />
							</van-button>
						</van-field>
					</van-cell-group>
				</template>
				<van-button class="login-btn" type="primary" @click="login">登录</van-button>
			</div>
		</div>
	</div>
</template>

<script>
//引入网络请求
import { getPhoneCode, phoneCodeLogin, pwdLogin} from '@/service/api/index.js';
import { mapActions } from 'vuex';
import validator from '@/plugins/validate.js';
export default {
	name: 'Login',
	data() {
		return {
			loginMode: true, // 登录模式
			errorMsg: {
				phone: '',
				code: ''
			},
			usererrorMsg: {
				username: '',
				userpwd: '',
				captcha: ''
			},
			loginParam: {
				phone: '',
				code: ''
			},
			userParam: {
				username: '',
				userpwd: '',
				captcha: ''
			},
			userRules: {
				username: { required: true, message: '请输入用户名' },
				userpwd: [
					// {
					// 	validator: (rule, value, callback) => {
					// 		if (!value) {
					// 			callback('请输入密码');
					// 		} else if (/^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/.test(value)) {
					// 			callback();
					// 		} else {
					// 			callback('请输入正确的密码');
					// 		}
					// 	}
					// }
					{ required: true, message: '请输入密码' }
				],
				captcha: { required: true, message: '请输入验证码' }
			},
			btntxt: '获取验证码',
			disabled: false,
			time: 0,
			pwdMode: true, // true密文 false明文
			rules: {
				phone: [
					{
						validator: (rule, value, callback) => {
							if (!value) {
								callback('请输入手机号码');
							} else if (/^[1][0-9]{10}$/.test(value)) {
								callback();
							} else {
								callback('请输入正确的手机号码');
							}
						}
					}
				],
				// code: { required: true, message: '请输入验证码' }
				code: [
					{
						validator: (rule, value, callback) => {
							if (!value) {
								callback('请输入验证码');
							} else if (/^\d{6}$/.test(value)) {
								callback();
							} else {
								callback('请输入正确的验证码');
							}
						}
					}
				]
			},
			userInfo: null
		};
	},
	watch: {
		loginParam: {
			deep: true,
			handler: function(val) {
				//特别注意，不能用箭头函数，箭头函数，this指向全局
				if (val.phone) {
					if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(val.phone)) {
						this.errorMsg.phone = '请输入正确的手机号码';
					} else {
						this.errorMsg.phone = '';
					}
				} else {
					this.errorMsg.phone = '';
				}
				if (val.code) {
					if (!/^\d{6}$/.test(val.code)) {
						this.errorMsg.code = '请输入正确验证码';
					} else {
						this.errorMsg.code = '';
					}
				} else {
					this.errorMsg.code = '';
				}
			}
		},
		userParam: {
			deep: true,
			handler: function(val) {
				console.log(val);
				//特别注意，不能用箭头函数，箭头函数，this指向全局
				// if (val.userpwd) {
				// 	if (!/^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/.test(val.userpwd)) {
				// 		this.usererrorMsg.userpwd = '请输入正确的密码';
				// 	} else {
				// 		this.usererrorMsg.userpwd = '';
				// 	}
				// } else {
				// 	this.usererrorMsg.userpwd = '';
				// }
			}
		}
	},
	created() {
		
	},
	computed: {
		phoneRight() {
			return /^[1][3,4,5,7,8][0-9]{9}$/.test(this.loginParam.phone);
		},
		validator() {
			return this.loginMode ? validator(this.rules, this.loginParam) : validator(this.userRules, this.userParam);
		}
	},
	methods: {
		// ...mapActions(['syncUserInfo']),
		...mapActions(['syncUserInfo']),
		async sendcode() {
			// console.log('发送验证码');
			if (!this.loginParam.phone.trim()) {
				this.$toast('手机号不能为空');
			} else if (!this.phoneRight) {
				this.$toast('手机号格式不正确');
			} else {
				this.time = 60;
				this.disabled = true;
				//验证码的时间设置 可有可无
				this.timer();
				//手机号正确后调取接口
				let codeRes = await getPhoneCode({ phone: this.phone });
				console.log(codeRes);
			}
		},
		/**
		 * 清除验证提示
		 * @param attrs
		 */
		resetField(attrs) {
			attrs = !attrs ? Object.keys(this.errorMsg) : Array.isArray(attrs) ? attrs : [attrs];
			attrs.forEach(attr => {
				this.errorMsg[attr] = '';
			});
		},
		/**
		 * 验证方法
		 * @param callback
		 * @param data
		 */
		validate(callback, data) {
			this.validator.validate((errors, fields) => {
				this.resetField();
				if (errors) {
					fields.forEach(item => {
						this.errorMsg[item.field] = item.message;
					});
				}
				callback && callback(errors, fields);
			}, data);
		},
		//验证码的倒计时
		timer() {
			if (this.time > 0) {
				this.time--;
				this.btntxt = this.time + 's后获取';
				setTimeout(this.timer, 1000);
			} else {
				this.time = 0;
				this.btntxt = '获取验证码';
				this.disabled = false;
			}
		},
		//改变登录模式
		changeMode(mode) {
			this.loginMode = mode;
			this.loginParam = {
				phone: '',
				code: ''
			};
			this.userParam = {
				username: '',
				userpwd: '',
				captcha: ''
			};
		},
		async login() {
			console.log(this.validator);
			if (this.loginMode) {
				// 手机验证码登录
				this.validate(async (errors, fields) => {
					if (!errors) {
						console.log('验证成功');
						let loginRes = await phoneCodeLogin(this.loginParam.phone, this.loginParam.code);
						console.log(loginRes)
						this.syncUserInfo({
							username: 'adison',
							userpic: 'http://img0.imgtn.bdimg.com/it/u=533012005,1605503981&fm=26&gp=0.jpg',
							phone: '18326114738',
							token: 'a33b95dc078100e8d36360b25416ec519082b9b1'
						});
						this.$router.push({name:'home'})
					} else {
						this.$toast(fields[0].message);
					}
				});
			} else {
				//密码验证
				this.validate((errors, fields) => {
					if (!errors) {
						pwdLogin(this.userParam.username, this.userParam.userpwd, this.userParam.captcha).then(res => {
							console.log(res);
						});
					} else {
						this.$toast(fields[0].message);
					}
				});
			}
		},
		changePwdMode() {
			this.pwdMode = !this.pwdMode;
		},
		// 5. 获取随机图形验证码
		getCaptcha() {
			// 1.获取验证码的标签
			let captchaEle = this.$refs.captcha;
			this.$set(captchaEle, 'src', 'http://demo.itlike.com/web/xlmc/api/captcha?time=' + new Date());
			console.log(captchaEle);
		}
	}
};
</script>

<style scoped lang="less">
.login-container {
	width: 100%;
	height: 100%;
	background: #f5f5f5;
	overflow: hidden;
	.login-inner {
		padding-top: 60px;
		width: 80%;
		margin: 0 auto;
		.login-header {
			height: 6.666666rem;
			width: 16rem;
			margin: 0 auto;
			.image {
				display: block;
				height: 6.666666rem;
			}
		}
		.login-header-title {
			padding-top: 40px;
			padding-bottom: 10px;
			text-align: center;
			span {
				color: #333333;
				font-size: 0.933333rem;
				padding-bottom: 0.266666rem;
			}
			span:first-child {
				margin-right: 2.666666rem;
			}
			.current {
				color: #75a342;
				font-weight: 700;
				border-bottom: 0.133333rem solid #75a342;
			}
		}
		.login-content {
			.phone-group {
				width: 100%;
			}
			.info {
				height: 2.666666rem;
				width: 100%;
				display: flex;
				align-items: center;
				border-bottom: 1px solid #e0e0e0;
				.iconfont {
					height: 2.666666rem;
					width: 2.666666rem;
					display: block;
					line-height: 2.666666rem;
					text-align: center;
					font-size: 1.333333rem;
				}
				input {
					height: 100%;
					font-size: 0.933333rem;
					text-indent: 0.666666rem;
				}
				.btn {
					margin-right: 0.666666rem;
				}
			}
		}
	}
	.login-btn {
		width: 100%;
		height: 2.8rem;
		margin-top: 2rem;
		border-radius: 4px;
		background: #75a342;
	}
}
/deep/.van-field__label {
	color: #333333;
	width: 4rem;
}
.phone-group/deep/.van-field__error-message {
	width: 6.666666rem;
	float: left;
}
.phone-group/deep/.van-icon-question-o {
	color: #76da96;
}

.captcha/deep/.van-field__button {
	margin: 0;
	padding: 0;
	height: 2.4rem;
	width: 7.333333rem;
}
.captcha/deep/.van-button {
	height: 2.4rem;
	width: 7.333333rem;
	margin: 0;
	padding: 0;
	position: relative;
}
.captcha/deep/.van-field__label {
	display: flex;
	align-items: center;
}
.captcha/deep/.van-field__button img {
	position: absolute;
	height: 2.4rem;
	width: 100%;
	top: -0.26666rem;
	left: 0;
}
.captcha::before {
	position: absolute;
	left: 0.533333rem;
	color: #ee0a24;
	font-size: 14px;
	content: '*';
	top: 1.466666rem;
	line-height: 100%;
}
.captcha/deep/.van-field__left-icon {
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
