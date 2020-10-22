<template>
  <q-tab-panel name="geral">
    <q-card-section>
      <Table
        label="Transferências"
        :data="dataTransferencias"
        :columns="columnsTransferencias"
        :fullscreen="false"
        :csv="false"
        :excel="false"
      />
    </q-card-section>
    <q-card-section>
      <Table
        label="Comportamento"
        :data="dataComportamento"
        :columns="columnsComportamento"
        :fullscreen="false"
        :csv="false"
        :excel="false"
      />
    </q-card-section>
  </q-tab-panel>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from '@vue/composition-api'
import Table from 'components/pages/Table.vue'
import { get } from 'src/libs/api'

export default defineComponent({
  name: 'DashboardGeneral',
  components: { Table },
  setup (_, { root }) {
    const vars = reactive({
      dataTransferencias: [],
      columnsTransferencias: [
        { name: 'ref', label: 'Ref', field: 'sjd_ref', sortable: true },
        { name: 'ano', label: 'Ano', field: 'sjd_ref_ano', sortable: true },
      ],
      dataComportamento: [],
      columnsComportamento: [
        { name: 'ref', label: 'Ref', field: 'sjd_ref', sortable: true },
        { name: 'ano', label: 'Ano', field: 'sjd_ref_ano', sortable: true },
      ],
    })
    const functions = {
      // async loadData () {
      //   const data = await get('#')
      //   vars.dataAbertura = Object.freeze(data)

      //   const data = await get('#')
      //   vars.dataPrazos = Object.freeze(data)
      // },
    }
    // void functions.loadData()

    return {
      ...toRefs(vars),
      ...functions
    }
  }
})
</script>
