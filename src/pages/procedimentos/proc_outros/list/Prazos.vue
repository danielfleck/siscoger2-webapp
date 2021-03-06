<template>
  <q-tab-panel name="prazos">
    <q-banner class="bg-green text-white">
      Tempo de andamento dos proc_outros.
      <template v-slot:action>
        Data de referência: HOJE ({{ today }})
      </template>
    </q-banner>
    <q-btn v-if="acl.hasAnyRoleOrPermission(procOutrosRules.toCreate)" data-cy="button" color="primary" icon="fa fa-plus" class="full-width" label="Inserir novo" to="/proc_outros/inserir"/>
    <Table
      data-cy="table"
      label="Prazos"
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
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-void */
import { defineComponent, reactive, toRefs } from '@vue/composition-api'

import Table from 'components/pages/Table.vue'
import { changeDate, getCurrentDate, getOpmByCode } from 'src/filters'
import { api, acl, confirmMsg } from 'src/services'
import { ProcOutros, Columns } from 'src/types'
import { procoutroRules } from 'src/rules'
import { procoutroRoute } from 'src/routenames'

export default defineComponent({
  name: 'Prazos',
  components: { Table },
  setup (_, { root }) {
    const vars = reactive({
      today: getCurrentDate('pt-br'),
      data: [] as readonly ProcOutros[],
      columns: [
        { name: 'ref', label: 'Ref', field: 'sjd_ref', sortable: true },
        { name: 'ano', label: 'Ano', field: 'sjd_ref_ano', sortable: true },
        { name: 'cdopm', label: 'OPM (abertura)', field: 'cdopm', format: (val) => getOpmByCode(val) },
        { name: 'cdopm_apuracao', label: 'OPM (apuração)', field: 'cdopm_apuracao', format: (val) => getOpmByCode(val) },
        { name: 'data', label: 'Data Fato', field: 'data', format: (val) => changeDate(val, 'pt-br'), sortable: true },
        { name: 'abertura_data', label: 'Data Recebimento', field: 'abertura_data', format: (val) => changeDate(val, 'pt-br'), sortable: true },
        { name: 'limite_data', label: 'Data limite', field: 'limite_data', format: (val) => changeDate(val, 'pt-br'), sortable: true },
        { name: 'andamento', label: 'Andamento', field: 'andamento', sortable: true },
        { name: 'andamentocoger', label: 'And. COGER', field: 'andamentocoger', sortable: true },
        { name: 'diasuteis_sobrestado', label: 'Dias úteis totais*', field: 'diasuteis_sobrestado', format: (val) => val || 'Não há', sortable: true },
        { name: 'diasuteis_sobrestado', label: 'Dias totais*', field: 'diasuteis_sobrestado', format: (val) => val || 'Não há', sortable: true },
        { name: 'diasuteis_sobrestado', label: 'Dias úteis decorridos*', field: 'diasuteis_sobrestado', format: (val) => val || 'Não há', sortable: true },
        { name: 'diasuteis_sobrestado', label: 'Dias decorridos*', field: 'diasuteis_sobrestado', format: (val) => val || 'Não há', sortable: true },
        { name: 'diasuteis_sobrestado', label: 'Dias úteis faltando*', field: 'diasuteis_sobrestado', format: (val) => val || 'Não há', sortable: true },
        { name: 'diasuteis_sobrestado', label: 'Dias faltando*', field: 'diasuteis_sobrestado', format: (val) => val || 'Não há', sortable: true },
        { name: 'actions', label: 'Ações', field: 'actions' }
      ] as Columns[],
      procoutroRules
    })
    async function loadData () {
      const { data } = await api.get(`${procoutroRoute}/andamento`)
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
