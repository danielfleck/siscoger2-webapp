<template>
  <q-tab-panel name="apagados">
    <q-btn v-if="acl.hasAnyRoleOrPermission(exclusaoRules.toCreate)" data-cy="button" color="primary" icon="fa fa-plus" class="full-width" label="Inserir novo" to="/exclusao/inserir"/>
    <Table
      data-cy="table"
      label="Apagados"
      :data="data"
      :columns="columns"
      actions
      :actionButtonRestore="acl.hasAnyRoleOrPermission(exclusaoRules.toRestore)"
      :actionButtonDelete="acl.hasAnyRoleOrPermission(exclusaoRules.toForceDelete)"
      :actionButtonEdit="acl.hasAnyRoleOrPermission(exclusaoRules.toEdit)"
      @delete="onDelete"
      @restore="onRestore"
      @edit="onEdit"
    />
  </q-tab-panel>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-void */
import { defineComponent, reactive, toRefs } from '@vue/composition-api'
import Table from 'components/pages/Table.vue'
import { changeDate, getOpmByCode } from 'src/filters'
import { api, acl, confirm } from 'src/services'
import { ExclusaoJudicial, Columns } from 'src/types'
import { exclusaojudicialRules } from 'src/rules'

export default defineComponent({
  name: 'Apagados',
  components: { Table },
  setup (_, { root }) {
    const vars = reactive({
      data: [] as readonly ExclusaoJudicial[],
      columns: [
        { name: 'rg', label: 'Rg', field: 'rg', sortable: true },
        { name: 'nome', label: 'Nome', field: 'nome', sortable: true },
        { name: 'cdopm_quandoexcluido', label: 'OPM Exclusão', field: 'cdopm_quandoexcluido', format: (val) => getOpmByCode(val) },
        { name: 'data', label: 'Data sentença', field: 'data', format: (val) => changeDate(val, 'pt-br'), sortable: true },
        { name: 'exclusao_data', label: 'Data exclusão', field: 'exclusao_data', format: (val) => changeDate(val, 'pt-br'), sortable: true },
        { name: 'portaria_numero', label: 'Portaria CG', field: 'portaria_numero', sortable: true },
        { name: 'bg_numero', label: 'Boletim Geral', field: 'bg_numero', sortable: true },
        { name: 'actions', label: 'Ações', field: 'actions' }
      ] as Columns[],
      exclusaojudicialRules
    })

    async function loadData () {
      const { data } = await api.get('exclusoesjudicias/deleted')
      vars.data = Object.freeze(data as ExclusaoJudicial[])
    }

    function onEdit (row: ExclusaoJudicial) {
      void root.$router.push(`/exclusao/editar/${row.id}`)
    }

    function onRestore (row: ExclusaoJudicial) {
      root.$q.dialog(confirm({ message: 'Tem certeza que deseja restaurar?' })).onOk(async () => {
        const { ok } = await api.put(`exclusoesjudicias/${row.id}/restore`, {})
        if (ok) void loadData()
      })
    }

    function onDelete (row: ExclusaoJudicial) {
      root.$q.dialog(confirm({ message: 'Tem certeza? essa ação é irreversível' })).onOk(async () => {
        const { ok } = await api.delete(`exclusoesjudicias/${row.id}/force`)
        if (ok) void loadData()
      })
    }

    void loadData()

    return {
      ...toRefs(vars),
      acl,
      onEdit,
      onRestore,
      onDelete
    }
  }
})
</script>

<style scoped>
.column-text {
  max-width: 500px;
  white-space: pre-wrap;
}
</style>
