import { mutationsGlobal } from './mutation-types'

import { removeStore } from '@/utils/storage'

import { mutationsAccount } from '../module-account/mutation-types'

import { Message } from 'element-ui'

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
  }
}
