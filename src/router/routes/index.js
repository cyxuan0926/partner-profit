import routesPath from '../routes-path'

import account from './module-account'

import home from './dashboard'

export default [
  {
    path: '*',
    redirect: routesPath.HOME,
    meta: {}
  },
  ...account,
  ...home
]
