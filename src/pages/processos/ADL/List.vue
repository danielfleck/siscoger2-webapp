<template>
  <page :breadcrumbs="[
    { label: 'Lista', link: '/adl' },
    ]">
    <q-btn data-cy="button" color="primary" icon="fa fa-plus" class="full-width" label="Inserir novo" to="/adl/inserir"/>
    <Table
      data-cy="table"
      label="Lista ADL"
      :data="data"
      :columns="columns"
      actions
      @delete="onDelete"
      @edit="onEdit"
    />
  </page>
</template>
<script lang="ts">
/* eslint-disable no-void */
import { defineComponent, reactive, toRefs } from '@vue/composition-api'

import Page from 'components/pages/Page.vue'
import Table from 'components/pages/Table.vue'

import { api, confirmMsg } from 'src/services'
import { Adl, Columns } from 'src/types'

export default defineComponent({
  name: 'MODULEList',
  components: {
    Page,
    Table
  },
  setup (_, { root }) {
    const vars = reactive({
      data: [] as readonly Adl[],
      columns: [
        { name: 'ref', label: 'Ref', field: 'sjd_ref', sortable: true },
        { name: 'ano', label: 'Ano', field: 'sjd_ref_ano', sortable: true },
        { name: 'id_andamento', label: 'id_andamento', field: 'id_andamento', sortable: true },
        { name: 'id_andamentocoger', label: 'id_andamentocoger', field: 'id_andamentocoger', sortable: true },
        { name: 'id_motivoconselho', label: 'id_motivoconselho', field: 'id_motivoconselho', sortable: true },
        { name: 'id_decorrenciaconselho', label: 'id_decorrenciaconselho', field: 'id_decorrenciaconselho', sortable: true },
        { name: 'id_situacaoconselho', label: 'id_situacaoconselho', field: 'id_situacaoconselho', sortable: true },
        { name: 'outromotivo', label: 'outromotivo', field: 'outromotivo', sortable: true },
        { name: 'cdopm', label: 'cdopm', field: 'cdopm', sortable: true },
        { name: 'fato_data', label: 'fato_data', field: 'fato_data', sortable: true },
        { name: 'abertura_data', label: 'abertura_data', field: 'abertura_data', sortable: true },
        { name: 'actions', label: 'Ações', field: 'actions' }
      ] as Columns[]
    })

    const functions = {
      async loadData () {
        const { data } = await api.get('adls')
        vars.data = Object.freeze(data as readonly Adl[])
      },
      onEdit (row: Adl) {
        return root.$router.push(`/adl/editar/${String(row.id)}`)
      },
      onDelete (row: Adl) {
        root.$q.dialog(confirmMsg).onOk(async () => {
          const { ok } = await api.delete(`adls/${String(row.id)}`)
          if (ok) await this.loadData()
        })
      }
    }

    void functions.loadData()

    return {
      ...toRefs(vars),
      ...functions
    }
  }
})
</script>
