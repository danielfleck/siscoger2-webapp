<template>
  <q-tab-panel name="prazos">
    <q-btn color="primary" icon="fa fa-plus" class="full-width" label="Inserir novo" to="/sindicancias/inserir"/>
    <Table
      label="Prazos"
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
import { get, deleteData } from 'src/libs/api'
import { confirmMsg } from 'src/libs/dialog'

export default defineComponent({
  name: 'Prazos',
  components: { Table },
  setup (_, { root }) {
    const vars = reactive({
      data: [],
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
        const data = await get('sindicancias')
        vars.data = Object.freeze(data)
      },
      onEdit (row: any) {
        void root.$router.push(`/sindicancias/editar/${row.id}`)
      },
      onDelete (row: any) {
        console.log(row.id)
        root.$q.dialog(confirmMsg).onOk(async () => {
          await deleteData(`sindicancias/${row.id}`)
          void this.loadData()
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
