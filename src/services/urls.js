const BUILD_ENV = process.env.VUE_APP_BUILD_ENV.toLowerCase()

const config = {
  // 开发/本地环境
  dev: {
    publicApiHost: 'http://qa-auth-api.yuwugongkai.com',
    apiHost: 'http://qa-partner-api.yuwugongkai.com',
    ywtApiHost: 'http://qa-ywgk.yuwugongkai.com/ywgk'
  },

  // 测试环境
  staging: {
    publicApiHost: 'http://qa-auth-api.yuwugongkai.com',
    apiHost: 'http://qa-partner-api.yuwugongkai.com',
    ywtApiHost: 'http://qa-ywgk.yuwugongkai.com/ywgk'
  },

  // 线上环境
  prod: {
    publicApiHost: 'https://auth-api.yuwugongkai.com',
    apiHost: '',
    ywtApiHost: 'https://www.yuwugongkai.com/ywgk'
  }
}

export const URLConfig = config[BUILD_ENV]
