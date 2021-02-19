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
import { defineComponent, reactive, toRefs } from '@vue/composition-api'
import { api, getUserCdopm, getPendence } from 'src/services'
import { LocalStorage, date } from 'quasar'

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
    const module = 'sindicancias'
    const state = reactive({
      tab: '',
      cdopm: getUserCdopm(),
      totalPendences: {
        gerais: 0,
        fatd: 0,
        ipm: 0,
        sindicancia: 0,
        cd: 0
      } as {[K in Procs]: number}
    })

    function loadData () {
      pendences.forEach(async ({ proc, pendencias }) => {
        const nameStore = `${proc}-${pendencias}`
        const storeData = getPendence(nameStore)

        if (!storeData || date.getDateDiff(storeData.lastUpdate, new Date(), 'minutes') > 30) {
          const { data, 'data (count)': length } = await api.post('pendencias/search', {
            cdopm: state.cdopm,
            proc,
            pendencias: [pendencias]
          }, { silent: true })
          LocalStorage.set(nameStore, { data, length, lastUpdate: new Date() })
        }

        if (['transferencias', 'comportamento'].includes(proc)) state.totalPendences.gerais += length
        else state.totalPendences[proc] += length
      })
      updateTotalPendences()
    }

    function updateTotalPendences () {
      /// //////
      LocalStorage.set('total-pendences', { ...state.totalPendences })
    }

    void loadData()

    return { module, ...toRefs(state) }
  }
})
</script>
