<template>
  <q-tab-panel name="apagados">
    <q-btn v-if="acl.hasAnyRoleOrPermission(cjRules.toCreate)" data-cy="button" color="primary" icon="fa fa-plus" class="full-width" label="Inserir novo" to="/cj/inserir"/>
    <Table
      data-cy="table"
      label="Apagados"
      :data="data"
      :columns="columns"
      actions
      :actionButtonRestore="acl.hasAnyRoleOrPermission(cjRules.toRestore)"
      :actionButtonDelete="acl.hasAnyRoleOrPermission(cjRules.toForceDelete)"
      :actionButtonEdit="acl.hasAnyRoleOrPermission(cjRules.toEdit)"
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
import { getMotivoConselho } from 'src/filters'
import { api, acl, confirm } from 'src/services'
import { Cj, Columns } from 'src/types'
import { cjRules } from 'src/rules'
import { cjRoute } from 'src/routenames'

export default defineComponent({
  name: 'Apagados',
  components: { Table },
  setup (_, { root }) {
    const vars = reactive({
      data: [] as readonly Cj[],
      columns: [
        { name: 'ref', label: 'Ref', field: 'sjd_ref', sortable: true },
        { name: 'ano', label: 'Ano', field: 'sjd_ref_ano', sortable: true },
        { name: 'motivo', label: 'Motivo', field: 'id_motivoconselho', format: (val) => getMotivoConselho(val) },
        { name: 'sintese_txt', label: 'Síntese do fato', field: 'sintese_txt', align: 'left', style: 'white-space: pre-wrap' },
        { name: 'actions', label: 'Ações', field: 'actions' }
      ] as Columns[],
      cjRules
    })

    async function loadData () {
      const { data } = await api.get(`${cjRoute}/deleted`)
      vars.data = Object.freeze(data as Cj[])
    }

    function onEdit (row: Cj) {
      void root.$router.push(`/${cjRoute}/editar/${row.id}`)
    }

    function onRestore (row: Cj) {
      root.$q.dialog(confirm({ message: 'Tem certeza que deseja restaurar?' })).onOk(async () => {
        const { ok } = await api.put(`${cjRoute}/${row.id}/restore`, {})
        if (ok) void loadData()
      })
    }

    function onDelete (row: Cj) {
      root.$q.dialog(confirm({ message: 'Tem certeza? essa ação é irreversível' })).onOk(async () => {
        const { ok } = await api.delete(`${cjRoute}/${row.id}/force`)
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
