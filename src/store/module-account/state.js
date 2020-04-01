import {
  getToken,
  getMenus,
  getAuthorities,
  getPublicUserInfo
} from '@/utils/storage'

export default {
  // 权限列表
  authorities: getAuthorities(),

  // 菜单列表
  menus: getMenus(),

  // token
  token: getToken(),

  // 登陆账户公共服务基本信息
  publicUserInfo: getPublicUserInfo(),

  // 修改密码的结果
  modifyPasswordResult: false
}
