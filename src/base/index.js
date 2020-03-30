import Vue from 'vue'

import table from './table'

import pagination from './pagination'

Vue.component('base-table', table)

Vue.component('base-pagination', { ...pagination, inheritAttrs: false })
