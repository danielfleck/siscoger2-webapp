<template>
  <under-construction />
  <!-- <page :breadcrumbs="[
    { label: 'Lista', link: '/sai' },
    ]">
    <q-btn data-cy="button" color="primary" icon="fa fa-plus" class="full-width" label="Inserir novo" to="/sai/inserir"/>
    <Table
      data-cy="table"
      label="Lista sai"
      :data="data"
      :columns="columns"
      actions
      @delete="onDelete"
      @edit="onEdit"
    />
  </page> -->
</template>
<script lang="ts">
/* eslint-disable no-void */
import { defineComponent, reactive, toRefs } from '@vue/composition-api'

import Page from 'components/pages/Page.vue'
import Table from 'components/pages/Table.vue'
import UnderConstruction from 'src/components/pages/UnderConstruction.vue'

import { api, confirmMsg } from 'src/services'
import { Columns, Sai } from 'src/types'

export default defineComponent({
  name: 'SaiList',
  components: {
    Page,
    Table,
    UnderConstruction
  },
  setup (_, { root }) {
    const vars = reactive({
      data: [] as readonly Sai[],
      columns: [
        { name: 'rg', label: 'rg', field: 'rg', sortable: true },
        { name: 'cargo', label: 'cargo', field: 'cargo', sortable: true },
        { name: 'nome', label: 'nome', field: 'nome', sortable: true },
        { name: 'rg_cadastro', label: 'rg_cadastro', field: 'rg_cadastro', sortable: true },
        { name: 'data', label: 'data', field: 'data', sortable: true },
        { name: 'docorigem', label: 'docorigem', field: 'docorigem', sortable: true },
        { name: 'cdopm', label: 'cdopm', field: 'cdopm', sortable: true },
        { name: 'cdopm_fato', label: 'cdopm_fato', field: 'cdopm_fato', sortable: true },
        { name: 'cdopm_controle', label: 'cdopm_controle', field: 'cdopm_controle', sortable: true },
        { name: 'opm_abreviatura', label: 'opm_abreviatura', field: 'opm_abreviatura', sortable: true },
        { name: 'sintese_txt', label: 'sintese_txt', field: 'sintese_txt', sortable: true },
        { name: 'actions', label: 'Ações', field: 'actions' }
      ] as Columns[]
    })

    const functions = {
      async loadData () {
        const data = await api.get('sai')
        vars.data = Object.freeze(data as unknown as readonly Sai[])
      },
      onEdit (row: Sai) {
        return root.$router.push(`/sai/editar/${String(row.id)}`)
      },
      onDelete (row: Sai) {
        root.$q.dialog(confirmMsg).onOk(async () => {
          const { ok } = await api.delete(`sai/${String(row.id)}`)
          if (ok) await this.loadData()
        })
      }
    }

    // void functions.loadData()

    return {
      ...toRefs(vars),
      ...functions
    }
  }
})
</script>
