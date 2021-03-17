<template>
  <q-tab-panel name="rel_situacao">
    <q-btn v-if="acl.hasAnyRoleOrPermission(cjRules.toCreate)" data-cy="button" color="primary" icon="fa fa-plus" class="full-width" label="Inserir novo" to="/cj/inserir"/>
    <Table
      data-cy="table"
      label="Rel. Situação"
      :data="data"
      :columns="columns"
      actions
      :actionButtonDelete="acl.hasAnyRoleOrPermission(cjRules.toDelete)"
      :actionButtonEdit="acl.hasAnyRoleOrPermission(cjRules.toEdit)"
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
import { api, acl, confirmMsg } from 'src/services'
import { Cj, Columns } from 'src/types'
import { getOpmByCode, changeDate } from 'src/filters'
import { cjRules } from 'src/rules'
import { cjRoute } from 'src/routenames'

export default defineComponent({
  name: 'RelSituacao',
  components: { Table },
  setup (_, { root }) {
    const vars = reactive({
      data: [] as readonly Cj[],
      columns: [
        { name: 'ref', label: 'Ref', field: 'sjd_ref', sortable: true },
        { name: 'ano', label: 'Ano', field: 'sjd_ref_ano', sortable: true },
        { name: 'cdopm', label: 'OPM', field: 'cdopm', format: (val) => getOpmByCode(val), sortable: true },
        { name: 'fato', label: 'Fato', field: 'fato_data', format: (val) => changeDate(val, 'pt-br'), sortable: true },
        { name: 'portaria', label: 'Portaria', field: 'portaria_data', format: (val) => changeDate(val, 'pt-br'), sortable: true },
        { name: 'prescricao_comissao', label: 'Prescrição', field: 'prescricao_comissao', sortable: true },
        { name: 'libelo_file', label: 'Libelo', field: 'libelo_file', format: (val) => val ? 'Sim' : 'Não', sortable: true },
        { name: 'parecer_file', label: 'Parecer', field: 'parecer_file', format: (val) => val ? 'Sim' : 'Não', sortable: true },
        { name: 'decisao_file', label: 'Decisão', field: 'decisao_file', format: (val) => val ? 'Sim' : 'Não', sortable: true },
        { name: 'rec_ato_file', label: 'Rec. Ato', field: 'rec_ato_file', format: (val) => val ? 'Sim' : 'Não', sortable: true },
        { name: 'actions', label: 'Ações', field: 'actions' }
      ] as Columns[],
      cjRules
    })

    async function loadData () {
      const { data } = await api.get(cjRoute)
      vars.data = Object.freeze(data as Cj[])
    }

    function onEdit (row: Cj) {
      void root.$router.push(`/${cjRoute}/editar/${row.id}`)
    }

    function onDelete (row: Cj) {
      root.$q.dialog(confirmMsg).onOk(async () => {
        const { ok } = await api.delete(`${cjRoute}/${row.id}`)
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
