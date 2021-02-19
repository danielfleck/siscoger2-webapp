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
/* eslint-disable no-void */
import { defineComponent, reactive, toRefs } from '@vue/composition-api'
import Table from 'components/pages/Table.vue'
import Page from 'src/components/pages/Page.vue'
import { changeDate } from 'src/filters'
import { confirmMsg } from 'src/libs/dialog'
import { api } from 'src/services'
import { Feriado } from 'src/types/feriado'

const moduleName = 'feriados'
const FeriadoPage = defineComponent({
  name: 'Feriados',
  components: { Table, Page },
  setup (_, { root }) {
    const vars = reactive({
      data: [] as readonly Feriado[],
      columns: [
        { name: 'data', label: 'Data', field: 'data', sortable: true, format: (val: string) => changeDate(val, 'pt-br') },
        { name: 'feriado', label: 'Feriado', field: 'feriado', sortable: true },
        { name: 'actions', label: 'Ações', field: 'actions' }
      ]
    })
    const functions = {
      async loadData () {
        const { data } = await api.get(moduleName)
        vars.data = Object.freeze(data as Feriado[])
      },
      onEdit (row: any) {
        void root.$router.push(`/admin/${moduleName}/editar/${row.id}`)
      },
      onDelete (row: any) {
        root.$q.dialog(confirmMsg).onOk(async () => {
          const { ok } = await api.delete(`${moduleName}/${row.id}`)
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

export default FeriadoPage
</script>
