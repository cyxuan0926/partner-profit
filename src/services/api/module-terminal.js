import { httpClient } from '../request'

// 获取终端信息列表
export const getTerminals = params => {
  return httpClient.get('/terminal/terminals', params)
}

// 获取终端详情
export const getTerminalDetails = id => {
  return httpClient.get(`/terminal/${id}`)
}

// 新增终端
export const createTerminal = params => {
  return httpClient.post('/terminal/terminal', params)
}

// 修改终端
export const editTerminal = params => {
  return httpClient.putObj('/terminal', params)
}
