<template>
  <q-tab-panel name="list">
    <q-btn data-cy="button" color="primary" icon="fa fa-plus" class="full-width" label="Inserir novo" to="/cd/inserir"/>
    <Table
      data-cy="table"
      label="Lista"
      :data="data"
      :columns="columns"
      actions
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
import { getMotivoConselho } from 'src/filters'
import { confirmMsg } from 'src/libs/dialog'
import { api } from 'src/services'
import { Cd, Columns } from 'src/types'

export default defineComponent({
  name: 'List',
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
      ] as Columns[]
    })
    async function loadData () {
      const { data } = await api.get('cd')
      vars.data = Object.freeze(data as Cd[])
    }

    function onEdit (row: Cd) {
      void root.$router.push(`/cd/editar/${row.id}`)
    }

    function onDelete (row: Cd) {
      root.$q.dialog(confirmMsg).onOk(async () => {
        const { ok } = await api.delete(`cd/${row.id}`)
        if (ok) void loadData()
      })
    }

    void loadData()

    return {
      ...toRefs(vars),
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
