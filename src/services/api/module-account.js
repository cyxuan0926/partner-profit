import { httpClient } from '../request'

import { URLConfig } from '../urls'

// 公共服务的接口地址
const basicConfig = {
  baseURL: URLConfig.publicApiHost
}

// basicToken的账户/密码
const tokenAuthConfig = {
  username: 'partner.admin',
  password: '8c3823e1a69a4cf4b2d2bb8b1ba5ab2c'
}

// 获取登陆的token
export const getToken = ({ username, password }) => {
  return httpClient.postForm(
    '/oauth/token',
    {
      username,
      password,
      grant_type: 'password',
      mode: 'account_password'
    },
    Object.assign({}, basicConfig, { auth: tokenAuthConfig })
  )
}

// 获取对应账户在公共服务的信息
export const getPublicUserInfo = () => {
  return httpClient.get('/users/me', {}, basicConfig)
}

// 获取对应账户的菜单信息
export const getMenus = () => {
  return httpClient.get('/menus/my', {}, basicConfig)
}

// 修改账户密码
export const modifyMyPassword = ({ oldPassword, newPassword }) => {
  return httpClient.putObj('/users/me/password/by-old-password', {
    oldPassword,
    newPassword
  })
}
