module.exports = {
  transpileDependencies: ["vuetify", "feathers-vuex"],

  // devServer: {
  //   proxy: {
  //     "/api": {
  //       target: "http://localhost:3333",
  //       timeout: 6000,
  //       secure: false,
  //       changeOrigin: true
  //     }
  //   }
  // },

  pluginOptions: {
    UglifyJsPlugin: {
      output: {
        ascii_only: true,
      },
    },
  },
};
