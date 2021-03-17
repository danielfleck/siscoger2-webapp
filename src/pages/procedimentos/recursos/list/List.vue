<template>
  <q-tab-panel name="list">
    <q-btn v-if="acl.hasAnyRoleOrPermission(recursoRules.toCreate)" data-cy="button" color="primary" icon="fa fa-plus" class="full-width" label="Inserir novo" to="/recursos/inserir"/>
    <Table
      data-cy="table"
      label="Lista"
      :data="data"
      :columns="columns"
      actions
      :actionButtonDelete="acl.hasAnyRoleOrPermission(recursoRules.toDelete)"
      :actionButtonEdit="acl.hasAnyRoleOrPermission(recursoRules.toEdit)"
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
import { Recurso, Columns } from 'src/types'
import { getOpmByCode } from 'src/utils'
import { recursoRules } from 'src/rules'
import { recursoRoute } from 'src/routenames'

export default defineComponent({
  name: 'List',
  components: { Table },
  setup (_, { root }) {
    const vars = reactive({
      data: [] as readonly Recurso[],
      columns: [
        { name: 'cdopm', label: 'OPM', field: 'cdopm', format: (val) => getOpmByCode(val) },
        { name: 'Procedimento', label: 'Procedimento', field: 'procedimento', sortable: true },
        { name: 'ref', label: 'Ref', field: 'sjd_ref', sortable: true },
        { name: 'ano', label: 'Ano', field: 'sjd_ref_ano', sortable: true },
        { name: 'datahora', label: 'Data-hora recebimento', field: 'datahora' },
        { name: 'actions', label: 'Ações', field: 'actions' }
      ] as Columns[],
      recursoRules
    })

    async function loadData () {
      const { data } = await api.get(recursoRoute)
      vars.data = Object.freeze(data as Recurso[])
    }

    function onEdit (row: Recurso) {
      void root.$router.push(`/${recursoRoute}/editar/${row.id}`)
    }

    function onDelete (row: Recurso) {
      root.$q.dialog(confirmMsg).onOk(async () => {
        const { ok } = await api.delete(`${recursoRoute}/${row.id}`)
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
