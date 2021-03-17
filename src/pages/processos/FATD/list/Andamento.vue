<template>
  <q-tab-panel name="andamento">
    <q-btn v-if="acl.hasAnyRoleOrPermission(fatdRules.toCreate)" data-cy="button" color="primary" icon="fa fa-plus" class="full-width" label="Inserir novo" to="/fatd/inserir"/>
      <Table
      data-cy="table"
      label="Andamento"
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
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-void */
import { defineComponent, reactive, toRefs } from '@vue/composition-api'
import Table from 'components/pages/Table.vue'
import { changeDate, getOpmByCode } from 'src/filters'
import { api, acl, confirmMsg } from 'src/services'
import { Fatd, Columns } from 'src/types'
import { fatdRules } from 'src/rules'
import { fatdRoute } from 'src/routenames'

export default defineComponent({
  name: 'Andamento',
  components: { Table },
  setup (_, { root }) {
    const vars = reactive({
      data: [] as readonly Fatd[],
      columns: [
        { name: 'ref', label: 'Ref', field: 'sjd_ref', sortable: true },
        { name: 'ano', label: 'Ano', field: 'sjd_ref_ano', sortable: true },
        { name: 'cdopm', label: 'OPM', field: 'cdopm', format: (val) => getOpmByCode(val), sortable: true },
        { name: 'abertura', label: 'Abertura', field: 'abertura_data', format: (val) => changeDate(val, 'pt-br'), sortable: true },
        { name: 'encarregado', label: 'Encarregado', field: 'name', format: (val):string => val ? String(val) : 'Não há', sortable: true },
        { name: 'andamento', label: 'Andamento', field: 'andamento', sortable: true },
        { name: 'andamentocoger', label: 'And. COGER', field: 'andamentocoger', sortable: true },
        { name: 'actions', label: 'Ações', field: 'actions' }
      ] as Columns[],
      fatdRules
    })

    async function loadData () {
      const { data } = await api.get(fatdRoute)
      vars.data = Object.freeze(data as Fatd[])
    }

    function onEdit (row: Fatd) {
      void root.$router.push(`/${fatdRoute}/editar/${row.id}`)
    }

    function onDelete (row: Fatd) {
      root.$q.dialog(confirmMsg).onOk(async () => {
        const { ok } = await api.delete(`${fatdRoute}/${row.id}`)
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
