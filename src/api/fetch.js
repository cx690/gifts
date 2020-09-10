// if (!window.fetch) {
// 	window.fetch = require('isomorphic-fetch'); //如果某一天要兼容一些不支持fetch的垃圾浏览器，请按照此法执行,Promise的问题请自行polyfill
// }
import {
	message
} from 'ant-design-vue';
const fetchDefault = {
	method: 'GET',
	cache: 'no-cache',
	credentials: 'include', // include, same-origin, *omit
	mode: 'cors',
	headers: {
		"Content-Type": "application/json; charset=utf-8"
	}
}
//生成url参数
// function getRequestQuery(params) {
// 	const query = paramFilter(params);
// 	const res = [];
// 	Object.entries(query).forEach(o => res.push(`${o[0]}=${o[1]}`));
// 	return res.join('&');
// }

function getRequestQuery(params) { //目前无需考虑兼容性问题
	const query = paramFilter(params);
	const usp = new URLSearchParams(query);
	return usp.toString();
}

function paramFilter(params = {}) { //删除无用的数据
	let result = {};
	for (let k in params) {
		if (params[k] !== '' && params[k] !== undefined && params[k] !== null) {
			result[k] = params[k];
		}
	}
	return result;
}

export default function fetch(url, data = {}, opt = {}) {
	const options = Object.assign({}, fetchDefault, opt);
	options.method = options.method.toUpperCase();
	if (options.method === 'GET' || options.method === 'HEAD') {
		const query = getRequestQuery(data);
		if (query) {
			url = `${url}?${query}`;
		}
	} else {
		options.body = JSON.stringify(paramFilter(data));
	}
	return window.fetch(url, options).then(response => {
		if (response.ok) {
			const res = response.json() || {};
			return res;
		}
		message.error('服务器繁忙，请稍后再试！');
		throw new Error(response.statusText);
	}).catch((err) => {
		console.error("Fetch Error : %s", err);
		return {};
		// throw new Error(err);
	});
}
