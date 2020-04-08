import Vue from 'vue'
import Vuex from 'vuex'

import account from './module-account/index'

import global from './module-global'

import partner from './module-partner'

import terminal from './module-terminal'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    account,
    global,
    partner,
    terminal
  }
})
