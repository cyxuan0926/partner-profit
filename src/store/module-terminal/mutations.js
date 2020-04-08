import { mutationTerminal } from './mutation-types'

export default {
  [mutationTerminal.SET_TERMINALS]: (state, { content, totalCount }) => {
    state.terminals.content = content
    state.terminals.totalCount = totalCount
  },

  [mutationTerminal.SET_TERMINAL_DETAILS]: (state, terminalDetails) => {
    state.terminalDetails = terminalDetails
  },

  [mutationTerminal.SET_OPERATION_RESULT]: (state, result) => {
    state.isOperateSuccess = result
  }
}
