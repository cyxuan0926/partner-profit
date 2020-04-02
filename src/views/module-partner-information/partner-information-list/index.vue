<template>
  <div class="partner-information block">
    <div class="partner-information_search search">
      <base-filter
        v-model="filterParams"
        :filterItems="filterItems"
        :on-filter="onFilterForms"
      >
        <template #append>
          <base-excel-download path="/" :params="excelParams" />

          <el-button type="primary" @click="onNew">新增合作商</el-button>
        </template>
      </base-filter>
    </div>

    <div class="partner-information_content content">
      <base-table :cols="tableCols" :data="[]" stripe>
        <template #operation="{ row }">
          <el-button type="danger" @click="onDelete(row)" disabled
            >删除</el-button
          >
        </template>
      </base-table>
    </div>

    <base-pagination
      :total="2"
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

export default {
  name: 'partnerInformationList',

  mixins: [pagination],

  data() {
    const cols = [
      {
        label: '合作商名称',
        prop: ''
      },
      {
        label: '手机号码',
        prop: ''
      },
      {
        label: '合作商分成比例（%）',
        prop: '',
        minWidth: 95
      },
      {
        label: '合作商支付宝账号',
        prop: ''
      },
      {
        label: '合作商开户银行',
        prop: ''
      },
      {
        label: '合作商银行账号',
        prop: ''
      },
      {
        label: '录入时间',
        prop: ''
      },
      {
        label: '操作',
        slotName: 'operation',
        minWidth: 60
      }
    ]

    const items = [
      {
        type: 'input',
        name: 'name',
        placeholder: '请输入合作商名称'
      },
      {
        type: 'input',
        name: 'phone',
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
    excelParams() {
      const { time, name, phone } = this.filterParams

      let start = '',
        end = ''

      if (time) {
        start = time[0]

        end = time[1]
      }

      return { name, phone, start, end }
    }
  },

  methods: {
    // 获取列表数据
    async gettingPageData() {
      // this.$showLoading()

      const { name, phone, time } = this.filterParams

      let params = {
        ...this.pagination,
        name,
        phone
      }
      if (time) {
        params = {
          ...params,
          start: time[0],
          end: time[1]
        }
      }

      return params
    },

    // 新增
    onNew() {
      this.$router.push(routesPath.COOPERTIVE_PARTNER_INFORMATION_CREATE)
    },

    // 删除
    onDelete(row) {
      const { name } = row

      const text = `请问确认删除合作商“ ${name} ”吗?`

      this.$confirm(text, '删除合作商', {
        type: 'warning',
        closeOnClickModal: false
      }).then(() => {})
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
