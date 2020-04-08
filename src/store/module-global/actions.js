import { mutationsGlobal } from './mutation-types'

import { removeStore } from '@/utils/storage'

import { mutationsAccount } from '../module-account/mutation-types'

import { Message } from 'element-ui'

import * as global from '@/services/api/module-common'

export default {
  setComponentsKeepAlive({ commit }, components) {
    commit(mutationsGlobal.SET_COMPONENTS_KEEPALIVE, components)
  },

  $showLoading({ commit }) {
    commit(mutationsGlobal.SET_LOADING, true)
  },

  $hideLoading({ commit }) {
    commit(mutationsGlobal.SET_LOADING, false)
  },

  logout({ commit, dispatch }) {
    removeStore()
    dispatch('$hideLoading')
    commit(`account/${mutationsAccount.SET_TOKEN}`, {}, { root: true })
    commit(`account/${mutationsAccount.SET_MENUS}`, [], { root: true })
    commit(`account/${mutationsAccount.SET_AUTHORITIES}`, [], { root: true })
    commit(`account/${mutationsAccount.SET_PUBLICUSERINFO}`, {}, { root: true })
    Message.closeAll()
  },

  onCollapse({ commit }, collapse) {
    commit(mutationsGlobal.SET_COLLAPSE, collapse)
  },

  async getPrisonAll({ commit }, params) {
    try {
      const { data } = await global.getPrisonAll(params)

      const { jails } = data

      commit(mutationsGlobal.SET_PRISON, jails)

      return true
    } catch (err) {
      Promise.reject(err)
    }
  },

  async getNoPagePartners({ commit }) {
    try {
      const { data } = await global.getNoPagePartners()

      commit(mutationsGlobal.SET_NO_PAGE_PARTNERS, data)

      return true
    } catch (err) {
      Promise.reject(err)
    }
  }
}
