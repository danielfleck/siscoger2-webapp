<template>
  <q-tab-panel name="rel_situacao">
    <q-btn v-if="acl.hasAnyRoleOrPermission(desercaoRules.toCreate)" data-cy="button" color="primary" icon="fa fa-plus" class="full-width" label="Inserir novo" to="/desercao/inserir"/>
    <Table
      data-cy="table"
      label="Rel. Situação"
      :data="data"
      :columns="columns"
      actions
      :actionButtonDelete="acl.hasAnyRoleOrPermission(desercaoRules.toDelete)"
      :actionButtonEdit="acl.hasAnyRoleOrPermission(desercaoRules.toEdit)"
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
import { api, confirmMsg, acl } from 'src/services'
import { Desercao, Columns } from 'src/types'
import { getOpmByCode, changeDate } from 'src/filters'
import { desercaoRules } from 'src/rules'
import { desercaoRoute } from 'src/routenames'

export default defineComponent({
  name: 'RelSituacao',
  components: { Table },
  setup (_, { root }) {
    const vars = reactive({
      data: [] as readonly Desercao[],
      columns: [
        { name: 'ref', label: 'Ref', field: 'sjd_ref', sortable: true },
        { name: 'ano', label: 'Ano', field: 'sjd_ref_ano', sortable: true },
        { name: 'cdopm', label: 'OPM', field: 'cdopm', format: (val) => getOpmByCode(val), sortable: true },
        { name: 'fato', label: 'Fato', field: 'fato_data', format: (val) => changeDate(val, 'pt-br'), sortable: true },
        { name: 'termo_exclusao', label: 'termo_exclusao', field: 'termo_exclusao', sortable: true },
        { name: 'termo_captura', label: 'termo_captura', field: 'termo_captura', sortable: true },
        { name: 'termo_inclusao', label: 'termo_inclusao', field: 'termo_inclusao', sortable: true },
        { name: 'actions', label: 'Ações', field: 'actions' }
      ] as Columns[],
      desercaoRules
    })
    async function loadData () {
      const { data } = await api.get(desercaoRoute)
      vars.data = Object.freeze(data as Desercao[])
    }

    function onEdit (row: Desercao) {
      void root.$router.push(`/${desercaoRoute}/editar/${row.id}`)
    }

    function onDelete (row: Desercao) {
      root.$q.dialog(confirmMsg).onOk(async () => {
        const { ok } = await api.delete(`${desercaoRoute}/${row.id}`)
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
