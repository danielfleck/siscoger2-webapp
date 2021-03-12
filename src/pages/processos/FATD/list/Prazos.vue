<template>
  <q-tab-panel name="prazos">
    <q-banner class="bg-green text-white">
      Calculo do prazo dos FATD - contado em dias uteis, conta-se o primeiro dia.
      Sao descontados os dias em que o procedimento ficou sobrestado.
      <template v-slot:action>
        Data de referência: HOJE ({{ today }})
      </template>
    </q-banner>
    <q-btn v-if="acl.hasAnyRoleOrPermission(fatdRules.toCreate)" data-cy="button" color="primary" icon="fa fa-plus" class="full-width" label="Inserir novo" to="/fatd/inserir"/>
    <Table
      data-cy="table"
      label="Prazos"
      :data="data"
      :columns="columns"
      actions
      :actionButtonDelete="acl.hasAnyRoleOrPermission(fatdRules.toDelete)"
      :actionButtonEdit="acl.hasAnyRoleOrPermission(fatdRules.toEdit)"
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
import { changeDate, getCurrentDate, getOpmByCode, getPrazoDecorrido } from 'src/filters'
import { api, acl, confirmMsg } from 'src/services'
import { Fatd, Columns } from 'src/types'
import { fatdRules } from 'src/rules'

export default defineComponent({
  name: 'Prazos',
  components: { Table },
  setup (_, { root }) {
    const vars = reactive({
      today: getCurrentDate('pt-br'),
      data: [] as readonly Fatd[],
      columns: [
        { name: 'ref', label: 'Ref', field: 'sjd_ref', sortable: true },
        { name: 'ano', label: 'Ano', field: 'sjd_ref_ano', sortable: true },
        { name: 'cdopm', label: 'OPM', field: 'cdopm', format: (val) => getOpmByCode(val), sortable: true },
        { name: 'abertura', label: 'Abertura', field: 'abertura_data', format: (val) => changeDate(val, 'pt-br'), sortable: true },
        { name: 'encarregado', label: 'Encarregado', field: 'name', format: (val) => val || 'Não há', sortable: true },
        { name: 'andamento', label: 'Andamento', field: 'andamento', sortable: true },
        { name: 'andamentocoger', label: 'And. COGER', field: 'andamentocoger', sortable: true },
        { name: 'diasuteis_sobrestado', label: 'Sobrestamento', field: 'diasuteis_sobrestado', format: (val) => val || 'Não há', sortable: true },
        { name: 'motivo_sobrestado', label: 'Motivo Sobrest.', field: 'motivo_sobrestado', format: (val, row) => getPrazoDecorrido(val, row), sortable: true },
        { name: 'prazo_decorrido', label: 'Prazo decorrido', field: 'prazo_decorrido', sortable: true },
        { name: 'actions', label: 'Ações', field: 'actions' }
      ] as Columns[],
      fatdRules
    })

    async function loadData () {
      const { data } = await api.get('fatd/andamento')
      vars.data = Object.freeze(data as Fatd[])
    }

    function onEdit (row: Fatd) {
      void root.$router.push(`/fatd/editar/${row.id}`)
    }

    function onDelete (row: Fatd) {
      root.$q.dialog(confirmMsg).onOk(async () => {
        const { ok } = await api.delete(`fatd/${row.id}`)
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
