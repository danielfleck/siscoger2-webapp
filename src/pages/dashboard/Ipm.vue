<template>
  <q-tab-panel name="ipm">
    <q-card-section>
      <Table
        label="IPM - DATA DE INSTAURAÇÃO"
        :data="dataAbertura"
        :columns="columnsAbertura"
        :fullscreen="false"
        :csv="false"
        :excel="false"
      />
    </q-card-section>
    <q-card-section>
      <Table
        label="IPM - PRAZOS"
        :data="dataPrazos"
        :columns="columnsPrazos"
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
  name: 'DashboardIPM',
  components: { Table },
  setup (_, { root }) {
    const vars = reactive({
      dataAbertura: [],
      columnsAbertura: [
        { name: 'ref', label: 'Ref', field: 'sjd_ref', sortable: true },
        { name: 'ano', label: 'Ano', field: 'sjd_ref_ano', sortable: true }
      ],
      dataPrazos: [],
      columnsPrazos: [
        { name: 'ref', label: 'Ref', field: 'sjd_ref', sortable: true },
        { name: 'ano', label: 'Ano', field: 'sjd_ref_ano', sortable: true }
      ]
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
