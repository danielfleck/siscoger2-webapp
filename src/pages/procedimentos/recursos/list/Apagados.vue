<template>
  <q-tab-panel name="apagados">
    <q-btn v-if="acl.hasAnyRoleOrPermission(recursoRules.toCreate)" data-cy="button" color="primary" icon="fa fa-plus" class="full-width" label="Inserir novo" to="/recursos/inserir"/>
    <Table
      data-cy="table"
      label="Apagados"
      :data="data"
      :columns="columns"
      actions
      :actionButtonRestore="acl.hasAnyRoleOrPermission(recursoRules.toRestore)"
      :actionButtonDelete="acl.hasAnyRoleOrPermission(recursoRules.toForceDelete)"
      :actionButtonEdit="acl.hasAnyRoleOrPermission(recursoRules.toEdit)"
      @delete="onDelete"
      @restore="onRestore"
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
import { getOpmByCode } from 'src/filters'
import { api, acl, confirm } from 'src/services'
import { Recurso, Columns } from 'src/types'
import { recursoRules } from 'src/rules'
import { recursoRoute } from 'src/routenames'

export default defineComponent({
  name: 'Apagados',
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
      const { data } = await api.get(`${recursoRoute}/deleted`)
      vars.data = Object.freeze(data as Recurso[])
    }

    function onEdit (row: Recurso) {
      void root.$router.push(`/${recursoRoute}/editar/${row.id}`)
    }

    function onRestore (row: Recurso) {
      root.$q.dialog(confirm({ message: 'Tem certeza que deseja restaurar?' })).onOk(async () => {
        const { ok } = await api.put(`${recursoRoute}/${row.id}/restore`, {})
        if (ok) void loadData()
      })
    }

    function onDelete (row: Recurso) {
      root.$q.dialog(confirm({ message: 'Tem certeza? essa ação é irreversível' })).onOk(async () => {
        const { ok } = await api.delete(`${recursoRoute}/${row.id}/force`)
        if (ok) void loadData()
      })
    }

    void loadData()

    return {
      ...toRefs(vars),
      acl,
      onEdit,
      onRestore,
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
