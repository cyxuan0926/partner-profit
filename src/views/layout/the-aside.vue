<template>
  <div class="aside-container">
    <div class="aside-top">
      <img :src="userAvatar" class="avatar circle" />
      <div class="info">
        <span class="ellipsis">合作商管理员</span>
      </div>
    </div>

    <el-menu
      :default-active="activeIndex"
      background-color="#222d32"
      text-color="#b8c7ce"
      active-text-color="#fff"
      :collapse="isCollapsed"
      class="first-level"
      unique-opened
      :router="true"
    >
      <template v-for="item in menus">
        <el-menu-item
          v-if="!item.children.length"
          class="border-bottom"
          :popper-append-to-body="false"
          :key="item.path"
          :index="item.path"
        >
          <i :class="['iconfont', `${item.icon}`]" />
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
        <el-submenu
          v-if="item.children.length"
          :class="['border-bottom', 'second-level']"
          :key="item.path"
          :index="item.path"
        >
          <template slot="title">
            <i :class="['iconfont', `${item.icon}`]" />
            <span>{{ item.name }}</span>
          </template>
          <template v-for="second in item.children">
            <el-menu-item
              v-if="!second.children.length"
              :key="second.path"
              :index="second.path"
            >
              {{ second.name }}
            </el-menu-item>
            <el-submenu
              v-else
              :class="['border-bottom', 'third-level']"
              :key="second.path"
              :index="second.path"
            >
              <template slot="title">
                <span>{{ second.name }}</span>
              </template>
              <template v-for="third in second.children">
                <el-menu-item :key="third.path" :index="third.path">
                  {{ third.name }}
                </el-menu-item>
              </template>
            </el-submenu>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import userAvatar from '@/assets/img/user-avatar.jpg'

export default {
  data() {
    return {
      userAvatar
    }
  },

  computed: {
    ...mapState('account', ['menus']),

    ...mapState('global', ['isCollapsed']),

    activeIndex() {
      return this.$route.meta.activeMenu || this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/layout';
</style>
