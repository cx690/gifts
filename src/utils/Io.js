export default class Io {
	io = null;
	onList = [];
	times = 5;
	oldTimes = 5;
	_open = null;
	_close = null;
	_error = null;
	url = '';
	constructor(url, {
		onopen: _open,
		onclose: _close,
		onerror: _error,
		times = 5,
	} = {}) {
		this.onList = [];
		this.times = times;
		this.io = new WebSocket(url);
		this.url = url;
		//保留组件内的操作
		this._open = _open;
		this._close = _close;
		this._error = _error;
		//设置事件
		this.io.onopen = this.onopen;
		this.io.onmessage = this.onmessage;
		this.io.onclose = this.onclose;
		this.io.onerror = this.onerror;

		this.oldTimes = times;
		this.times = times;
	}

	reset() {
		this.onList = [];
		this.io = new WebSocket(this.url);
		this.io.onopen = this.onopen;
		this.io.onmessage = this.onmessage;
		this.io.onclose = this.onclose;
		this.io.onerror = this.onerror;
	}

	onopen = (event) => {
		this.times = this.oldTimes;
		this._open && this._open(event);
	}

	onerror = (event) => {
		this.times -= 1;
		if (this.times > 0) {
			this.reset();
		}
		this._error && this._error(event);
	}

	onclose = (event) => {
		this._close && this._close(event);
	}

	onmessage = (event) => {
		this.times = this.oldTimes;
		const received = JSON.parse(event.data);
		if (typeof received !== 'object') {
			console.error('Invalid response:%s', received);
		}
		const {
			Type,
			Data
		} = received || {};
		for (const item of this.onList) {
			if (item.Type === Type) {
				// console.log(event,item)
				item.callback(Data);
			}
		}
	}
	//添加时间
	on(Type, callback) {
		this.onList.push({
			Type,
			callback
		});
	}

	emit(type, data) {
		this.io.send(JSON.stringify({
			type,
			data
		}));
	}

	close() {
		this.io.close();
	}
}
