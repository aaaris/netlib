const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  parallel: false,
  publicPath: "/",
  // assetsDir:'static',
  transpileDependencies: true,
  lintOnSave: false
})
