<template>
  <el-container direction="vertical" class="app-container">
    <the-header />

    <el-container class="main-container">
      <el-aside
        :width="isCollapsed ? (hidden ? '0px' : '50px') : '230px'"
        :class="['transition__collapsed', isCollapsed ? 'collapsed' : '']"
      >
        <the-aside />
      </el-aside>

      <el-container
        class="main-container__content"
        direction="vertical"
        v-loading="$loading"
        element-loading-background="rgba(255, 255, 255, 0.5)"
      >
        <BreadcrumbItem v-show="!$route.meta.hideBreadcrumb" />

        <el-main>
          <keep-alive :include="componentsKeepAlive">
            <router-view />
          </keep-alive>
        </el-main>

        <the-footer />
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import TheHeader from './the-header'
import TheAside from './the-aside'
import BreadcrumbItem from './breadcrumb-item'
import TheFooter from './the-footer'
import { mapState, mapActions } from 'vuex'

export default {
  components: { BreadcrumbItem, TheHeader, TheAside, TheFooter },

  data() {
    return {
      hidden: false
    }
  },

  computed: {
    ...mapState('global', ['componentsKeepAlive', 'isCollapsed'])
  },

  methods: {
    ...mapActions('global', ['onCollapse']),

    onResize() {
      if (window.innerWidth <= 768) {
        if (!this.hidden) {
          this.onCollapse()
          this.hidden = true
        }
      } else {
        this.hidden = false
      }
    }
  },

  created() {
    this.onResize()

    window.onresize = () => {
      this.onResize()
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  height: 100%;

  .main-container {
    flex-shrink: 0;
    height: calc(100vh - 47px);
    width: 100%;
    overflow: hidden;

    &__content {
      background-color: #ecf0f5;
    }

    & > .el-container {
      width: calc(100% - 230px);
    }
  }
}
</style>
