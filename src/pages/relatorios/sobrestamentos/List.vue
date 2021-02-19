<template>
  <page :breadcrumbs="[
    { label: 'Lista', link: '/sobrestamentos' },
    ]">
    <q-btn data-cy="button" color="primary" icon="fa fa-plus" class="full-width" label="Inserir novo" to="/sobrestamentos/inserir"/>
    <Table
      data-cy="table"
      label="Lista sobrestamentos"
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
import { Sobrestamento } from 'src/types/sobrestamento'

export default defineComponent({
  name: 'MODULEList',
  components: {
    Page,
    Table
  },
  setup (_, { root }) {
    const vars = reactive({
      data: [] as readonly Sobrestamento[],
      columns: [
        { name: 'rg', label: 'rg', field: 'rg', sortable: true },
        { name: 'publicacao_inicio', label: 'publicacao_inicio', field: 'publicacao_inicio', sortable: true },
        { name: 'inicio_data', label: 'inicio_data', field: 'inicio_data', sortable: true },
        { name: 'publicacao_termino', label: 'publicacao_termino', field: 'publicacao_termino', sortable: true },
        { name: 'termino_data', label: 'termino_data', field: 'termino_data', sortable: true },
        { name: 'motivo', label: 'motivo', field: 'motivo', sortable: true },
        { name: 'actions', label: 'Ações', field: 'actions' }
      ]
    })

    const functions = {
      async loadData () {
        const data = await api.get('MODULE')
        vars.data = Object.freeze(data as unknown as readonly Sobrestamento[])
      },
      onEdit (row: Sobrestamento) {
        return root.$router.push(`/sobrestamentos/editar/${String(row.id)}`)
      },
      onDelete (row: Sobrestamento) {
        root.$q.dialog(confirmMsg).onOk(async () => {
          const { ok } = await api.delete(`sobrestamentos/${String(row.id)}`)
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
