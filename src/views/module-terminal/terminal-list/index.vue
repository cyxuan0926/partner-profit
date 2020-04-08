<template>
  <div class="terminal block">
    <div class="terminal_search search">
      <base-filter
        v-model="filterParams"
        :filterItems="filterItems"
        :on-filter="onFilterForms"
      >
        <template #append>
          <base-excel-download
            path="/terminal/terminals/export"
            :params="filterParams"
          />

          <el-button type="primary" @click="onNew">新增终端</el-button>
        </template>
      </base-filter>
    </div>

    <div class="terminal_content content">
      <base-table :cols="tableCols" :data="terminals.content" stripe>
        <template #operation="{ row }">
          <el-button type="primary" @click="OnEdit(row)">编辑</el-button>
        </template>
      </base-table>
    </div>

    <base-pagination
      :total="terminals.totalCount"
      :page-size.sync="pagination.rows"
      :current-page.sync="pagination.page"
      @size-change="onSizeChange"
      @current-change="onPageChange"
    />
  </div>
</template>
<script>
import { pagination, prisonFilterCreator } from '@/common/mixins'

import routesPath from '@/router/routes-path'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'terminalList',

  mixins: [pagination, prisonFilterCreator],

  data() {
    const cols = [
      {
        label: '终端唯一标识',
        prop: 'uniqueId',
        showOverflowTooltip: true
      },
      {
        label: '终端服务开始日期',
        prop: 'starttime',
        minWidth: 90
      },
      {
        label: '终端服务结束日期',
        prop: 'endtime',
        minWidth: 90
      },
      {
        label: '合作商分成比例（%）',
        prop: 'dividendRate',
        minWidth: 105
      },
      {
        label: '所属监狱',
        prop: 'jailName'
      },
      {
        label: '合作商名称',
        prop: 'partnerName',
        showOverflowTooltip: true,
        minWidth: 115
      },
      {
        label: '录入时间',
        prop: 'createTime',
        minWidth: 100
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
        name: 'uniqueId',
        placeholder: '请输入终端唯一标识'
      }
    ]

    return {
      tableCols: cols,
      filterItems: items
    }
  },

  computed: {
    ...mapState('terminal', ['terminals'])
  },

  methods: {
    ...mapActions('terminal', ['getTerminals']),

    // 获取列表数据
    async gettingPageData() {
      this.$showLoading()

      const params = {
        ...this.pagination,
        ...this.filterParams
      }

      await this.getTerminals(params)
    },

    // 新增
    onNew() {
      this.$router.push(
        routesPath.COOPERTIVE_PARTNER_TERMINAL_INFORMATION_CREATE
      )
    },

    OnEdit(row) {
      const { id } = row
      this.$router.push(
        `${routesPath.COOPERTIVE_PARTNER_TERMINAL_INFORMATION}/${id}`
      )
    }
  },

  async created() {
    await this.gettingPageData()
  }
}
</script>

<style lang="scss" scoped>
.terminal {
  &_search {
    ::v-deep .el-date-editor {
      width: 16em;
    }
  }
}
</style>
