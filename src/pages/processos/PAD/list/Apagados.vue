<template>
  <q-tab-panel name="apagados">
    <q-btn v-if="acl.hasAnyRoleOrPermission(padRules.toCreate)" data-cy="button" color="primary" icon="fa fa-plus" class="full-width" label="Inserir novo" to="/pad/inserir"/>
    <Table
      data-cy="table"
      label="Apagados"
      :data="data"
      :columns="columns"
      actions
      :actionButtonRestore="acl.hasAnyRoleOrPermission(padRules.toRestore)"
      :actionButtonDelete="acl.hasAnyRoleOrPermission(padRules.toForceDelete)"
      :actionButtonEdit="acl.hasAnyRoleOrPermission(padRules.toEdit)"
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
import { changeDate, getOpmByCode } from 'src/filters'
import { api, acl, confirm } from 'src/services'
import { Pad, Columns } from 'src/types'
import { padRules } from 'src/rules'
import { padRoute } from 'src/routenames'

export default defineComponent({
  name: 'Apagados',
  components: { Table },
  setup (_, { root }) {
    const vars = reactive({
      data: [] as readonly Pad[],
      columns: [
        { name: 'ref', label: 'Ref', field: 'sjd_ref', sortable: true },
        { name: 'ano', label: 'Ano', field: 'sjd_ref_ano', sortable: true },
        { name: 'cdopm', label: 'OPM', field: 'cdopm', format: (val) => getOpmByCode(val) },
        { name: 'andamento', label: 'Andamento', field: 'andamento', sortable: true },
        { name: 'andamentocoger', label: 'And. COGER', field: 'andamentocoger', sortable: true },
        { name: 'abertura', label: 'Abertura', field: 'abertura_data', format: (val) => changeDate(val, 'pt-br'), sortable: true },
        { name: 'sintese_txt', label: 'Síntese do fato', field: 'sintese_txt', align: 'left', style: 'white-space: pre-wrap' },
        { name: 'actions', label: 'Ações', field: 'actions' }
      ] as Columns[],
      padRules
    })

    async function loadData () {
      const { data } = await api.get(`${padRoute}/deleted`)
      vars.data = Object.freeze(data as Pad[])
    }

    function onEdit (row: Pad) {
      void root.$router.push(`/${padRoute}/editar/${row.id}`)
    }

    function onRestore (row: Pad) {
      root.$q.dialog(confirm({ message: 'Tem certeza que deseja restaurar?' })).onOk(async () => {
        const { ok } = await api.put(`${padRoute}/${row.id}/restore`, {})
        if (ok) void loadData()
      })
    }

    function onDelete (row: Pad) {
      root.$q.dialog(confirm({ message: 'Tem certeza? essa ação é irreversível' })).onOk(async () => {
        const { ok } = await api.delete(`${padRoute}/${row.id}/force`)
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
