<template>
  <page :breadcrumbs="[{ label: 'Lista', link: '/admin/feriados' }]">
    <q-btn data-cy="button" color="primary" icon="fa fa-plus" class="full-width" label="Inserir novo" to="/admin/feriados/inserir"/>
    <Table
      data-cy="table"
      label="Feriados"
      :data="data"
      :columns="columns"
      actions
      @delete="onDelete"
      @edit="onEdit"
    />
  </page>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-void */
import { defineComponent, reactive, toRefs } from '@vue/composition-api'
import Table from 'components/pages/Table.vue'
import Page from 'src/components/pages/Page.vue'
import { changeDate } from 'src/filters'
import { get, deleteData } from 'src/libs/api'
import { confirmMsg } from 'src/libs/dialog'

const moduleName = 'feriados'
const FeriadoPage = defineComponent({
  name: 'Feriados',
  components: { Table, Page },
  setup (_, { root }) {
    const vars = reactive({
      data: [] as any[],
      columns: [
        { name: 'data', label: 'Data', field: 'data', sortable: true, format: (val: string) => changeDate(val, 'pt-br') },
        { name: 'feriado', label: 'Feriado', field: 'feriado', sortable: true },
        { name: 'actions', label: 'Ações', field: 'actions' }
      ]
    })
    const functions = {
      async loadData () {
        const data = await get(moduleName)
        vars.data = Object.freeze(data)
      },
      onEdit (row: any) {
        void root.$router.push(`/admin/${moduleName}/editar/${row.id}`)
      },
      onDelete (row: any) {
        console.log(row.id)
        root.$q.dialog(confirmMsg).onOk(async () => {
          await deleteData(`${moduleName}/${row.id}`)
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

export default FeriadoPage
</script>
