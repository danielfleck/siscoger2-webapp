<template>
  <q-page class="doc-container q-pa-md">
    <q-card flat>
      <q-card-section>
        <Breadcrumbs/>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-route-tab to="/" label="Gerais" icon="fa fa-users">
            <q-badge v-if="totalPendences.gerais" color="red" floating>{{ totalPendences.gerais }}</q-badge>
          </q-route-tab>
          <q-route-tab to="/pendencias-fatd" label="Fatd" icon="fa fa-balance-scale">
            <q-badge v-if="totalPendences.fatd" color="red" floating>{{ totalPendences.fatd }}</q-badge>
          </q-route-tab>
          <q-route-tab to="/pendencias-ipm" label="IPM" icon="fa fa-university">
            <q-badge v-if="totalPendences.ipm" color="red" floating>{{ totalPendences.ipm }}</q-badge>
          </q-route-tab>
          <q-route-tab to="/pendencias-sindicancia" label="Sindicância" icon="fa fa-search">
            <q-badge v-if="totalPendences.sindicancia" color="red" floating>{{ totalPendences.sindicancia }}</q-badge>
          </q-route-tab>
          <q-route-tab to="/pendencias-cd" label="CD" icon="fa fa-gavel">
            <q-badge v-if="totalPendences.cd" color="red" floating>{{ totalPendences.cd }}</q-badge>
          </q-route-tab>
        </q-tabs>
        <transition mode="out-in">
          <router-view />
        </transition>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable no-void */
import Breadcrumbs from 'components/pages/Breadcrumbs.vue'
import { defineComponent, reactive, ref, toRefs } from '@vue/composition-api'
import { api, getUserCdopm, getPendence } from 'src/services'
import { LocalStorage, date } from 'quasar'
import { Pendencia } from 'src/types/pendencias'

interface SerchPendences {
  proc: Procs,
  pendencias: string
}

type Procs = 'gerais' | 'fatd' | 'ipm' | 'sindicancia' | 'cd' | 'comportamento' | 'transferencias'

const pendences: SerchPendences[] = [
  { proc: 'cd', pendencias: 'abertura' },
  { proc: 'cd', pendencias: 'prazos' },
  { proc: 'ipm', pendencias: 'abertura' },
  { proc: 'ipm', pendencias: 'prazos' },
  { proc: 'sindicancia', pendencias: 'abertura' },
  { proc: 'sindicancia', pendencias: 'prazos' },
  { proc: 'fatd', pendencias: 'abertura' },
  { proc: 'fatd', pendencias: 'prazos' },
  { proc: 'fatd', pendencias: 'punicao' },
  { proc: 'comportamento', pendencias: 'alteracao' },
  { proc: 'transferencias', pendencias: 'nova' }
]

export default defineComponent({
  name: 'Index',
  components: { Breadcrumbs },
  setup () {
    const totalPendences = ref({
      gerais: 0,
      fatd: 0,
      ipm: 0,
      sindicancia: 0,
      cd: 0
    }as {[K in Procs]: number})
    const module = 'sindicancias'
    const state = reactive({
      tab: '',
      cdopm: getUserCdopm(),
    })


    async function callApi ({ proc, pendencias }: SerchPendences) {
      const { data, 'data (count)': length } = await api.post('pendencias/search', {
        cdopm: state.cdopm,
        proc,
        pendencias: [pendencias]
      }, { silent: true })

      return [data as Pendencia[], length ]
    }

    async function pendencesGeneral () {
      const [transferencias, transferenciasTotal] = await callApi({ proc: 'transferencias', pendencias: 'nova' })
      const [comportamento, comportamentoTotal] = await callApi({ proc: 'comportamento', pendencias: 'alteracao' })

      LocalStorage.set('transferencias', { data: transferencias, length, lastUpdate: new Date() })
      LocalStorage.set('comportamento', { data: comportamento, length, lastUpdate: new Date() })

      totalPendences.value.gerais = Number(transferenciasTotal) + Number(comportamentoTotal)
    }

    async function pendencesCd () {
      const [cdAbertura, cdAberturaTotal] = await callApi({ proc: 'cd', pendencias: 'abertura' })
      const [cdPrazos, cdPrazosTotal] = await callApi({ proc: 'cd', pendencias: 'prazos' })

      LocalStorage.set('cd-abertura', { data: cdAbertura, length, lastUpdate: new Date() })
      LocalStorage.set('cd-prazos', { data: cdPrazos, length, lastUpdate: new Date() })

      totalPendences.value.cd = Number(cdAberturaTotal) + Number(cdPrazosTotal)
    }

    async function pendencesIpm () {
      const [ipmAbertura, ipmAberturaTotal] = await callApi({ proc: 'ipm', pendencias: 'abertura' })
      const [ipmPrazos, ipmPrazosTotal] = await callApi({ proc: 'ipm', pendencias: 'prazos' })

      LocalStorage.set('ipm-abertura', { data: ipmAbertura, length, lastUpdate: new Date() })
      LocalStorage.set('ipm-prazos', { data: ipmPrazos, length, lastUpdate: new Date() })

      totalPendences.value.ipm = Number(ipmAberturaTotal) + Number(ipmPrazosTotal)
    }

    async function pendencesSindicancia () {
      const [sindicanciaAbertura, sindicanciaAberturaTotal] = await callApi({ proc: 'sindicancia', pendencias: 'abertura' })
      const [sindicanciaPrazos, sindicanciaPrazosTotal] = await callApi({ proc: 'sindicancia', pendencias: 'prazos' })

      LocalStorage.set('sindicancia-abertura', { data: sindicanciaAbertura, length, lastUpdate: new Date() })
      LocalStorage.set('sindicancia-prazos', { data: sindicanciaPrazos, length, lastUpdate: new Date() })

      totalPendences.value.sindicancia = Number(sindicanciaAberturaTotal) + Number(sindicanciaPrazosTotal)
    }

    async function pendencesFatd () {
      const [fatdAbertura, fatdAberturaTotal] = await callApi({ proc: 'fatd', pendencias: 'abertura' })
      const [fatdPrazos, fatdPrazosTotal] = await callApi({ proc: 'fatd', pendencias: 'prazos' })
      const [fatdPunicao, fatdPunicaoTotal] = await callApi({ proc: 'fatd', pendencias: 'punicao' })

      LocalStorage.set('fatd-abertura', { data: fatdAbertura, length, lastUpdate: new Date() })
      LocalStorage.set('fatd-prazos', { data: fatdPrazos, length, lastUpdate: new Date() })
      LocalStorage.set('fatd-punicao', { data: fatdPunicao, length, lastUpdate: new Date() })

      totalPendences.value.fatd = Number(fatdAberturaTotal) + Number(fatdPrazosTotal) + Number(fatdPunicaoTotal)
    }


    async function loadData () {
      await Promise.all([
        pendencesGeneral(),
        pendencesCd(),
        pendencesIpm(),
        pendencesSindicancia(),
        pendencesFatd(),
      ]).then(() => updateTotalPendences())
    }

    function updateTotalPendences () {
      LocalStorage.set('total-pendences', { ...totalPendences.value })
    }

    void loadData()

    return { module, totalPendences, ...toRefs(state) }
  }
})
</script>
