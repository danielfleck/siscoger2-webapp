<template>
  <Table
    data-cy="table"
    label="Lista sindicancias prioritários"
    :data="data"
    :columns="columns"
  />
</template>
<script lang="ts">
/* eslint-disable no-void */
import { defineComponent, reactive, toRefs } from '@vue/composition-api'

import Table from 'components/pages/Table.vue'
import { sindicanciaRoute } from 'src/routenames'

import { api } from 'src/services'

export default defineComponent({
  name: 'sindicanciasPrioridadeList',
  components: {
    Table
  },
  setup () {
    const vars = reactive({
      data: [] as readonly string[],
      columns: [
        { name: 'ref', label: 'Ref', field: 'sjd_ref', sortable: true },
        { name: 'ano', label: 'Ano', field: 'sjd_ref_ano', sortable: true },
        { name: 'fato_data', label: 'Data do fato', field: 'fato_data', sortable: true },
        { name: 'abertura_data', label: 'Data do abertura', field: 'abertura_data', sortable: true },
        { name: 'andamento', label: 'andamento', field: 'andamento', sortable: true },
        { name: 'andamentocoger', label: 'andamentocoger', field: 'andamentocoger', sortable: true }
      ]
    })

    async function loadData () {
      const data = await api.post(`${sindicanciaRoute}/search`, {
        prioridade: true
      }, { silent: true })
      vars.data = Object.freeze(data as unknown as readonly string[])
    }

    void loadData()

    return {
      ...toRefs(vars)
    }
  }
})
</script>
