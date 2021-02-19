<template>
  <q-tab-panel name="fatd">
    <q-card-section>
      <Table
        label="FATD - DATA DE ABERTURA"
        :data="dataAbertura"
        :columns="columnsAbertura"
        :fullscreen="false"
        :csv="false"
        :excel="false"
      />
    </q-card-section>
    <q-card-section>
      <Table
        label="FATD - PRAZOS"
        :data="dataPrazos"
        :columns="columnsPrazos"
        :fullscreen="false"
        :csv="false"
        :excel="false"
      />
    </q-card-section>
    <q-card-section>
      <Table
        label="FATD - PUNIÇÃO"
        :data="dataPunicao"
        :columns="columnsPunicao"
        :fullscreen="false"
        :csv="false"
        :excel="false"
      />
    </q-card-section>
  </q-tab-panel>
</template>

<script lang="ts">
/* eslint-disable no-void */
import { defineComponent, reactive, toRefs } from '@vue/composition-api'
import Table from 'components/pages/Table.vue'
import { api } from 'src/services'
import { getUser } from 'src/utils'

export default defineComponent({
  name: 'DashboardFATD',
  components: { Table },
  setup (_, { root }) {
    const vars = reactive({
      dataAbertura: [] as readonly unknown[],
      columnsAbertura: [
        { name: 'ref', label: 'Ref', field: 'sjd_ref', sortable: true },
        { name: 'ano', label: 'Ano', field: 'sjd_ref_ano', sortable: true }
      ],
      dataPrazos: [] as readonly unknown[],
      columnsPrazos: [
        { name: 'ref', label: 'Ref', field: 'sjd_ref', sortable: true },
        { name: 'ano', label: 'Ano', field: 'sjd_ref_ano', sortable: true }
      ],
      dataPunicao: [] as readonly unknown[],
      columnsPunicao: [
        { name: 'ref', label: 'Ref', field: 'sjd_ref', sortable: true },
        { name: 'ano', label: 'Ano', field: 'sjd_ref_ano', sortable: true }
      ],
      user: getUser()
    })
    const functions = {
      async loadData () {
        await this.abertura()
        await this.prazos()
        await this.punicao()
      },
      async abertura () {
        const { data, 'data (count)': length } = await api.post('pendencias/search', {
          cdopm: vars.user.cdopm,
          proc: 'fatd',
          pendencias: [
            'abertura'
          ]
        }, { silent: true, debug: true })
        root.$q.localStorage.set('pendencias-fatd', length)
        vars.dataAbertura = Object.freeze(data as unknown[])
      },
      async prazos () {
        const { data, 'data (count)': length } = await api.post('pendencias/search', {
          cdopm: vars.user.cdopm,
          proc: 'fatd',
          pendencias: [
            'prazos'
          ]
        }, { silent: true, debug: true })
        root.$q.localStorage.set('pendencias-fatd', length)
        vars.dataPrazos = Object.freeze(data as unknown[])
      },
      async punicao () {
        const { data, 'data (count)': length } = await api.post('pendencias/search', {
          cdopm: vars.user.cdopm,
          proc: 'fatd',
          pendencias: [
            'punicao'
          ]
        }, { silent: true, debug: true })
        root.$q.localStorage.set('pendencias-fatd', length)
        vars.dataPrazos = Object.freeze(data as unknown[])
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
