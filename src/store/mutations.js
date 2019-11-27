import {
	ADD_GOODS,
	USER_INFO,
	INIT_USER_INFO
} from "./mutations-type.js"
import {
	setStore,
	getStore
} from '@/config/global.js'
// import Vue from 'vue'
//同步操作
export default {
	// 1. 往购物车中添加数据
	[ADD_GOODS](state, {
		goodsId,
		goodsName,
		smallImage,
		goodsPrice
	}) {
		console.log(goodsId, goodsName, smallImage, goodsPrice)
		let shopCart = state.shopCart;
		//1.判断商品是否存在
		if (shopCart[goodsId]) {
			shopCart[goodsId]['num']++;
		} else {
			shopCart[goodsId] = {
				"num": 1,
				"id": goodsId,
				"name": goodsName,
				"small_image": smallImage,
				"price": goodsPrice
			}
		}
		//2.产生新对象
		state.shopCart = { ...shopCart
		}
	},
	//保存用户信息报本地
	[USER_INFO](state, {
		userInfo
	}) {
		state.userInfo = userInfo;
		setStore('userInfo', state.userInfo);
	},
	//获取用户信息
	[INIT_USER_INFO](state) {
		let userInfo = getStore('userInfo');
		if(userInfo){
			state.userInfo=JSON.parse(userInfo)
		}
	}
}
