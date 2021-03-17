<template>
  <q-tab-panel name="apagados">
    <q-btn v-if="acl.hasAnyRoleOrPermission(cdRules.toCreate)" data-cy="button" color="primary" icon="fa fa-plus" class="full-width" label="Inserir novo" to="/cd/inserir"/>
    <Table
      data-cy="table"
      label="Apagados"
      :data="data"
      :columns="columns"
      actions
      :actionButtonRestore="acl.hasAnyRoleOrPermission(cdRules.toRestore)"
      :actionButtonDelete="acl.hasAnyRoleOrPermission(cdRules.toForceDelete)"
      :actionButtonEdit="acl.hasAnyRoleOrPermission(cdRules.toEdit)"
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
import { Cd, Columns } from 'src/types'
import { cdRules } from 'src/rules'
import { cdRoute } from 'src/routenames'

export default defineComponent({
  name: 'Apagados',
  components: { Table },
  setup (_, { root }) {
    const vars = reactive({
      data: [] as readonly Cd[],
      columns: [
        { name: 'ref', label: 'Ref', field: 'sjd_ref', sortable: true },
        { name: 'ano', label: 'Ano', field: 'sjd_ref_ano', sortable: true },
        { name: 'motivo', label: 'Motivo', field: 'id_motivoconselho', format: (val) => getMotivoConselho(val) },
        { name: 'sintese_txt', label: 'Síntese do fato', field: 'sintese_txt', align: 'left', style: 'white-space: pre-wrap' },
        { name: 'actions', label: 'Ações', field: 'actions' }
      ] as Columns[],
      cdRules
    })

    async function loadData () {
      const { data } = await api.get(`${cdRoute}/deleted`)
      vars.data = Object.freeze(data as Cd[])
    }

    function onEdit (row: Cd) {
      void root.$router.push(`/${cdRoute}/editar/${row.id}`)
    }

    function onRestore (row: Cd) {
      root.$q.dialog(confirm({ message: 'Tem certeza que deseja restaurar?' })).onOk(async () => {
        const { ok } = await api.put(`${cdRoute}/${row.id}/restore`, {})
        if (ok) void loadData()
      })
    }

    function onDelete (row: Cd) {
      root.$q.dialog(confirm({ message: 'Tem certeza? essa ação é irreversível' })).onOk(async () => {
        const { ok } = await api.delete(`${cdRoute}/${row.id}/force`)
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
