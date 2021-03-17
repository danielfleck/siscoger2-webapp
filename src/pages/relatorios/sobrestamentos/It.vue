<template>
  <Table
    data-cy="table"
    label="Lista its sobrestados"
    :data="data"
    :columns="columns"
  />
</template>
<script lang="ts">
/* eslint-disable no-void */
import { defineComponent, reactive, toRefs } from '@vue/composition-api'

import Table from 'components/pages/Table.vue'
import { itRoute } from 'src/routenames'

import { api } from 'src/services'

export default defineComponent({
  name: 'itsPrioridadeList',
  components: {
    Table
  },
  setup () {
    const vars = reactive({
      data: [] as readonly string[],
      columns: [
        { name: 'cdopm', label: 'Opm apuração', field: 'cdopm', sortable: true },
        { name: 'quant', label: 'Quantidade', field: 'quant', sortable: true }
      ]
    })

    async function loadData () {
      const data = await api.get(`${itRoute}/sobrestados`)
      vars.data = Object.freeze(data as unknown as readonly string[])
    }

    void loadData()

    return {
      ...toRefs(vars)
    }
  }
})
</script>
