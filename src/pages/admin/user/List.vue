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
      actionButtonCustom
      actionButtonToogle
      @delete="onDelete"
      @edit="onEdit"
      @toogle="onToogle"
    />
  </page>
</template>
<script lang="ts">
/* eslint-disable no-void */
import { defineComponent, reactive, toRefs } from '@vue/composition-api'

import Page from 'components/pages/Page.vue'
import Table from 'components/pages/Table.vue'
import { getOpmByCode } from 'src/filters'

import { api, confirm, confirmMsg, successNotify } from 'src/services'
import { Columns, User } from 'src/types'

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
        { name: 'name', label: 'Nome', field: 'name', sortable: true },
        { name: 'rg', label: 'RG', field: 'rg', sortable: true },
        { name: 'cpf', label: 'CPF', field: 'cpf', sortable: true },
        { name: 'class', label: 'Classe', field: 'class', sortable: true },
        { name: 'position', label: 'Posto/Grad.', field: 'position', sortable: true },
        { name: 'group', label: 'Quadro', field: 'group', sortable: true },
        { name: 'subgroup', label: 'Subquadro', field: 'subgroup', sortable: true },
        // { name: 'opm_code', label: 'opm_code', field: 'opm_code', sortable: true },
        { name: 'cdopm', label: 'OPM', field: 'cdopm', format: (val) => getOpmByCode(val), sortable: true },
        // { name: 'block', label: 'Bloqueado', field: 'block', format: (val) => val ? 'Sim' : 'Não', sortable: true },
        { name: 'email', label: 'email', field: 'email', sortable: true },
        { name: 'actions', label: 'Ações', field: 'actions' }
      ] as Columns[]
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
      },
      onToogle (user: User) {
        const message = user.block ? 'Tem certeza que quer desbloquear?' : 'Tem certeza que quer bloquear?'
        root.$q.dialog(confirm({ message, cancel: true, persistent: true })).onOk(async () => {
          const route = user.block ? 'unblock' : 'block'
          const { ok } = await api.post(`users/${route}`, { rg: user.rg }, { silent: true })
          if (ok) {
            const message = user.block ? 'Desbloqueado com sucesso' : 'Bloqueado com sucesso'
            successNotify(message)
            await this.loadData()
          }
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
