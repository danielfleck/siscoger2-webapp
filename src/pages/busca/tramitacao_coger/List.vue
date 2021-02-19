<template>
  <page :breadcrumbs="[
    { label: 'Lista', link: '/busca_coger' },
    ]">
    <q-btn data-cy="button" color="primary" icon="fa fa-plus" class="full-width" label="Inserir novo" to="/busca_coger/inserir"/>
    <Table
      data-cy="table"
      label="Lista busca_coger"
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

export default defineComponent({
  name: 'MODULEList',
  components: {
    Page,
    Table
  },
  setup (_, { root }) {
    const vars = reactive({
      data: [] as readonly string[],
      columns: [
        // { name: 'ref', label: 'Ref', field: 'sjd_ref', sortable: true },
        // { name: 'ano', label: 'Ano', field: 'sjd_ref_ano', sortable: true },
        { name: 'actions', label: 'Ações', field: 'actions' }
      ]
    })

    const functions = {
      async loadData () {
        const data = await api.get('MODULE')
        vars.data = Object.freeze(data as unknown as readonly string[])
      },
      onEdit (row: { id: number }) {
        return root.$router.push(`/busca_coger/editar/${String(row.id)}`)
      },
      onDelete (row: { id: number }) {
        root.$q.dialog(confirmMsg).onOk(async () => {
          const { ok } = await api.delete(`busca_coger/${String(row.id)}`)
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
