const { createProxyMiddleware } = require('http-proxy-middleware');

const API_KEY = process.env.API_KEY;
const API_BASEPATH = process.env.API_BASEPATH;

const apiProxy = createProxyMiddleware({
    target: API_BASEPATH,
    changeOrigin: true,
    pathRewrite: {
        "^/api": "" // strip "/api" from the URL
    },

    onProxyReq(proxyReq) {
        const targetURL = new URL(proxyReq.path, API_BASEPATH);
        targetURL.searchParams.set('key', API_KEY);
        proxyReq.path = targetURL.pathname + targetURL.search;
    }

});

// Expose the proxy on the "/api/*" endpoint.
export default function (req, res) {
    return apiProxy(req, res);
};