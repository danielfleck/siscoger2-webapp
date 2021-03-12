<template>
  <q-tab-panel name="resultado">
    <q-btn v-if="acl.hasAnyRoleOrPermission(procOutrosRules.toCreate)" data-cy="button" color="primary" icon="fa fa-plus" class="full-width" label="Inserir novo" to="/proc_outros/inserir"/>
    <Table
      data-cy="table"
      label="Resultado"
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
import { changeDate, getCityByCode, getOpmByCode } from 'src/filters'
import { api, acl, confirmMsg } from 'src/services'
import { ProcOutros, Columns } from 'src/types'
import { procoutroRules } from 'src/rules'

export default defineComponent({
  name: 'Resultado',
  components: { Table },
  setup (_, { root }) {
    const vars = reactive({
      data: [] as readonly ProcOutros[],
      columns: [
        { name: 'ref', label: 'Ref', field: 'sjd_ref', sortable: true },
        { name: 'ano', label: 'Ano', field: 'sjd_ref_ano', sortable: true },
        { name: 'cdopm', label: 'OPM Apuração', field: 'cdopm', format: (val) => getOpmByCode(val), sortable: true },
        { name: 'sintese_txt', label: 'Síntese do fato', field: 'sintese_txt', align: 'left', style: 'white-space: pre-wrap' },
        { name: 'motivo_abertura', label: 'Motivo principal', field: 'motivo_abertura', align: 'left', style: 'white-space: pre-wrap' },
        { name: 'cidade', label: 'Cidade*', field: 'id_municipio', format: (val) => getCityByCode(val), sortable: true },
        { name: 'abertura', label: 'Abertura', field: 'data', format: (val) => changeDate(val, 'pt-br'), sortable: true },
        { name: 'resultado', label: 'Resultado', field: 'resultado', sortable: true },
        { name: 'actions', label: 'Ações', field: 'actions' }
      ] as Columns[],
      procoutroRules
    })

    async function loadData () {
      const { data } = await api.get('procoutros/resultado')
      vars.data = Object.freeze(data as ProcOutros[])
    }

    function onEdit (row: ProcOutros) {
      void root.$router.push(`/proc_outros/editar/${row.id}`)
    }

    function onDelete (row: ProcOutros) {
      root.$q.dialog(confirmMsg).onOk(async () => {
        const { ok } = await api.delete(`procoutros/${row.id}`)
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
.q-table--no-wrap th, .q-table--no-wrap td {
  white-space: pre-wrap !important;
}
</style>
