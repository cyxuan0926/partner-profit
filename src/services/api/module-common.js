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
