<template>
  <q-tab-panel name="list">
    <q-btn v-if="acl.hasAnyRoleOrPermission(exclusaoRules.toCreate)" data-cy="button" color="primary" icon="fa fa-plus" class="full-width" label="Inserir novo" to="/exclusao/inserir"/>
    <Table
      data-cy="table"
      label="Lista"
      :data="data"
      :columns="columns"
      actions
      :actionButtonDelete="acl.hasAnyRoleOrPermission(exclusaoRules.toDelete)"
      :actionButtonEdit="acl.hasAnyRoleOrPermission(exclusaoRules.toEdit)"
      @delete="onDelete"
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
import { changeDate } from 'src/filters'
import { api, acl, confirmMsg } from 'src/services'
import { ExclusaoJudicial, Columns } from 'src/types'
import { getOpmByCode } from 'src/utils'
import { exclusaojudicialRules } from 'src/rules'
import { exclusaojudicialRoute } from 'src/routenames'

export default defineComponent({
  name: 'List',
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
      const { data } = await api.get(exclusaojudicialRoute)
      vars.data = Object.freeze(data as ExclusaoJudicial[])
    }

    function onEdit (row: ExclusaoJudicial) {
      void root.$router.push(`/${exclusaojudicialRoute}/editar/${row.id}`)
    }

    function onDelete (row: ExclusaoJudicial) {
      root.$q.dialog(confirmMsg).onOk(async () => {
        const { ok } = await api.delete(`${exclusaojudicialRoute}/${row.id}`)
        if (ok) void loadData()
      })
    }

    void loadData()

    return {
      ...toRefs(vars),
      acl,
      onEdit,
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
