<template>
  <q-tab-panel name="apagados">
    <q-btn v-if="acl.hasAnyRoleOrPermission(fatdRules.toCreate)" data-cy="button" color="primary" icon="fa fa-plus" class="full-width" label="Inserir novo" to="/fatd/inserir"/>
    <Table
      data-cy="table"
      label="Apagados"
      :data="data"
      :columns="columns"
      actions
      :actionButtonRestore="acl.hasAnyRoleOrPermission(fatdRules.toRestore)"
      :actionButtonDelete="acl.hasAnyRoleOrPermission(fatdRules.toForceDelete)"
      :actionButtonEdit="acl.hasAnyRoleOrPermission(fatdRules.toEdit)"
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
import { api, acl, confirm } from 'src/services'
import { Fatd, Columns } from 'src/types'
import { fatdRules } from 'src/rules'
import { fatdRoute } from 'src/routenames'

export default defineComponent({
  name: 'Apagados',
  components: { Table },
  setup (_, { root }) {
    const vars = reactive({
      data: [] as readonly Fatd[],
      columns: [
        { name: 'ref', label: 'Ref', field: 'sjd_ref', sortable: true },
        { name: 'ano', label: 'Ano', field: 'sjd_ref_ano', sortable: true },
        { name: 'cdopm', label: 'OPM', field: 'cdopm' },
        { name: 'sintese_txt', label: 'Síntese do fato', field: 'sintese_txt', align: 'left', style: 'white-space: pre-wrap' },
        { name: 'actions', label: 'Ações', field: 'actions' }
      ] as Columns[],
      fatdRules
    })

    async function loadData () {
      const { data } = await api.get(`${fatdRoute}/deleted`)
      vars.data = Object.freeze(data as Fatd[])
    }

    function onEdit (row: Fatd) {
      void root.$router.push(`/${fatdRoute}/editar/${row.id}`)
    }

    function onRestore (row: Fatd) {
      root.$q.dialog(confirm({ message: 'Tem certeza que deseja restaurar?' })).onOk(async () => {
        const { ok } = await api.put(`${fatdRoute}/${row.id}/restore`, {})
        if (ok) void loadData()
      })
    }

    function onDelete (row: Fatd) {
      root.$q.dialog(confirm({ message: 'Tem certeza? essa ação é irreversível' })).onOk(async () => {
        const { ok } = await api.delete(`${fatdRoute}/${row.id}/force`)
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
