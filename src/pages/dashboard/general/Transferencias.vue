<template>
  <q-card-section>
    <Table
      label="Transferências"
      :data="data"
      :columns="columns"
      :fullscreen="false"
      :csv="false"
      :excel="false"
    />
  </q-card-section>
</template>

<script lang="ts">
/* eslint-disable no-void */
import { defineComponent, reactive, toRefs } from '@vue/composition-api'
import Table from 'components/pages/Table.vue'
import { getPendence, getUserCdopm } from 'src/services'
import { Columns, Pendencia } from 'src/types'

export default defineComponent({
  name: 'DashboardGeneral',
  components: { Table },
  setup () {
    const vars = reactive({
      data: [] as readonly Pendencia[],
      columns: [
        { name: 'ref', label: 'Ref', field: 'sjd_ref', sortable: true },
        { name: 'ano', label: 'Ano', field: 'sjd_ref_ano', sortable: true }
      ] as Columns[],
      cdopm: getUserCdopm()
    })
    function loadData () {
      const store = getPendence('transferencias-nova')
      if (store?.data) vars.data = Object.freeze(store.data as unknown as Pendencia[])
    }

    void loadData()

    return {
      ...toRefs(vars)
    }
  }
})
</script>
