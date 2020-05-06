module.exports = {
  repository: {
    type: 'git',
    url: 'http://39.104.53.150/yt/front/partner-profit.git',
    branch: 'master'
  },

  buildConfig: {
    commands: ['npm ci', 'npm run build:prod'],
    outputDir: 'dist',
    assetsPatterns: ['static', 'index.html']
  },

  remoteOperatesConfig: {
    remotePath: '/build/docker/prison/partner/web/dist'
  },

  connectConfig: {
    host: '120.79.67.25',
    port: 22,
    username: 'root',
    password: 'legendEDP02',
  }
};
