module.exports = {
    publicPath: '/',
    devServer: {
        proxy: {
            '/api': {
				// http://demo.itlike.com/web/xlmc/api/send_code
				// http://ceshi2.dishait.cn/api/v1/topicclass
                target: 'http://demo.itlike.com/web/xlmc',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
};