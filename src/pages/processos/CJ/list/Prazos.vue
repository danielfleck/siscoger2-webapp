<template>
  <q-tab-panel name="prazos">
    <q-banner class="bg-green text-white">
      Calculo do prazo dos cj - contado em dias uteis, EXCLUI-SE o primeiro dia. (Portaria 338)
      Sao descontados os dias em que o procedimento ficou sobrestado.
      <template v-slot:action>
        Data de referência: HOJE ({{ today }})
      </template>
    </q-banner>
    <q-btn v-if="acl.hasAnyRoleOrPermission(cjRules.toCreate)" data-cy="button" color="primary" icon="fa fa-plus" class="full-width" label="Inserir novo" to="/cj/inserir"/>
    <Table
      data-cy="table"
      label="Prazos"
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
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-void */
import { defineComponent, reactive, toRefs } from '@vue/composition-api'
import Table from 'components/pages/Table.vue'
import { changeDate, getCurrentDate, getPrazoDecorrido } from 'src/filters'
import { api, acl, confirmMsg } from 'src/services'
import { Cj, Columns } from 'src/types'
import { cjRules } from 'src/rules'
import { cjRoute } from 'src/routenames'

export default defineComponent({
  name: 'Prazos',
  components: { Table },
  setup (_, { root }) {
    const vars = reactive({
      today: getCurrentDate('pt-br'),
      data: [] as readonly Cj[],
      columns: [
        { name: 'ref', label: 'Ref', field: 'sjd_ref', sortable: true },
        { name: 'ano', label: 'Ano', field: 'sjd_ref_ano', sortable: true },
        { name: 'abertura', label: 'Abertura', field: 'abertura_data', format: (val) => changeDate(val, 'pt-br'), sortable: true },
        { name: 'presidente', label: 'Presidente', field: 'name', format: (val) => val || 'Não há', sortable: true },
        { name: 'andamento', label: 'Andamento', field: 'andamento', sortable: true },
        { name: 'andamentocoger', label: 'And. COGER', field: 'andamentocoger', sortable: true },
        { name: 'diasuteis_sobrestado', label: 'Sobrestamento', field: 'diasuteis_sobrestado', format: (val) => val || 'Não há', sortable: true },
        { name: 'motivo_sobrestado', label: 'Motivo Sobrest.', field: 'motivo_sobrestado', format: (val, row) => getPrazoDecorrido(val, row), sortable: true },
        { name: 'prazo_decorrido', label: 'Prazo decorrido', field: 'prazo_decorrido', sortable: true },
        { name: 'actions', label: 'Ações', field: 'actions' }
      ] as Columns[],
      cjRules
    })

    async function loadData () {
      const { data } = await api.get(`${cjRoute}/andamento`)
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
