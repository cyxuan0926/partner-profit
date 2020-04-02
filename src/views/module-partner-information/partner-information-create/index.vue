<template>
  <div class="partner-information-container">
    <el-form ref="form" :model="formData" :rules="rules" label-width="160px">
      <el-form-item label="合作商名称" prop="name">
        <el-input
          v-model.trim="formData.name"
          placeholder="请输入合作商名称"
          clearable
        />
      </el-form-item>

      <el-form-item
        label="手机号码"
        prop="phone"
        :class="['is-required', { 'is-error': phoneIsError }]"
      >
        <el-input
          v-model.trim="formData.phone"
          placeholder="请输入手机号码"
          clearable
          @blur="onPhoneBlur"
        />

        <div v-if="phoneIsError" class="el-form-item__error">
          {{ phoneErrorMessage }}
        </div>
      </el-form-item>

      <el-form-item label="合作商分成比例（%）" prop="rate">
        <el-input
          v-model="formData.rate"
          placeholder="请输入合作商分成比例"
          clearable
        />
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
          @blur="onAliAccountBlur"
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
// import { mapState, mapActions } from 'vuex'

export default {
  name: 'partnerInformationCreate',

  data() {
    const validateRate = (rule, value, callback) => {
      const pattern = /^(\d|[1-9]\d)(\.\d{1,2})?$/
      if (value === '') {
        callback(new Error('请输入合作商分成比例'))
      } else if (!pattern.test(value) || parseFloat(value) === 0) {
        callback(new Error('请输入大于0小于100的数字，且最多只能保留两位小数'))
      } else {
        callback()
      }
    }

    return {
      formData: {
        name: '',
        phone: '',
        rate: '',
        alipayAccount: '',
        bank: '',
        bankAccount: ''
      },

      rules: {
        name: [
          { required: true, trigger: 'blur', message: '请输入合作商名称' }
        ],
        rate: [
          { validator: validateRate, trigger: 'blur' },
          { required: true, trigger: 'blur' }
        ]
      },
      phoneIsError: false,
      phoneErrorMessage: '',
      aliAccountIsError: false,
      aliAccountErrorMessage: ''
    }
  },

  computed: {
    // ...mapState('account', ['modifyPasswordResult'])
  },

  methods: {
    // ...mapActions('account', ['modifyMyPassword']),

    onCancel() {
      this.$router.back()
    },

    onAdd() {},

    onPhoneBlur(e) {
      const inputValue = e.target.value

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
    },

    onAliAccountBlur(e) {
      const inputValue = e.target.value

      if (inputValue === '') {
        this.aliAccountErrorMessage = '请输入支付宝账号'

        this.aliAccountIsError = true
      } else {
        this.aliAccountErrorMessage = ''

        this.aliAccountIsError = false
      }
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
