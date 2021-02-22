<template>
  <q-tab-panel name="andamento">
    <q-btn data-cy="button" color="primary" icon="fa fa-plus" class="full-width" label="Inserir novo" to="/sindicancias/inserir"/>
      <Table
      data-cy="table"
      label="Andamento"
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
import { confirmMsg } from 'src/libs/dialog'
import { api } from 'src/services'
import { Sindicancia } from 'src/types/sindicancia'

export default defineComponent({
  name: 'Andamento',
  components: { Table },
  setup (_, { root }) {
    const vars = reactive({
      data: [] as readonly Sindicancia[],
      columns: [
        { name: 'ref', label: 'Ref', field: 'sjd_ref', sortable: true },
        { name: 'ano', label: 'Ano', field: 'sjd_ref_ano', sortable: true },
        { name: 'cdopm', label: 'OPM', field: 'cdopm' },
        { name: 'sintese_txt', label: 'Síntese do fato', field: 'sintese_txt', align: 'left' },
        { name: 'actions', label: 'Ações', field: 'actions' }
      ]
    })
    const functions = {
      async loadData () {
        const { data } = await api.get('sindicancias')
        vars.data = Object.freeze(data as Sindicancia[])
      },
      onEdit (row: Sindicancia) {
        void root.$router.push(`/sindicancias/editar/${row.id}`)
      },
      onDelete (row: Sindicancia) {
        root.$q.dialog(confirmMsg).onOk(async () => {
          const { ok } = await api.delete(`sindicancias/${row.id}`)
          if (ok) void this.loadData()
        })
      }
    }

    void functions.loadData()

    return {
      ...toRefs(vars),
      ...functions
    }
  }
})
</script>
