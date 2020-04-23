module.exports = {
  transpileDependencies: ["vuetify"],

  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3333",
        timeout: 6000,
        secure: false,
        changeOrigin: true
      }
    }
  },

  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: ["/", "/404", "/about", "/privacy-policy", "/terms"],
      useRenderEvent: true,
      headless: true,
      onlyProduction: true
    },
    UglifyJsPlugin: {
      output: {
        ascii_only: true
      }
    }
  }
};
