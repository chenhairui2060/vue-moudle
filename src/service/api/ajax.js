import axios from "axios"
// {
// 	name:'张三'
// }
export default function ajax(url = "", parmas = {}, type = 'GET') {
	//1.变量
	let promise;
	//2.返回一个promise对象
	return new Promise((resolve, reject) => {
		//2.1  判断请求类型
		if (type.toUpperCase() === "GET") { //get请求
			//2.2拼接字符串
			let parmasStr = '';
			//2.3遍历
			Object.keys(parmas).forEach(key => {
				parmasStr += key + '='
				parmas[key] + '&'
			})
			//2.4过滤最后的&
			if (parmasStr) {
				parmasStr = parmasStr.substr(0, parmasStr.lastIndexOf('&'))
			}
			//2.5拼接完整路径
			if (parmas.length) {
				url += "?" + parmasStr
			}
			// console.log('请求地址', url)
			//2.6发起get请求
			promise = axios.get(url);
		} else if (type.toUpperCase() === "POST") { //post请求
			//2.7发起post请求
			promise = axios.post(url, parmas)
		}
		//2.8处理结果返回
		promise.then(response => {
			resolve(response)
		}).catch(error => {
			reject(error)
		})
	})

}
