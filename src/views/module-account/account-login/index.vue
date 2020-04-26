<template>
  <div class="login">
    <div class="login-form">
      <div class="login-title">
        <img :src="loginTitle" alt="标题" />
      </div>
      <h2>用 户 登 陆</h2>
      <el-form
        ref="form"
        :model="formData"
        :rules="formRules"
        @keyup.enter.native="onLogin"
      >
        <el-form-item prop="username">
          <i class="el-icon-mobile-phone icon " />
          <el-input
            v-model.trim="formData.username"
            placeholder="请输入账号"
            size="default"
            clearable
          />
        </el-form-item>
        <el-form-item prop="password">
          <i class="el-icon-lock icon" />
          <el-input
            v-model.trim="formData.password"
            type="password"
            placeholder="请输入密码"
            size="default"
            clearable
          />
        </el-form-item>
        <el-button
          class="submit"
          type="primary"
          size="default"
          :loading="$loading"
          @click="onLogin"
        >
          登 录
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import routesPath from '@/router/routes-path'

import {
  saveToken,
  saveMenus,
  saveAuthorities,
  savePublicUserInfo
} from '@/utils/storage'

import loginTitle from '@/assets/img/login-title.png'

export default {
  name: 'AccountLogin',

  data() {
    return {
      formData: {
        username: '',
        password: ''
      },
      formRules: {
        username: [{ required: true, message: '请输入账号' }],
        password: [{ required: true, message: '请输入密码' }]
      },
      loginTitle
    }
  },

  computed: {
    ...mapState('account', [
      'menus',
      'authorities',
      'publicUserInfo',
      'token',
      'accountJurisdictionAreaInfo'
    ])
  },

  methods: {
    ...mapActions('account', ['login']),

    async onLogin() {
      try {
        await this.$refs.form.validate()

        this.$showLoading()

        const isLogin = await this.login(this.formData)

        if (isLogin) {
          saveToken(this.token)
          saveMenus(this.menus)
          saveAuthorities(this.authorities)
          savePublicUserInfo(this.publicUserInfo)

          const redirectPath = this.$route.query.redirect

          const nextPath =
            redirectPath && !redirectPath.includes('login')
              ? redirectPath
              : routesPath.HOME

          this.$router.replace(nextPath)
        }
      } catch (err) {
        Promise.reject(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  position: relative;
  background: url('../../../assets/img/login-bg.png') center no-repeat;
  background-size: cover;
  min-height: 100vh;

  &-title,
  &-form {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &-title {
    top: -20vh;

    img {
      width: 30vw;
    }
  }

  &-form {
    top: 56%;
    h2 {
      font-size: 24px;
      text-align: center;
      font-weight: 800;
      color: #4381e6;
    }

    .el-form {
      max-width: 366px;
      padding: 1rem 0px;

      .submit {
        width: 100%;
        margin-top: 0.1rem;
        box-shadow: 0px 1px 2px 0px rgba(8, 82, 176, 0.24),
          0px 10px 9px -6px rgba(8, 78, 174, 0.32);
      }

      ::v-deep .el-form-item {
        position: relative;
        margin-bottom: $base-space * 2;

        .icon {
          position: absolute;
          top: 50%;
          left: 12px;
          z-index: 1;
          font-size: 16px;
          transform: translateY(-50%);
          color: $--color-text-placeholder;
        }

        input {
          height: 42px;
          padding-left: 35px;
        }
      }
    }
  }
}
</style>
