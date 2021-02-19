<template>
  <page :breadcrumbs="[
    { label: 'Lista', link: '/ofendidos' },
    ]">
    <q-btn data-cy="button" color="primary" icon="fa fa-plus" class="full-width" label="Inserir novo" to="/ofendidos/inserir"/>
    <Table
      data-cy="table"
      label="Lista ofendidos"
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
import { Ofendido } from 'src/types/ofendido'

export default defineComponent({
  name: 'MODULEList',
  components: {
    Page,
    Table
  },
  setup (_, { root }) {
    const vars = reactive({
      data: [] as readonly Ofendido[],
      columns: [
        { name: 'nome', label: 'nome', field: 'nome', sortable: true },
        { name: 'rg', label: 'rg', field: 'rg', sortable: true },
        { name: 'situacao', label: 'situacao', field: 'situacao', sortable: true },
        { name: 'resultado', label: 'resultado', field: 'resultado', sortable: true },
        { name: 'sexo', label: 'sexo', field: 'sexo', sortable: true },
        { name: 'idade', label: 'idade', field: 'idade', sortable: true },
        { name: 'fone', label: 'fone', field: 'fone', sortable: true },
        { name: 'email', label: 'email', field: 'email', sortable: true },
        { name: 'actions', label: 'Ações', field: 'actions' }
      ]
    })

    const functions = {
      async loadData () {
        const data = await api.get('MODULE')
        vars.data = Object.freeze(data as unknown as readonly Ofendido[])
      },
      onEdit (row: Ofendido) {
        return root.$router.push(`/ofendidos/editar/${String(row.id)}`)
      },
      onDelete (row: Ofendido) {
        root.$q.dialog(confirmMsg).onOk(async () => {
          const { ok } = await api.delete(`ofendidos/${String(row.id)}`)
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
