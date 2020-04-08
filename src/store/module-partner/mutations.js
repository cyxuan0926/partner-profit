import { mutationPartner } from './mutation-types'

export default {
  [mutationPartner.SET_PARTNERS]: (state, { content, totalCount }) => {
    state.coopertivePartners.content = content
    state.coopertivePartners.totalCount = totalCount
  },

  [mutationPartner.SET_DELETE_PARTNER_RESULT]: (state, result) => {
    state.isdeletPartnerSuccess = result
  },

  [mutationPartner.SET_CREATE_PARTNER_RESULT]: (state, result) => {
    state.isCreatePartnerSuccess = result
  }
}
