export default {
  methods: {
    async createPrisonFilter() {
      const prisonSearchItem = {
        name: 'jailId',
        type: 'select',
        loading: true,
        labelKey: 'title',
        valueKey: 'id',
        defaultValue: null,
        options: [],
        attrs: {
          placeholder: '请选择监狱名称'
        }
      }

      this.filterItems = [prisonSearchItem, ...this.filterItems]

      if (this.$store.state.global.prisons.length === 0) {
        this.$set(prisonSearchItem, 'loading', true)

        await this.$store.dispatch('global/getPrisonAll')

        this.$set(prisonSearchItem, 'loading', false)
      }

      const data = this.$store.state.global.prisons

      this.$set(prisonSearchItem, 'options', data || [])

      if (prisonSearchItem['loading'])
        this.$set(prisonSearchItem, 'loading', false)
    }
  },

  created() {
    this.createPrisonFilter()
  }
}
