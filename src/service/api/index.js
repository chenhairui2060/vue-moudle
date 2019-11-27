import ajax from "./ajax.js"
//http://demo.itlike.com/web/xlmc/api/homeApi
//1.定义基础路径
const BASE_URL = "http://demo.itlike.com/web/xlmc"
//首页数据接口
export const getHomeData = () => ajax(BASE_URL + "/api/homeApi");

//商品分类接口
//1.左边分类接口
//http://demo.itlike.com/web/xlmc/api/homeApi/categories
export const getCategories = () => ajax(BASE_URL + "/api/homeApi/categories");
//http://demo.itlike.com/web/xlmc/api/homeApi/categoriesdetail/lk001
//lk001-lk006
export const getCategoriesDetail = (preParams) => ajax(BASE_URL + '/api/homeApi/categoriesdetail' + preParams);


// 2. 用户中心接口
//使用代理处理跨域问题
// const LOCAL_BASE_URL = '/api';
const LOCAL_BASE_URL = '/api';
// 2.1 获取短信验证码(GET)
export const getPhoneCode = (phone) => ajax(LOCAL_BASE_URL + '/api/send_code', {phone});
// export const getPhoneCode = (phone) => ajax(LOCAL_BASE_URL + '/api/v1/user/sendcode', {
// 	phone
// })
// 2.2 手机验证码登录(POST)
export const phoneCodeLogin = (phone, code) => ajax(LOCAL_BASE_URL + '/api/login_code', {
	phone,
	code
}, 'POST');
// 2.3 用户名和密码登录(POST)
export const pwdLogin = (user_name, user_pwd, captcha) => ajax(LOCAL_BASE_URL + '/api/login_pwd', {
	user_name,
	user_pwd,
	captcha
}, 'POST');
// 2.4 自动登录
export const getUserInfo = () => ajax(LOCAL_BASE_URL + '/api/userinfo');
// 2.5 退出登录
export const getLogOut = () => ajax(LOCAL_BASE_URL + '/api/logout');
