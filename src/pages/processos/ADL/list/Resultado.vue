<template>
  <q-tab-panel name="resultado">
    <q-btn data-cy="button" color="primary" icon="fa fa-plus" class="full-width" label="Inserir novo" to="/adl/inserir"/>
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
import { changeDate } from 'src/filters'
import { confirmMsg } from 'src/libs/dialog'
import { api, errorNotify } from 'src/services'
import { Adl, Columns } from 'src/types'

export default defineComponent({
  name: 'Resultado',
  components: { Table },
  setup (_, { root }) {
    const vars = reactive({
      data: [] as readonly Adl[],
      columns: [
        { name: 'ref', label: 'Ref', field: 'sjd_ref', sortable: true },
        { name: 'ano', label: 'Ano', field: 'sjd_ref_ano', sortable: true },
        { name: 'fato_data', label: 'Data do fato', field: 'fato_data', format: (val) => changeDate(val, 'pt-br'), sortable: true },
        { name: 'acusado', label: 'Acusado', field: 'name', sortable: true },
        { name: 'andamento', label: 'Andamento', field: 'andamento', sortable: true },
        { name: 'parecer_comissao', label: 'Comissao', field: 'parecer_comissao', sortable: true },
        { name: 'parecer_cmtgeral', label: 'Cmt. Geral', field: 'parecer_cmtgeral', sortable: true },
        { name: 'julgamento', label: 'julgamento*', field: 'julgamento', sortable: true },
        { name: 'actions', label: 'Ações', field: 'actions' }
      ] as Columns[]
    })
    async function loadData () {
      const { data } = await api.get('adl/resultado')
      vars.data = Object.freeze(data as Adl[])
    }

    function onEdit (row: Adl) {
      if (!row.id) return errorNotify('Sem id')
      void root.$router.push(`/adl/editar/${row.id}`)
    }

    function onDelete (row: Adl) {
      if (!row.id) return errorNotify('Sem id')
      root.$q.dialog(confirmMsg).onOk(async () => {
        const { ok } = await api.delete(`adl/${row.id}`)
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
