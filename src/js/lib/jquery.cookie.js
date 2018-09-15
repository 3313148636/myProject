/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2006, 2014 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD (注册为匿名模块)
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS
		module.exports = factory(require('jquery'));
	} else {
		// 浏览器全局
		factory(jQuery);
	}
}
(function ($) {

	var pluses = /\+/g;

	//raw
	//默认情况下,cookie读写编码的encoded/decoded是使用encodeURIComponent/decodeURIComponent 。
	//将raw设置为true不进行编码
	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	//json
	//使用 JSON.stringify and JSON.parse对json对象进行编码
	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// 根据RFC2068，这是一个被引用的cookie，无法逃脱。
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// 用空格替换服务器端写的加号。
			// 如果我们不能解码cookie，就忽略它，它是不可用的。
			// 如果我们不能解析cookie，忽略它，它是不可用的。
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	//提供一个转换函数作为可选的最后一个参数来读取，以便将cookie的值更改为不同的表示。
	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// 写入

		if (arguments.length > 1 && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
			}

			//domain定义cookie有效的域。默认：创建cookie的页面的域。
			//secure如果为true，则Cookie传输需要安全协议（https）。默认：false。
			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // 使用expires属性，max-age不受IE的支持
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// 读

		var result = key ? undefined : {},
			// 为了防止for循环首先分配一个空数组
			// 万一根本没有cookie。也可以防止奇怪的结果
			// calling $.cookie().
			cookies = document.cookie ? document.cookie.split('; ') : [],
			i = 0,
			l = cookies.length;

		for (; i < l; i++) {
			var parts = cookies[i].split('='),
				name = decode(parts.shift()),
				cookie = parts.join('=');

			if (key === name) {
				// 如果第二个参数（value）是一个函数它是一个转换器。
				result = read(cookie, value);
				break;
			}

			// 防止存储我们无法解码的cookie。
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	//Cookie属性可以通过设置$.cookie.defaults对象的属性或$.cookie()，
	//将一个普通对象传递给options参数来单独调用来覆盖默认选项。
	config.defaults = {};

	$.removeCookie = function (key, options) {
		// 不能改变选项，从而扩展一个新的对象。
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));
