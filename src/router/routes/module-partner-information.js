import { _import } from '../helper'

import routesPath from '../routes-path'

export default [
  {
    path: routesPath.COOPERTIVE_PARTNER_INFORMATION,
    component: _import('layout/the-layout'),
    redirect: routesPath.COOPERTIVE_PARTNER_INFORMATION_LIST,
    meta: {
      title: '合作商信息管理列表'
    },
    children: [
      {
        name: 'CoopertivePartnerInformation',
        path: routesPath.COOPERTIVE_PARTNER_INFORMATION_LIST,
        component: _import(
          'module-partner-information/partner-information-list'
        ),
        meta: {
          componentsKeepAlive: ['partnerInformationList']
        }
      },
      {
        name: 'CoopertivePartnerInformationCreate',
        path: routesPath.COOPERTIVE_PARTNER_INFORMATION_CREATE,
        component: _import(
          'module-partner-information/partner-information-create'
        ),
        meta: {
          title: '新增合作商',
          activeMenu: routesPath.COOPERTIVE_PARTNER_INFORMATION_LIST,
          componentsUnRemoveKeepAlive: ['partnerInformationList']
        }
      }
    ]
  }
]
