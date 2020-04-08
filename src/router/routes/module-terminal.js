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
        component: _import('module-terminal/terminal-list'),
        meta: {
          componentsKeepAlive: ['terminalList']
        }
      },
      {
        name: 'CoopertivePartnerTerminalCreate',
        path: routesPath.COOPERTIVE_PARTNER_TERMINAL_INFORMATION_CREATE,
        component: _import('module-terminal/terminal-information'),
        meta: {
          title: '新增终端信息',
          activeMenu: routesPath.COOPERTIVE_PARTNER_TERMINAL_LIST,
          componentsUnRemoveKeepAlive: ['terminalList']
        },
        props: {
          status: 'add'
        }
      },
      {
        name: 'CoopertivePartnerTerminalEdit',
        path: routesPath.COOPERTIVE_PARTNER_TERMINAL_INFORMATION_EDIT,
        component: _import('module-terminal/terminal-information'),
        meta: {
          title: '修改终端信息',
          activeMenu: routesPath.COOPERTIVE_PARTNER_TERMINAL_LIST,
          componentsUnRemoveKeepAlive: ['terminalList']
        },
        props: route => ({
          terminalId: route.params.terminalId,
          status: 'edit'
        })
      }
    ]
  }
]
