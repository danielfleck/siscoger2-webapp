<template>
  <page :breadcrumbs="[
    { label: 'Lista', link: '/papeis' },
    ]">
    <q-btn data-cy="button" color="primary" icon="fa fa-plus" class="full-width" label="Inserir novo" to="/admin/papeis/inserir"/>
    <Table
      data-cy="table"
      label="Lista papeis"
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
import { Columns, Role } from 'src/types'

export default defineComponent({
  name: 'RoleList',
  components: {
    Page,
    Table
  },
  setup (_, { root }) {
    const vars = reactive({
      data: [] as readonly Role[],
      columns: [
        { name: 'role', label: 'Papéis', field: 'role', sortable: true },
        { name: 'actions', label: 'Ações', field: 'actions' }
      ] as Columns[]
    })

    const functions = {
      async loadData () {
        const { data } = await api.get('roles')
        vars.data = Object.freeze(data as readonly Role[])
      },
      onEdit (row: Role) {
        void root.$router.push(`/admin/papeis/editar/${String(row.id)}`)
      },
      onDelete (row: Role) {
        root.$q.dialog(confirmMsg).onOk(async () => {
          const { ok } = await api.delete(`roles/${String(row.id)}`)
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
