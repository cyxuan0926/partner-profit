import routesPath from '../routes-path'

import account from './module-account'

import home from './dashboard'

import terminal from './module-terminal'

import partnerInformation from './module-partner-information'

export default [
  {
    path: '*',
    redirect: routesPath.HOME,
    meta: {}
  },
  ...account,
  ...home,
  ...terminal,
  ...partnerInformation
]
