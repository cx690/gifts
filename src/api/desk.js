import fetch from './fetch.js';

//保存批次号
export function SaveBatche(data) {
	return fetch('/api/Production/SaveBatche', data, {
		method: 'POST'
	});
}

//获取主要信息
export function LoadBatche(data) {
	return fetch('/api/Production/LoadBatche', data);
}

//更改状态
export function ModifyState(data) {
	return fetch('/api/Production/ModifyState', data, {
		method: 'POST'
	});
}
