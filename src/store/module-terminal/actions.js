import * as terminalAPI from '@/services/api/module-terminal'

import { mutationTerminal } from './mutation-types'

export default {
  async getTerminals({ commit }, params) {
    try {
      const { data } = await terminalAPI.getTerminals(params)

      const { list, totalCount = 0 } = data

      commit(mutationTerminal.SET_TERMINALS, {
        content: (Array.isArray(list) && list) || [],
        totalCount
      })

      return true
    } catch (err) {
      Promise.reject(err)
    }
  },

  async getTerminalDetails({ commit }, params) {
    try {
      const { data } = await terminalAPI.getTerminalDetails(params)

      commit(mutationTerminal.SET_TERMINAL_DETAILS, data)

      return true
    } catch (err) {
      Promise.reject(err)
    }
  },

  async createTerminal({ commit }, params) {
    try {
      const { code } = await terminalAPI.createTerminal(params)

      const isSuccess = code === 200

      commit(mutationTerminal.SET_OPERATION_RESULT, isSuccess)

      return code
    } catch (err) {
      Promise.reject(err)
    }
  },

  async editTerminal({ commit }, params) {
    try {
      const { code } = await terminalAPI.editTerminal(params)

      const isSuccess = code === 200

      commit(mutationTerminal.SET_OPERATION_RESULT, isSuccess)

      return code
    } catch (err) {
      Promise.reject(err)
    }
  }
}
