import { httpClient } from '../request'

// 合作商列表
export const getCooperativePartners = params => {
  return httpClient.get('/cooperative/partners', params)
}

// 删除合作商
export const deletePartner = id => {
  return httpClient.delete(`/cooperative/${id}`)
}

// 新增合作商
export const createPartner = params => {
  return httpClient.post('/cooperative/partner', params)
}
