import { mutationsGlobal } from './mutation-types'

export default {
  [mutationsGlobal.SET_COMPONENTS_KEEPALIVE]: (state, components) => {
    state.componentsKeepAlive = components
  },

  [mutationsGlobal.SET_LOADING]: (state, loading) => {
    state.$loading = loading
  },

  [mutationsGlobal.SET_COLLAPSE]: (state, collapse) => {
    if (collapse === 'isCollapsed') state.isCollapsed = true
    else state.isCollapsed = !state.isCollapsed
  }
}
