<template>
  <q-tab-panel name="apagados">
    <q-btn v-if="acl.hasAnyRoleOrPermission(procOutrosRules.toCreate)" data-cy="button" color="primary" icon="fa fa-plus" class="full-width" label="Inserir novo" to="/proc_outros/inserir"/>
    <Table
      data-cy="table"
      label="Apagados"
      :data="data"
      :columns="columns"
      actions
      :actionButtonRestore="acl.hasAnyRoleOrPermission(procOutrosRules.toRestore)"
      :actionButtonDelete="acl.hasAnyRoleOrPermission(procOutrosRules.toForceDelete)"
      :actionButtonEdit="acl.hasAnyRoleOrPermission(procOutrosRules.toEdit)"
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
import { ProcOutros, Columns } from 'src/types'
import { procoutroRules } from 'src/rules'

export default defineComponent({
  name: 'Apagados',
  components: { Table },
  setup (_, { root }) {
    const vars = reactive({
      data: [] as readonly ProcOutros[],
      columns: [
        { name: 'ref', label: 'Ref', field: 'sjd_ref', sortable: true },
        { name: 'ano', label: 'Ano', field: 'sjd_ref_ano', sortable: true },
        { name: 'cdopm', label: 'OPM (abertura)', field: 'cdopm', format: (val) => getOpmByCode(val) },
        { name: 'cdopm_apuracao', label: 'OPM (apuração)', field: 'cdopm_apuracao', format: (val) => getOpmByCode(val) },
        { name: 'sintese_txt', label: 'Síntese do fato', field: 'sintese_txt', align: 'left', style: 'white-space: pre-wrap' },
        { name: 'motivo_abertura', label: 'Motivo Principal', field: 'motivo_abertura', align: 'left', style: 'white-space: pre-wrap' },
        { name: 'doc_origem', label: 'Dpcumento Origem', field: 'doc_origem', align: 'left', style: 'white-space: pre-wrap' },
        { name: 'actions', label: 'Ações', field: 'actions' }
      ] as Columns[],
      procoutroRules
    })

    async function loadData () {
      const { data } = await api.get('procoutros/deleted')
      vars.data = Object.freeze(data as ProcOutros[])
    }

    function onEdit (row: ProcOutros) {
      void root.$router.push(`/proc_outros/editar/${row.id}`)
    }

    function onRestore (row: ProcOutros) {
      root.$q.dialog(confirm({ message: 'Tem certeza que deseja restaurar?' })).onOk(async () => {
        const { ok } = await api.put(`procoutros/${row.id}/restore`, {})
        if (ok) void loadData()
      })
    }

    function onDelete (row: ProcOutros) {
      root.$q.dialog(confirm({ message: 'Tem certeza? essa ação é irreversível' })).onOk(async () => {
        const { ok } = await api.delete(`procoutros/${row.id}/force`)
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
