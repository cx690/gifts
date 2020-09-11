const path = require("path");
module.exports = {
	// chainWebpack: config => {},
	configureWebpack: config => {
		config.entry.app = ["./src/main.js"];
		if (process.env.NODE_ENV === 'production') { //线上环境不要控制台废话与断点
			config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
			config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true;
		}
	},
	css: { //加载less，单独设置主要是为了加载antd的less样式与传入参数
		loaderOptions: {
			less: {
				lessOptions: {
					modifyVars: {
						// 'primary-color': '#1DA57A',
						// 'link-color': '#1DA57A',
						// 'border-radius-base': '2px',
					},
					javascriptEnabled: true,
				},
			},
		},
	},
	// transpileDependencies: [],
	devServer: {
		host: '0.0.0.0',
		port: 9527,
		disableHostCheck: true,
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:3000',
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	},
};
