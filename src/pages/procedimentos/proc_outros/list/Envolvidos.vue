<template>
  <q-tab-panel name="envolvidos">
    <q-btn v-if="acl.hasAnyRoleOrPermission(procOutrosRules.toCreate)" data-cy="button" color="primary" icon="fa fa-plus" class="full-width" label="Inserir novo" to="/proc_outros/inserir"/>
    <Table
      data-cy="table"
      label="Envolvidos"
      :data="data"
      :columns="columns"
      actions
      :actionButtonDelete="acl.hasAnyRoleOrPermission(procOutrosRules.toDelete)"
      :actionButtonEdit="acl.hasAnyRoleOrPermission(procOutrosRules.toEdit)"
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
import { ProcOutros, Columns } from 'src/types'
import { getOpmByCode, changeDate } from 'src/filters'
import { procoutroRules } from 'src/rules'
import { procoutroRoute } from 'src/routenames'

export default defineComponent({
  name: 'Envolvidos',
  components: { Table },
  setup (_, { root }) {
    const vars = reactive({
      data: [] as readonly ProcOutros[],
      columns: [
        { name: 'ref', label: 'Ref', field: 'sjd_ref', sortable: true },
        { name: 'ano', label: 'Ano', field: 'sjd_ref_ano', sortable: true },
        { name: 'cdopm', label: 'OPM (abertura)', field: 'cdopm', format: (val) => getOpmByCode(val) },
        { name: 'data', label: 'Data Fato', field: 'data', format: (val) => changeDate(val, 'pt-br'), sortable: true },
        { name: 'abertura_data', label: 'Data Recebimento', field: 'abertura_data', format: (val) => changeDate(val, 'pt-br'), sortable: true },
        { name: 'digitador', label: 'Digitador', field: 'digitador', sortable: true },
        { name: 'envolvidos', label: 'Envolvidos*', field: 'envolvidos', sortable: true },
        { name: 'ofendidos', label: 'Ofendidos*', field: 'ofendidos', sortable: true },
        { name: 'actions', label: 'Ações', field: 'actions' }
      ] as Columns[],
      procoutroRules
    })

    async function loadData () {
      const { data } = await api.get(procoutroRoute)
      vars.data = Object.freeze(data as ProcOutros[])
    }

    function onEdit (row: ProcOutros) {
      void root.$router.push(`/${procoutroRoute}/editar/${row.id}`)
    }

    function onDelete (row: ProcOutros) {
      root.$q.dialog(confirmMsg).onOk(async () => {
        const { ok } = await api.delete(`${procoutroRoute}/${row.id}`)
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
