<template>
  <el-breadcrumb class="com-breadcrumb" separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-if="$route.meta.isTheOnlyRoot"
      >主页</el-breadcrumb-item
    >
    <el-breadcrumb-item v-else :to="{ path: '/home' }">主页</el-breadcrumb-item>
    <el-breadcrumb-item v-for="route in routes" :key="route.path">
      {{ route.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
// import flattenDepth from 'lodash/flattenDepth'

export default {
  name: 'ComBreadcrumb',

  computed: {
    routes() {
      return this.$route.matched.filter(route => route.meta.title)
    }
  }
}
</script>

<style lang="scss" scoped>
.com-breadcrumb {
  .el-breadcrumb__item {
    ::v-deep .el-breadcrumb__inner.is-link {
      font-weight: normal;
    }

    &:last-child {
      ::v-deep.el-breadcrumb__inner {
        font-weight: bold;
      }
    }

    &:only-child {
      ::v-deep.el-breadcrumb__inner {
        font-weight: normal;
      }
    }
  }
}
</style>
