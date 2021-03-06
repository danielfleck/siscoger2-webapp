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
import { feriadoRoute } from 'src/routenames'
import { api, confirmMsg } from 'src/services'
import { Columns, Feriado } from 'src/types'

const moduleName = feriadoRoute
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
      ] as Columns[]
    })
    const functions = {
      async loadData () {
        const { data } = await api.get(moduleName)
        vars.data = Object.freeze(data as Feriado[])
      },
      onEdit (row: Feriado) {
        void root.$router.push(`/admin/${moduleName}/editar/${String(row.id)}`)
      },
      onDelete (row: Feriado) {
        root.$q.dialog(confirmMsg).onOk(async () => {
          const { ok } = await api.delete(`${moduleName}/${String(row.id)}`)
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
