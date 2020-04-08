import * as partnerAPI from '@/services/api/module-partner'

import { mutationPartner } from './mutation-types'

export default {
  async getCooperativePartners({ commit }, params) {
    try {
      const { data } = await partnerAPI.getCooperativePartners(params)

      const { totalCount = 0, list } = data

      commit(mutationPartner.SET_PARTNERS, {
        content: (Array.isArray(list) && list) || [],
        totalCount
      })

      return true
    } catch (err) {
      Promise.reject(err)
    }
  },

  async deletePartner({ commit }, id) {
    try {
      const { code } = await partnerAPI.deletePartner(id)

      const isSuccess = code === 200

      commit(mutationPartner.SET_DELETE_PARTNER_RESULT, isSuccess)

      return isSuccess
    } catch (err) {
      Promise.reject(err)
    }
  },

  async createPartner({ commit }, params) {
    try {
      const { code } = await partnerAPI.createPartner(params)

      const isSuccess = code === 200

      commit(mutationPartner.SET_CREATE_PARTNER_RESULT, isSuccess)

      return code
    } catch (err) {
      Promise.reject(err)
    }
  }
}
