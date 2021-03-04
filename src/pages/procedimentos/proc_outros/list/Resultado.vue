<template>
  <q-tab-panel name="resultado">
    <q-btn data-cy="button" color="primary" icon="fa fa-plus" class="full-width" label="Inserir novo" to="/proc_outros/inserir"/>
    <Table
      data-cy="table"
      label="Resultado"
      :data="data"
      :columns="columns"
      actions
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
import { changeDate, getOpmByCode } from 'src/filters'
import { confirmMsg } from 'src/libs/dialog'
import { api } from 'src/services'
import { proc_outros, Columns } from 'src/types'

export default defineComponent({
  name: 'Resultado',
  components: { Table },
  setup (_, { root }) {
    const vars = reactive({
      data: [] as readonly proc_outros[],
      columns: [
        { name: 'ref', label: 'Ref', field: 'sjd_ref', sortable: true },
        { name: 'ano', label: 'Ano', field: 'sjd_ref_ano', sortable: true },
        { name: 'cdopm', label: 'OPM', field: 'cdopm', format: (val) => getOpmByCode(val), sortable: true },
        { name: 'abertura', label: 'Abertura', field: 'abertura_data', format: (val) => changeDate(val, 'pt-br'), sortable: true },
        { name: 'sindicado', label: 'Sindicado', field: 'name', sortable: true },
        { name: 'andamento', label: 'Andamento', field: 'andamento', sortable: true },
        { name: 'resultado', label: 'Resultado', field: 'resultado', sortable: true },
        { name: 'actions', label: 'Ações', field: 'actions' }
      ] as Columns[]
    })
    async function loadData () {
      const { data } = await api.get('proc_outros/resultado')
      vars.data = Object.freeze(data as proc_outros[])
    }

    function onEdit (row: proc_outros) {
      void root.$router.push(`/proc_outros/editar/${row.id}`)
    }

    function onDelete (row: proc_outros) {
      root.$q.dialog(confirmMsg).onOk(async () => {
        const { ok } = await api.delete(`proc_outros/${row.id}`)
        if (ok) void loadData()
      })
    }

    void loadData()

    return {
      ...toRefs(vars),
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
