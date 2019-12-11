module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "so-i-eat-server.herokuapp.com"
      }
    }
  }
};