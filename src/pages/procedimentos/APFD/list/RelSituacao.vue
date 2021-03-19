<template>
  <q-tab-panel name="rel_situacao">
    <q-btn v-if="acl.hasAnyRoleOrPermission(apfdRules.toCreate)" data-cy="button" color="primary" icon="fa fa-plus" class="full-width" label="Inserir novo" to="/apfd/inserir"/>
    <Table
      data-cy="table"
      label="Rel. Situação"
      :data="data"
      :columns="columns"
      actions
      :actionButtonDelete="acl.hasAnyRoleOrPermission(apfdRules.toDelete)"
      :actionButtonEdit="acl.hasAnyRoleOrPermission(apfdRules.toEdit)"
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
import { Apfd, Columns } from 'src/types'
import { apfdRules } from 'src/rules'
import { changeDate } from 'src/filters'
import { apfdRoute } from 'src/routenames'

export default defineComponent({
  name: 'RelSituacao',
  components: { Table },
  setup (_, { root }) {
    const vars = reactive({
      data: [] as readonly Apfd[],
      columns: [
        { name: 'ref', label: 'Ref', field: 'sjd_ref', sortable: true },
        { name: 'ano', label: 'Ano', field: 'sjd_ref_ano', sortable: true },
        { name: 'fato', label: 'Fato', field: 'fato_data', format: (val) => changeDate(val, 'pt-br'), sortable: true },
        { name: 'tipo', label: 'tipo', field: 'tipo', sortable: true },
        { name: 'tipo_penal', label: 'tipo_penal', field: 'tipo_penal', sortable: true },
        { name: 'especificar', label: 'especificar', field: 'especificar', sortable: true },
        { name: 'publicacao', label: 'Publicacao*', field: 'publicacao_data', format: (val) => changeDate(val, 'pt-br'), sortable: true },
        { name: 'andamento', label: 'Andamento*', field: 'andamento', sortable: true },
        { name: 'actions', label: 'Ações', field: 'actions' }
      ] as Columns[],
      apfdRules
    })
    async function loadData () {
      const { data } = await api.get(apfdRoute)
      vars.data = Object.freeze(data as Apfd[])
    }

    function onEdit (row: Apfd) {
      void root.$router.push(`/${apfdRoute}/editar/${row.id}`)
    }

    function onDelete (row: Apfd) {
      root.$q.dialog(confirmMsg).onOk(async () => {
        const { ok } = await api.delete(`${apfdRoute}/${row.id}`)
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
