<template>
  <div class="partner-information-container">
    <el-form ref="form" :model="formData" :rules="rules" label-width="140px">
      <el-form-item label="合作商名称" prop="partnerName">
        <el-input
          v-model.trim="formData.partnerName"
          placeholder="请输入合作商名称"
          clearable
        />
      </el-form-item>

      <el-form-item
        label="手机号码"
        prop="partnerPhone"
        :class="['is-required', { 'is-error': phoneIsError }]"
      >
        <el-input
          v-model.trim="formData.partnerPhone"
          placeholder="请输入手机号码"
          clearable
          @blur="onPhoneBlur"
        />

        <div v-if="phoneIsError" class="el-form-item__error">
          {{ phoneErrorMessage }}
        </div>
      </el-form-item>

      <el-form-item
        label="合作商支付宝账号"
        prop="alipayAccount"
        :class="['is-required', { 'is-error': aliAccountIsError }]"
      >
        <el-input
          v-model="formData.alipayAccount"
          placeholder="请输入合作商支付宝账号"
          clearable
          @blur="onAlipayAccountBlur"
        />

        <div v-if="aliAccountIsError" class="el-form-item__error">
          {{ aliAccountErrorMessage }}
        </div>
      </el-form-item>

      <el-form-item label="合作商开户银行" prop="bank">
        <el-input
          v-model="formData.bank"
          placeholder="请输入合作商开户银行"
          clearable
        />
      </el-form-item>

      <el-form-item label="合作商银行账号" prop="bankAccount">
        <el-input
          v-model="formData.bankAccount"
          placeholder="请输入合作商银行账号"
          clearable
        />
      </el-form-item>

      <el-form-item class="form-item__buttons">
        <el-button type="primary" @click="onCancel">取消</el-button>

        <el-button type="primary" @click="onAdd">新增</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

import routesPath from '@/router/routes-path'

export default {
  name: 'partnerInformationCreate',

  data() {
    return {
      formData: {
        partnerName: '',
        partnerPhone: '',
        alipayAccount: '',
        bank: '',
        bankAccount: ''
      },

      rules: {
        partnerName: [
          { required: true, trigger: 'blur', message: '请输入合作商名称' }
        ]
      },
      phoneIsError: false,
      phoneErrorMessage: '',
      aliAccountIsError: false,
      aliAccountErrorMessage: ''
    }
  },

  computed: {
    ...mapState('partner', ['isCreatePartnerSuccess'])
  },

  methods: {
    ...mapActions('partner', ['createPartner']),

    onCancel() {
      this.$router.back()
    },

    onAdd() {
      const validatePhone = this.onPhoneBlur()

      const validateAlipayAccount = this.onAlipayAccountBlur()

      this.$refs.form.validate(async valid => {
        if (valid && !validatePhone && !validateAlipayAccount) {
          this.$showLoading()

          const code = await this.createPartner(this.formData)

          if (this.isCreatePartnerSuccess)
            this.$router.push(routesPath.COOPERTIVE_PARTNER_INFORMATION_LIST)
          else if (code === 210 || code === 212) {
            this.aliAccountIsError = false

            this.aliAccountErrorMessage = ''

            this.phoneIsError = true

            if (code === 212) this.phoneErrorMessage = '手机号码重复'

            if (code === 210) this.phoneErrorMessage = '请输入正确的手机号码'
          } else if (code === 211) {
            this.phoneIsError = false

            this.phoneErrorMessage = ''

            this.aliAccountIsError = true

            this.aliAccountErrorMessage = '请输入正确的支付宝账号'
          }
        }
      })
    },

    onPhoneBlur() {
      const inputValue = this.formData.partnerPhone

      const pattern = /^[1][3456789][0-9]{9}$/

      if (inputValue === '') {
        this.phoneErrorMessage = '请输入手机号码'

        this.phoneIsError = true
      } else if (!pattern.test(inputValue)) {
        this.phoneErrorMessage = '手机格式有误'

        this.phoneIsError = true
      } else {
        this.phoneIsError = false

        this.phoneErrorMessage = ''
      }

      return this.phoneIsError
    },

    onAlipayAccountBlur() {
      const inputValue = this.formData.alipayAccount

      if (inputValue === '') {
        this.aliAccountErrorMessage = '请输入支付宝账号'

        this.aliAccountIsError = true
      } else {
        this.aliAccountErrorMessage = ''

        this.aliAccountIsError = false
      }

      return this.aliAccountIsError
    }
  }
}
</script>

<style lang="scss" scoped>
.partner-information-container {
  .el-form {
    width: 55%;
    margin: 0px 20%;
    margin-top: 4%;

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
