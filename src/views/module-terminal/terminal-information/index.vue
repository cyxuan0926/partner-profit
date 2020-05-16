<template>
  <div class="terminal-information-container">
    <el-form ref="form" :model="formData" :rules="rules" label-width="160px">
      <el-form-item
        label="终端唯一标识"
        prop="uniqueId"
        :class="['is-required', { 'is-error': uniqueIdIsError }]"
      >
        <el-input
          v-model.trim="formData.uniqueId"
          placeholder="请填写终端唯一标识"
          clearable
          :disabled="status === 'edit'"
          @blur="onUniqueIdBlur"
        />
        <div v-if="uniqueIdIsError" class="el-form-item__error">
          {{ uniqueIdErrorMessage }}
        </div>
      </el-form-item>

      <el-form-item label="终端服务期限" required class="form-item__date">
        <el-col :span="11">
          <el-form-item prop="starttime">
            <el-date-picker
              v-model="formData.starttime"
              type="date"
              placeholder="请选择开始日期"
              :disabled="status === 'edit'"
              value-format="yyyy-MM-dd"
              :picker-options="starttimePickerOptions"
            />
          </el-form-item>
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-form-item prop="endtime">
            <el-date-picker
              v-model="formData.endtime"
              type="date"
              placeholder="请选择结束日期"
              :disabled="status === 'edit'"
              value-format="yyyy-MM-dd"
              :picker-options="endtimePickerOptions"
            />
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="合作商分成比例（%）" prop="dividendRate">
        <el-input
          v-model="formData.dividendRate"
          placeholder="请输入合作商分成比例"
          clearable
        />
      </el-form-item>

      <el-form-item label="所属监狱" prop="jailName">
        <el-select
          v-model="formData.jailName"
          placeholder="请选择监狱"
          :loading="prisonLoading"
          clearable
          filterable
        >
          <el-option
            v-for="jails in prisons"
            :key="jails.id"
            :value="jails.title"
            :label="jails.title"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="合作商名称" prop="partnerId">
        <el-select
          v-model="formData.partnerId"
          placeholder="请选择合作商"
          :loading="partnerNameLoading"
          clearable
          filterable
        >
          <el-option
            v-for="partner in noPagePartners"
            :key="partner.id"
            :value="partner.id"
            :label="partner.partnerName"
          />
        </el-select>
      </el-form-item>

      <el-form-item class="form-item__buttons">
        <el-button type="primary" @click="onCancel">取消</el-button>

        <el-button type="primary" @click="onOperate">{{
          status === 'add' ? '新增' : '修改'
        }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

import routesPath from '@/router/routes-path'

export default {
  name: 'terminalInformation',

  props: ['status', 'terminalId'],

  data() {
    const validateRate = (rule, value, callback) => {
      const pattern = /^(\d|[1-9]\d)(\.\d{1,2})?$/
      if (!value) {
        callback(new Error('请输入合作商分成比例'))
      } else if (!pattern.test(value) || parseFloat(value) === 0) {
        callback(new Error('请输入大于0小于100的数字，且最多只能保留两位小数'))
      } else {
        callback()
      }
    }

    return {
      formData: {
        uniqueId: '',
        starttime: '',
        endtime: '',
        dividendRate: '',
        jailName: '',
        partnerId: ''
      },

      rules: {
        jailName: [
          { required: true, message: '请选择监狱', trigger: 'change' }
        ],

        starttime: [
          { required: true, message: '请选择开始日期', trigger: 'change' }
        ],

        endtime: [
          { required: true, message: '请选择结束日期', trigger: 'change' }
        ],

        dividendRate: [
          { validator: validateRate, trigger: 'blur' },
          { required: true, trigger: 'blur' }
        ]
      },
      uniqueIdIsError: false,
      uniqueIdErrorMessage: '',
      prisonLoading: false,
      partnerNameLoading: false,
      starttimePickerOptions: {
        disabledDate: time => {
          return (
            this.formData.endtime &&
            new Date(this.formData.endtime) < time.getTime()
          )
        }
      },
      endtimePickerOptions: {
        disabledDate: time => {
          return (
            this.formData.starttime &&
            new Date(this.formData.starttime) > time.getTime()
          )
        }
      }
    }
  },

  computed: {
    ...mapState('global', ['prisons', 'noPagePartners']),

    ...mapState('terminal', ['terminalDetails', 'isOperateSuccess'])
  },

  methods: {
    ...mapActions('global', ['getPrisonAll', 'getNoPagePartners']),

    ...mapActions('terminal', [
      'getTerminalDetails',
      'createTerminal',
      'editTerminal'
    ]),

    onCancel() {
      this.$router.back()
    },

    onOperate() {
      const validateUniqueId = this.onUniqueIdBlur()

      this.$refs.form.validate(async valide => {
        if (valide && !validateUniqueId) {
          this.$showLoading()

          let code, params

          const { jailName, partnerId } = this.formData

          const choosePrison = this.prisons.filter(
            item => item.title === jailName
          )

          params = {
            ...this.formData,
            jailId: choosePrison[0]['id']
          }

          if (partnerId) {
            const choosePartner = this.noPagePartners.filter(
              item => item.id === partnerId
            )

            params = {
              ...params,
              partnerName: choosePartner[0]['partnerName']
            }
          } else {
            params['partnerName'] = ''
          }

          if (this.status === 'add') code = await this.createTerminal(params)

          if (this.status === 'edit') code = await this.editTerminal(params)

          this.onComplete({ code })
        }
      })
    },

    onComplete(params) {
      const { code } = params
      if (this.isOperateSuccess) {
        this.$router.push(routesPath.COOPERTIVE_PARTNER_TERMINAL_LIST)
      } else if (code === 213) {
        this.uniqueIdIsError = true

        this.uniqueIdErrorMessage = '该设备终端已存在'
      }
    },

    onUniqueIdBlur() {
      const inputValue = this.formData.uniqueId

      if (inputValue === '') {
        this.uniqueIdIsError = true

        this.uniqueIdErrorMessage = '请输入终端唯一标识'
      } else {
        this.uniqueIdIsError = false

        this.uniqueIdErrorMessage = ''
      }
      return this.uniqueIdIsError
    },

    async onCreated() {
      this.$showLoading()

      this.partnerNameLoading = true

      this.prisonLoading = true

      await Promise.all([this.getPrisonAll(), this.getNoPagePartners()])

      this.prisonLoading = false

      this.partnerNameLoading = false

      if (this.status === 'edit') {
        this.$showLoading()

        await this.getTerminalDetails(this.terminalId)

        this.formData = { ...this.terminalDetails }
      }
    }
  },

  created() {
    this.onCreated()
  }
}
</script>

<style lang="scss" scoped>
.terminal-information-container {
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

      .el-select {
        width: 100%;
      }

      &.form-item__date {
        margin-bottom: 0px;

        ::v-deep .el-date-editor {
          width: 100%;
        }

        .line {
          text-align: center;
          font-weight: bold;
          line-height: 40px;
        }
      }
    }
  }
}
</style>
