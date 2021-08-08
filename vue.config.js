module.exports = {
    publicPath: process.env.BASE_URL,
    transpileDependencies: ["vuetify"],
    devServer: {
        port: 8081,
        disableHostCheck: true,
        proxy: {
            // "^/login": {
            //     ws: true,
            //     changeOrigin: false,
            //     target: "http://localhost:8080"
            // },
            // "^/logout": {
            //     ws: true,
            //     changeOrigin: false,
            //     target: "http://localhost:8080"
            // },
            "^/api/v1": {
                ws: true,
                changeOrigin: false,
                target: "http://localhost:8080"
            }
        }
    }
}