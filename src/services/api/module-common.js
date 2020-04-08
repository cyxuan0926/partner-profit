import { httpClient } from '../request'

import { URLConfig } from '../urls'

// 公共服务的接口地址
const basicConfig = {
  baseURL: URLConfig.publicApiHost
}

// 下载文件(除了公有类型的之外)
export const getFiles = fileParams => {
  const { fileNanme, params = {} } = fileParams
  return httpClient.get(
    `/files/${fileNanme}`,
    params,
    Object.assign({}, basicConfig, { responseType: 'blob' })
  )
}

// 获取狱务通所有监狱
export const getPrisonAll = params => {
  return httpClient.get(
    '/jails/getJailAll',
    params,
    Object.assign({}, { baseURL: URLConfig.ywtApiHost })
  )
}

// 获取合作商信息(不分页)
export const getNoPagePartners = () => {
  return httpClient.get('/cooperative/partner/names')
}
