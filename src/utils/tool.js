/**
 * 每三位默认加,格式化
 * @param {string|number} x
 * @return {string}
 */
export function addCommas(x) {
	if (isNaN(x)) {
		return '-';
	}

	x = (x + '').split('.');
	return x[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') + (x.length > 1 ? '.' + x[1] : '');
}