<template>
  <q-tab-panel name="andamento">
    <q-btn data-cy="button" color="primary" icon="fa fa-plus" class="full-width" label="Inserir novo" to="/proc_outros/inserir"/>
      <Table
      data-cy="table"
      label="Andamento"
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
import { ProcOutros, Columns } from 'src/types'

export default defineComponent({
  name: 'Andamento',
  components: { Table },
  setup (_, { root }) {
    const vars = reactive({
      data: [] as readonly ProcOutros[],
      columns: [
        { name: 'ref', label: 'Ref', field: 'sjd_ref', sortable: true },
        { name: 'ano', label: 'Ano', field: 'sjd_ref_ano', sortable: true },
        { name: 'cdopm', label: 'OPM', field: 'cdopm', format: (val) => getOpmByCode(val), sortable: true },
        { name: 'data', label: 'Data Fato', field: 'data', format: (val) => changeDate(val, 'pt-br'), sortable: true },
        { name: 'abertura_data', label: 'Data Recebimento', field: 'abertura_data', format: (val) => changeDate(val, 'pt-br'), sortable: true },
        { name: 'digitador', label: 'Digitador', field: 'digitador', format: (val):string => val ? String(val) : 'Não há', sortable: true },
        { name: 'andamento', label: 'Andamento', field: 'andamento', sortable: true },
        { name: 'andamentocoger', label: 'And. COGER', field: 'andamentocoger', sortable: true },
        { name: 'actions', label: 'Ações', field: 'actions' }
      ] as Columns[]
    })

    async function loadData () {
      const { data } = await api.get('procoutros')
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
