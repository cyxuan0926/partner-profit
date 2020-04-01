<template>
  <el-header height="46px">
    <div class="header-container">
      <div
        :class="[
          'header-container__title',
          'transition__collapsed',
          isCollapsed ? 'collapsed' : ''
        ]"
      >
        <strong>合作商</strong>管理系统
      </div>

      <div class="header-container__toolbar">
        <i class="iconfont icon-category bold" @click="onCollapse" />

        <div class="dropdown-container">
          <el-dropdown trigger="click" @command="onCommand">
            <div class="user__information">
              <img class="avatar" :src="userAvatar" alt="头像" />
              <span class="user__name">hzs_admin</span>
            </div>

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="{ path: '/account/password' }"
                >修改密码</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>

          <i class="iconfont icon-logout" @click="onLogout" />
        </div>
      </div>
    </div>
  </el-header>
</template>

<script>
import * as helper from '@/utils/helper'

import routesPath from '@/router/routes-path'

import { mapState, mapActions } from 'vuex'

import userAvatar from '@/assets/img/user-avatar.jpg'

export default {
  data() {
    return {
      userAvatar
    }
  },

  computed: {
    ...mapState('global', ['isCollapsed'])
  },

  methods: {
    ...mapActions('global', ['onCollapse']),

    onCommand(path) {
      this.$router.push(path)
    },

    async onLogout() {
      try {
        await helper.$confirm('是否退出登陆?')

        this.$store.dispatch('global/logout')

        this.$router.push(routesPath.ACCOUNT_LOGIN)
      } catch (err) {
        Promise.reject(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  padding: 0px;

  .header-container {
    height: 46px;
    line-height: 46px;
    display: flex;
    color: #fff;
    background-color: #367fa9;

    .iconfont,
    .user__information {
      cursor: pointer;
      padding: 0px 15px;

      &:hover {
        background-color: #367fa9;
      }
    }

    .collapsed {
      width: 50px;
    }

    &__title {
      width: 230px;
      padding-left: 20px;
      font-size: 18px;
      overflow: hidden;
    }

    &__toolbar {
      flex: 1 1 auto;
      display: flex;
      background-color: #3c8dbc;
      justify-content: space-between;

      .user__information {
        color: #fff;
        font-size: 12px;

        .avatar {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          vertical-align: middle;
        }

        .user__name {
          margin-left: 10px;
        }
      }
      .iconfont {
        display: inline-block;
        vertical-align: top;
      }
    }
  }
}
</style>
