<template>
  <q-tab-panel name="apagados">
    <q-btn data-cy="button" color="primary" icon="fa fa-plus" class="full-width" label="Inserir novo" to="/iso/inserir"/>
    <Table
      data-cy="table"
      label="Apagados"
      :data="data"
      :columns="columns"
      actions
      actionButtonRestore
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
import { api, confirm } from 'src/services'
import { iso, Columns } from 'src/types'

export default defineComponent({
  name: 'Apagados',
  components: { Table },
  setup (_, { root }) {
    const vars = reactive({
      data: [] as readonly iso[],
      columns: [
        { name: 'ref', label: 'Ref', field: 'sjd_ref', sortable: true },
        { name: 'ano', label: 'Ano', field: 'sjd_ref_ano', sortable: true },
        { name: 'cdopm', label: 'OPM', field: 'cdopm' },
        { name: 'sintese_txt', label: 'Síntese do fato', field: 'sintese_txt', align: 'left', style: 'white-space: pre-wrap' },
        { name: 'actions', label: 'Ações', field: 'actions' }
      ] as Columns[]
    })
    async function loadData () {
      const { data } = await api.get('iso/deleted')
      vars.data = Object.freeze(data as iso[])
    }

    function onEdit (row: iso) {
      void root.$router.push(`/iso/editar/${row.id}`)
    }

    function onRestore (row: iso) {
      root.$q.dialog(confirm({ message: 'Tem certeza que deseja restaurar?' })).onOk(async () => {
        const { ok } = await api.put(`iso/${row.id}/restore`, {})
        if (ok) void loadData()
      })
    }

    function onDelete (row: iso) {
      root.$q.dialog(confirm({ message: 'Tem certeza? essa ação é irreversível' })).onOk(async () => {
        const { ok } = await api.delete(`iso/${row.id}/force`)
        if (ok) void loadData()
      })
    }

    void loadData()

    return {
      ...toRefs(vars),
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
