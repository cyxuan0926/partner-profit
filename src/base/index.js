import Vue from 'vue'

import table from './table'

import pagination from './pagination'

import excelDownload from './excel-download'

Vue.component('base-table', table)

Vue.component('base-pagination', { ...pagination, inheritAttrs: false })

Vue.component('base-excel-download', excelDownload)
