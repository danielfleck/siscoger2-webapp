<template>
  <page :breadcrumbs="[
    { label: 'Lista', link: '/ROUTE' },
    ]">
    <q-btn data-cy="button" color="primary" icon="fa fa-plus" class="full-width" label="Inserir novo" to="/ROUTE/inserir"/>
    <Table
      data-cy="table"
      label="Lista ROUTE"
      :data="data"
      :columns="columns"
      actions
      @delete="onDelete"
      @edit="onEdit"
    />
  </page>
</template>
<script lang="ts">

interface Register {
  id?: number
  TEXT: string
  DATE: string
  SELECT: string
  TEXTAREA: string
}

import { defineComponent, reactive, toRefs } from '@vue/composition-api'

import Page from 'components/pages/Page.vue'
import Table from 'components/pages/Table.vue'

import { andamentoCogerSindicancia, andamentoSindicancia, motivoAberturaSindicancia, prorogacao, tipoBoletim } from 'src/config/selects'
import { api, confirmMsg, validate } from 'src/services'

const fields = [
]

export default defineComponent({
  name: 'Form',
  components: {
    Page,
    Table
  },
  setup (_, { root }) {
    const vars = reactive({
      data: [],
      columns: [
        { name: 'ref', label: 'Ref', field: 'sjd_ref', sortable: true },
        { name: 'ano', label: 'Ano', field: 'sjd_ref_ano', sortable: true },
        { name: 'actions', label: 'Ações', field: 'actions' }
      ]
    })

    const functions = {
      async loadData () {
          const data = await api.get('MODULE')
          vars.data = Object.freeze(data)
        },
        onEdit (row: any) {
          void root.$router.push(`/ROUTE/editar/${row.id}`)
        },
        onDelete (row: any) {
          root.$q.dialog(confirmMsg).onOk(async () => {
            const { ok } = await api.delete(`ROUTE/${row.id}`)
            if (ok) await this.loadData()
          })
        }
      },

    return {
      ...toRefs(vars),
      ...functions
    }
  }
})
</script>
