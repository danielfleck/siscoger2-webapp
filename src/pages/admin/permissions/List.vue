<template>
  <page :breadcrumbs="[
    { label: 'Lista', link: '/admin/permissoes' },
    ]">
    <q-btn data-cy="button" color="primary" icon="fa fa-plus" class="full-width" label="Inserir novo" to="/admin/permissoes/inserir"/>
    <Table
      data-cy="table"
      label="Lista permissões"
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
import { Columns, Permission } from 'src/types'

export default defineComponent({
  name: 'PermissionList',
  components: {
    Page,
    Table
  },
  setup (_, { root }) {
    const vars = reactive({
      data: [] as readonly Permission[],
      columns: [
        { name: 'permission', label: 'Permissão', field: 'permission', sortable: true },
        { name: 'actions', label: 'Ações', field: 'actions' }
      ] as Columns[]
    })

    const functions = {
      async loadData () {
        const { data } = await api.get('permissions')
        vars.data = Object.freeze(data as readonly Permission[])
      },
      onEdit (row: Permission) {
        return root.$router.push(`/admin/permissoes/editar/${String(row.id)}`)
      },
      onDelete (row: Permission) {
        root.$q.dialog(confirmMsg).onOk(async () => {
          const { ok } = await api.delete(`permissions/${String(row.id)}`)
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
