<template>
  <page :breadcrumbs="[
    { label: 'Lista', link: '/pendencias_geral' },
    ]">
    OBS: Implementar listagem Backend
    <Table
      data-cy="table"
      label="Pendencias no SISCOGER (PMPR)"
      :data="data"
      :columns="columns"
    />
  </page>
</template>
<script lang="ts">
/* eslint-disable no-void */
import { defineComponent, reactive, toRefs } from '@vue/composition-api'

import Page from 'components/pages/Page.vue'
import Table from 'components/pages/Table.vue'
import UnderConstruction from 'src/components/pages/UnderConstruction.vue'

import { api } from 'src/services'

export default defineComponent({
  name: 'MODULEList',
  components: {
    Page,
    Table,
    UnderConstruction
  },
  setup () {
    const vars = reactive({
      data: [] as readonly string[],
      columns: [
        { name: 'opm', label: 'opm', field: 'cdopm', sortable: true },
        { name: 'comportamento', label: 'comportamento', field: 'comportamento', sortable: true },
        { name: 'punicoes', label: 'punicoes', field: 'punicoes', sortable: true },
        { name: 'fatd_punicao', label: 'fatd_punicao', field: 'fatd_punicao', sortable: true },
        { name: 'fatd_prazo', label: 'fatd_prazo', field: 'fatd_prazo', sortable: true },
        { name: 'fatd_abertura', label: 'fatd_abertura', field: 'fatd_abertura', sortable: true },
        { name: 'ipm_prazo', label: 'ipm_prazo', field: 'ipm_prazo', sortable: true },
        { name: 'ipm_abertura', label: 'ipm_abertura', field: 'ipm_abertura', sortable: true },
        { name: 'sindicancia_prazo', label: 'sindicancia_prazo', field: 'sindicancia_prazo', sortable: true },
        { name: 'sindicancia_abertura', label: 'sindicancia_abertura', field: 'sindicancia_abertura', sortable: true }
      ]
    })

    async function loadData () {
      const data = await api.get('pendencias/geral')
      vars.data = Object.freeze(data as unknown as readonly string[])
    }

    void loadData()

    return {
      ...toRefs(vars)
    }
  }
})
</script>
