<template>
  <page :breadcrumbs="[
    { label: 'Lista', link: '/usuarios' },
    ]">
    <q-btn data-cy="button" color="primary" icon="fa fa-plus" class="full-width" label="Inserir novo" to="/admin/usuarios/inserir"/>
    <Table
      data-cy="table"
      label="Lista usuarios"
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
import { User } from 'src/types/user'

export default defineComponent({
  name: 'UserList',
  components: {
    Page,
    Table
  },
  setup (_, { root }) {
    const vars = reactive({
      data: [] as readonly User[],
      columns: [
        { name: 'name', label: 'name', field: 'name', sortable: true },
        { name: 'rg', label: 'rg', field: 'rg', sortable: true },
        { name: 'cpf', label: 'cpf', field: 'cpf', sortable: true },
        { name: 'class', label: 'class', field: 'class', sortable: true },
        { name: 'position', label: 'position', field: 'position', sortable: true },
        { name: 'group', label: 'group', field: 'group', sortable: true },
        { name: 'subgroup', label: 'subgroup', field: 'subgroup', sortable: true },
        { name: 'opm_code', label: 'opm_code', field: 'opm_code', sortable: true },
        { name: 'cdopm', label: 'cdopm', field: 'cdopm', sortable: true },
        { name: 'block', label: 'block', field: 'block', sortable: true },
        { name: 'email', label: 'email', field: 'email', sortable: true },
        { name: 'actions', label: 'Ações', field: 'actions' }
      ]
    })

    const functions = {
      async loadData () {
        const { data } = await api.get('users')
        vars.data = Object.freeze(data as readonly User[])
      },
      onEdit (row: User) {
        return root.$router.push(`/admin/usuarios/editar/${String(row.id)}`)
      },
      onDelete (row: User) {
        root.$q.dialog(confirmMsg).onOk(async () => {
          const { ok } = await api.delete(`users/${String(row.id)}`)
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
