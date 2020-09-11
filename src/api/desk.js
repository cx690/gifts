import fetch from './fetch.js';

//保存批次号
export function saveData(data) {
	return fetch('/api/gifts/save', data, {
		method: 'POST'
	});
}

//获取主要信息
export function getData(data) {
	return fetch('/api/gifts/all', data, {
		method: 'POST'
	});
}

//获取主要信息
export function getOne(data) {
	return fetch('/api/gifts/one', data,{
		method: 'POST'
	});
}

//更改状态
export function ModifyData(data) {
	return fetch('/api/gifts/modify', data, {
		method: 'POST'
	});
}

//更改状态
export function deleteOne(data) {
	return fetch('/api/gifts/delete', data, {
		method: 'POST'
	});
}