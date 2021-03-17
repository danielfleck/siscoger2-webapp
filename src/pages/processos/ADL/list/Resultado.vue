<template>
  <q-tab-panel name="resultado">
    <q-btn v-if="acl.hasAnyRoleOrPermission(adlRules.toCreate)" data-cy="button" color="primary" icon="fa fa-plus" class="full-width" label="Inserir novo" to="/ipm/inserir"/>
    <Table
      data-cy="table"
      label="Resultado"
      :data="data"
      :columns="columns"
      actions
      :actionButtonDelete="acl.hasAnyRoleOrPermission(adlRules.toDelete)"
      :actionButtonEdit="acl.hasAnyRoleOrPermission(adlRules.toEdit)"
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
import { api, acl, confirmMsg, errorNotify } from 'src/services'
import { Adl, Columns } from 'src/types'
import { adlRules } from 'src/rules'
import { adlRoute } from 'src/routenames'

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
      ] as Columns[],
      adlRules
    })

    async function loadData () {
      const { data } = await api.get(`${adlRoute}/resultado`)
      vars.data = Object.freeze(data as Adl[])
    }

    function onEdit (row: Adl) {
      if (!row.id) return errorNotify('Sem id')
      void root.$router.push(`/${adlRoute}/editar/${row.id}`)
    }

    function onDelete (row: Adl) {
      if (!row.id) return errorNotify('Sem id')
      root.$q.dialog(confirmMsg).onOk(async () => {
        const { ok } = await api.delete(`${adlRoute}/${row.id}`)
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
