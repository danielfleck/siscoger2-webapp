<template>
  <under-construction/>
  <!-- <page :breadcrumbs="[
    { label: 'Lista', link: '/pad' },
    ]">
    <q-btn data-cy="button" color="primary" icon="fa fa-plus" class="full-width" label="Inserir novo" to="/pad/inserir"/>
    <Table
      data-cy="table"
      label="Lista pad"
      :data="data"
      :columns="columns"
      actions
      @delete="onDelete"
      @edit="onEdit"
    />
  </page> -->
</template>
<script lang="ts">
/* eslint-disable no-void */
import { defineComponent, reactive, toRefs } from '@vue/composition-api'

import Page from 'components/pages/Page.vue'
import Table from 'components/pages/Table.vue'
import UnderConstruction from 'src/components/pages/UnderConstruction.vue'

import { api, confirmMsg } from 'src/services'
import { Columns, Envolvido } from 'src/types'

export default defineComponent({
  name: 'MODULEList',
  components: {
    Page,
    Table,
    UnderConstruction
  },
  setup (_, { root }) {
    const vars = reactive({
      data: [] as readonly Envolvido[],
      columns: [
        { name: 'rg_substituto', label: 'rg_substituto', field: 'rg_substituto', sortable: true },
        { name: 'nome', label: 'nome', field: 'nome', sortable: true },
        { name: 'rg', label: 'rg', field: 'rg', sortable: true },
        { name: 'situacao', label: 'situacao', field: 'situacao', sortable: true },
        { name: 'cargo', label: 'cargo', field: 'cargo', sortable: true },
        { name: 'resultado', label: 'resultado', field: 'resultado', sortable: true },
        { name: 'actions', label: 'Ações', field: 'actions' }
      ] as Columns[]
    })

    const functions = {
      async loadData () {
        const data = await api.get('MODULE')
        vars.data = Object.freeze(data as unknown as readonly Envolvido[])
      },
      onEdit (row: Envolvido) {
        return root.$router.push(`/pad/editar/${String(row.id)}`)
      },
      onDelete (row: Envolvido) {
        root.$q.dialog(confirmMsg).onOk(async () => {
          const { ok } = await api.delete(`pad/${String(row.id)}`)
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
