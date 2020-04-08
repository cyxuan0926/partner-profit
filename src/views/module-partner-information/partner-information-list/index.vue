<template>
  <div class="partner-information block">
    <div class="partner-information_search search">
      <base-filter
        v-model="filterParams"
        :filterItems="filterItems"
        :on-filter="onFilterForms"
      >
        <template #append>
          <base-excel-download
            :params="excelParams"
            path="/cooperative/export/partner"
          />

          <el-button type="primary" @click="onNew">新增合作商</el-button>
        </template>
      </base-filter>
    </div>

    <div class="partner-information_content content">
      <base-table :cols="tableCols" :data="coopertivePartners.content" stripe>
        <template #operation="{ row }">
          <el-button
            type="danger"
            :disabled="!!+row.flag"
            @click="onDelete(row)"
            >删除</el-button
          >
        </template>
      </base-table>
    </div>

    <base-pagination
      :total="coopertivePartners.totalCount"
      :page-size.sync="pagination.rows"
      :current-page.sync="pagination.page"
      @size-change="onSizeChange"
      @current-change="onPageChange"
    />
  </div>
</template>
<script>
import { pagination } from '@/common/mixins'

import routesPath from '@/router/routes-path'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'partnerInformationList',

  mixins: [pagination],

  data() {
    const cols = [
      {
        label: '合作商名称',
        prop: 'partnerName',
        minWidth: 115,
        showOverflowTooltip: true
      },
      {
        label: '手机号码',
        prop: 'partnerPhone'
      },
      {
        label: '合作商支付宝账号',
        prop: 'alipayAccount',
        minWidth: 110,
        showOverflowTooltip: true
      },
      {
        label: '合作商开户银行',
        prop: 'bank',
        minWidth: 90
      },
      {
        label: '合作商银行账号',
        prop: 'bankAccount',
        minWidth: 110,
        showOverflowTooltip: true
      },
      {
        label: '录入时间',
        prop: 'createTime',
        minWidth: 110
      },
      {
        label: '操作',
        slotName: 'operation'
      }
    ]

    const items = [
      {
        type: 'input',
        name: 'partnerName',
        placeholder: '请输入合作商名称'
      },
      {
        type: 'input',
        name: 'partnerPhone',
        placeholder: '请输入手机号码'
      },
      {
        name: 'time',
        type: 'daterange',
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        valueFormat: 'yyyy-MM-dd'
      }
    ]

    return {
      tableCols: cols,
      filterItems: items
    }
  },

  computed: {
    ...mapState('partner', ['coopertivePartners', 'isdeletPartnerSuccess']),

    excelParams() {
      const { time, partnerName, partnerPhone } = this.filterParams

      let startTime = '',
        endTime = ''

      if (time) {
        startTime = time[0]

        endTime = time[1]
      }

      return { partnerName, partnerPhone, startTime, endTime }
    }
  },

  methods: {
    ...mapActions('partner', ['getCooperativePartners', 'deletePartner']),

    // 获取列表数据
    async gettingPageData() {
      this.$showLoading()

      const { partnerName, partnerPhone, time } = this.filterParams

      let params = {
        ...this.pagination,
        partnerName,
        partnerPhone
      }
      if (time) {
        params = {
          ...params,
          startTime: time[0],
          endTime: time[1]
        }
      }

      await this.getCooperativePartners(params)

      const total = this.coopertivePartners['totalCount']

      this.$set(this.pageData, 'totalElements', total)
    },

    // 新增
    onNew() {
      this.$router.push(routesPath.COOPERTIVE_PARTNER_INFORMATION_CREATE)
    },

    // 删除
    onDelete(row) {
      const { partnerName } = row

      const text = `请问确认删除合作商“ ${partnerName} ”吗?`

      this.$confirm(text, '删除合作商', {
        type: 'warning',
        closeOnClickModal: false
      }).then(async () => {
        const { id } = row

        this.$showLoading()

        await this.deletePartner(id)

        if (this.isdeletPartnerSuccess) {
          this.calculatePagination()
          this.gettingPageData()
        }
      })
    }
  },

  async created() {
    await this.gettingPageData()
  }
}
</script>

<style lang="scss" scoped>
.partner-information {
  &_search {
    ::v-deep .el-date-editor {
      width: 16em;
    }
  }
}
</style>
