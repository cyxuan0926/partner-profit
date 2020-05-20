<template>
  <div class="passowrd-container">
    <el-form
      ref="passwordForm"
      :model="formData"
      :rules="rules"
      status-icon
      label-width="130px"
    >
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input
          v-model.trim="formData.oldPassword"
          type="password"
          placeholder="请输入旧密码"
          clearable
          show-password
        />
      </el-form-item>

      <el-form-item label="新密码" prop="newPassword">
        <el-input
          v-model="formData.newPassword"
          type="password"
          placeholder="请输入新密码"
          clearable
          show-password
        />
      </el-form-item>

      <el-form-item label="重复新密码" prop="checkNewPassword">
        <el-input
          v-model="formData.checkNewPassword"
          type="password"
          placeholder="请再次输入新密码"
          clearable
          show-password
        />
      </el-form-item>

      <el-form-item class="form-item__buttons">
        <el-button type="primary" @click="onSubmit">提交</el-button>

        <el-button type="primary" @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

import routesPath from '@/router/routes-path'

const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/

export default {
  data() {
    const validateNewPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else if (!pattern.test(value)) {
        callback(new Error('密码必须同时含有大小写字母，数字，且不小于8位'))
      } else {
        if (this.formData.checkNewPassword !== '') {
          this.$refs.passwordForm.validateField('checkNewPassword')
        }
        callback()
      }
    }

    const validateCheckNewPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'))
      } else if (!pattern.test(value)) {
        callback(new Error('密码必须同时含有大小写字母，数字，且不小于8位'))
      } else if (value !== this.formData.newPassword) {
        callback(new Error('两次密码输入不一致'))
      } else {
        callback()
      }
    }

    return {
      formData: {
        oldPassword: '',
        newPassword: '',
        checkNewPassword: ''
      },

      rules: {
        oldPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newPassword: [
          { validator: validateNewPassword, trigger: 'blur' },
          { required: true, trigger: 'blur' }
        ],

        checkNewPassword: [
          { validator: validateCheckNewPassword, trigger: 'blur' },
          { required: true, trigger: 'blur' }
        ]
      }
    }
  },

  computed: {
    ...mapState('account', ['modifyPasswordResult'])
  },

  methods: {
    ...mapActions('account', ['modifyMyPassword']),

    async onSubmit() {
      try {
        await this.$refs.passwordForm.validate()

        this.$showLoading()

        const { oldPassword, newPassword } = this.formData

        await this.modifyMyPassword({ oldPassword, newPassword })

        if (this.modifyPasswordResult) this.onConfirm()
      } catch (err) {
        Promise.reject(err)
      }
    },

    onReset() {
      this.$refs.passwordForm.clearValidate()
      for (let key of Object.keys(this.formData)) {
        this.$set(this.formData, key, '')
      }
    },

    onConfirm() {
      this.$confirm('密码修改成功', '提示', {
        confirmButtonText: '确定',
        type: 'success',
        showCancelButton: false,
        closeOnClickModal: false
      }).then(() => {
        setTimeout(() => {
          this.$store.dispatch('global/logout')

          this.$router.push(routesPath.ACCOUNT_LOGIN)
        }, 1000)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.passowrd-container {
  .el-form {
    width: 45%;
    margin: 0px auto;
    margin-top: 8%;

    &-item {
      &.form-item__buttons {
        text-align: right;

        .el-button {
          padding: 9px 25px;
        }
      }

      ::v-deep .el-form-item__label {
        font-size: 14px;
        font-weight: 500;
        line-height: 40px;
      }

      ::v-deep .el-input__inner {
        height: 40px;
        line-height: 40px;
      }
    }
  }
}
</style>
