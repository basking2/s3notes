module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  'devServer': {
    'proxy': {
      '^/api': {
        'target': 'http://127.0.0.1:9000',
        'secure': false,
        // Do not auth as this is part of the server.
        // 'auth': 'admin:admin'
      }
    }
  },
}