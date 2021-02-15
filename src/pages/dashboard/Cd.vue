<template>
  <q-tab-panel name="cd">
    <q-card-section>
      <Table
        label="CONSELHOS DE DISCIPLINA - DATA DE ABERTURA"
        :data="dataAbertura"
        :columns="columnsAbertura"
        :fullscreen="false"
        :csv="false"
        :excel="false"
      />
    </q-card-section>
    <q-card-section>
      <Table
        label="CONSELHOS DE DISCIPLINA - PRAZOS"
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
import { post } from 'src/libs/api'
import { getUser } from 'src/utils'

export default defineComponent({
  name: 'DashboardCD',
  components: { Table },
  setup (_,{ root }) {
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
      user: getUser()
    })
    const functions = {
      async loadData () {
        await this.abertura()
        await this.prazos()
      },
      async abertura () {
        const data:unknown[] = await post('pendencias/search', {
          cdopm: vars.user.cdopm,
          proc: 'cd',
          pendencias: [
            'abertura'
          ]
        }, { silent: true, debug: true })
        root.$q.localStorage.set('pendencias-cd', data.length)
        vars.dataAbertura = Object.freeze(data)
      },
      async prazos () {
        const data:unknown[] = await post('pendencias/search', {
          cdopm: vars.user.cdopm,
          proc: 'cd',
          pendencias: [
            'prazos'
          ]
        }, { silent: true, debug: true })
        root.$q.localStorage.set('pendencias-cd', data.length)
        vars.dataPrazos = Object.freeze(data)
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
