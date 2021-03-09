<template>
  <q-tab-panel name="prazos">
    <q-banner class="bg-green text-white">
      Calculo do prazo dos ipm - contado em dias corridos, conta-se o primeiro dia.
      <template v-slot:action>
        Data de referência: HOJE ({{ today }})
      </template>
    </q-banner>
    <q-btn data-cy="button" color="primary" icon="fa fa-plus" class="full-width" label="Inserir novo" to="/ipm/inserir"/>
    <Table
      data-cy="table"
      label="Prazos"
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
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-void */
import { defineComponent, reactive, toRefs } from '@vue/composition-api'
import Table from 'components/pages/Table.vue'
import { changeDate, getCurrentDate, getOpmByCode } from 'src/filters'
import { confirmMsg } from 'src/libs/dialog'
import { api } from 'src/services'
import { Ipm, Columns } from 'src/types'

export default defineComponent({
  name: 'Prazos',
  components: { Table },
  setup (_, { root }) {
    const vars = reactive({
      today: getCurrentDate('pt-br'),
      data: [] as readonly Ipm[],
      columns: [
        { name: 'ref', label: 'Ref', field: 'sjd_ref', sortable: true },
        { name: 'ano', label: 'Ano', field: 'sjd_ref_ano', sortable: true },
        { name: 'cdopm', label: 'OPM', field: 'cdopm', format: (val) => getOpmByCode(val), sortable: true },
        { name: 'abertura', label: 'Instauração', field: 'abertura_data', format: (val) => changeDate(val, 'pt-br'), sortable: true },
        { name: 'encarregado', label: 'Encarregado', field: 'name', format: (val) => val || 'Não há', sortable: true },
        { name: 'andamento', label: 'Andamento', field: 'andamento', sortable: true },
        { name: 'andamentocoger', label: 'And. COGER', field: 'andamentocoger', sortable: true },
        { name: 'prazo_decorrido', label: 'Prazo decorrido', field: 'prazo_decorrido', sortable: true },
        { name: 'actions', label: 'Ações', field: 'actions' }
      ] as Columns[]
    })
    async function loadData () {
      const { data } = await api.get('ipm/andamento')
      vars.data = Object.freeze(data as Ipm[])
    }

    function onEdit (row: Ipm) {
      void root.$router.push(`/ipm/editar/${row.id}`)
    }

    function onDelete (row: Ipm) {
      root.$q.dialog(confirmMsg).onOk(async () => {
        const { ok } = await api.delete(`ipm/${row.id}`)
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
