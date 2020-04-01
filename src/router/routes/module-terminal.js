import { _import } from '../helper'

import routesPath from '../routes-path'

export default [
  {
    path: routesPath.COOPERTIVE_PARTNER_TERMINAL,
    component: _import('layout/the-layout'),
    redirect: routesPath.COOPERTIVE_PARTNER_TERMINAL_LIST,
    meta: {
      title: '合作商终端管理列表'
    },
    children: [
      {
        name: 'CoopertivePartnerTerminal',
        path: routesPath.COOPERTIVE_PARTNER_TERMINAL_LIST,
        component: _import('module-terminal/terminal-list')
      }
    ]
  }
]
