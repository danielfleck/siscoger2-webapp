<template>
  <q-tab-panel name="resultado">
    <q-btn v-if="acl.hasAnyRoleOrPermission(cdRules.toCreate)" data-cy="button" color="primary" icon="fa fa-plus" class="full-width" label="Inserir novo" to="/ipm/inserir"/>
    <Table
      data-cy="table"
      label="Resultado"
      :data="data"
      :columns="columns"
      actions
      :actionButtonDelete="acl.hasAnyRoleOrPermission(cdRules.toDelete)"
      :actionButtonEdit="acl.hasAnyRoleOrPermission(cdRules.toEdit)"
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
import { api, acl, confirmMsg } from 'src/services'
import { Cd, Columns } from 'src/types'
import { cdRules } from 'src/rules'
import { cdRoute } from 'src/routenames'

export default defineComponent({
  name: 'Resultado',
  components: { Table },
  setup (_, { root }) {
    const vars = reactive({
      data: [] as readonly Cd[],
      columns: [
        { name: 'ref', label: 'Ref', field: 'sjd_ref', sortable: true },
        { name: 'ano', label: 'Ano', field: 'sjd_ref_ano', sortable: true },
        { name: 'fato_data', label: 'Data do fato', field: 'fato_data', format: (val) => changeDate(val, 'pt-br'), sortable: true },
        { name: 'acusado', label: 'Acusado', field: 'name', sortable: true },
        { name: 'andamento', label: 'Andamento', field: 'andamento', sortable: true },
        { name: 'prescricao_comissao', label: 'Comissao', field: 'prescricao_comissao', sortable: true },
        { name: 'parecer_cmtgeral', label: 'Cmt. Geral', field: 'parecer_cmtgeral', sortable: true },
        { name: 'exclusao_text', label: 'Julgamento', field: 'exclusao_text', sortable: true },
        { name: 'actions', label: 'Ações', field: 'actions' }
      ] as Columns[],
      cdRules
    })

    async function loadData () {
      const { data } = await api.get(`${cdRoute}/julgamento`)
      vars.data = Object.freeze(data as Cd[])
    }

    function onEdit (row: Cd) {
      void root.$router.push(`/${cdRoute}/editar/${row.id}`)
    }

    function onDelete (row: Cd) {
      root.$q.dialog(confirmMsg).onOk(async () => {
        const { ok } = await api.delete(`${cdRoute}/${row.id}`)
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
