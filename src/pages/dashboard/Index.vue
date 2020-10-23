<template>
  <q-page class="doc-container q-pa-md">
    <q-card flat>
      <q-card-section>
        <Breadcrumbs/>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-tabs
          v-model="state.tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-route-tab
            v-for="tab in tabs"
            :to="tab.link"
            :label="tab.label"
            :key="tab.label"
            :icon="tab.icon"
          >
            <q-badge v-if="tab.badge" color="red" floating>{{ tab.badge }}</q-badge>
          </q-route-tab>
        </q-tabs>
        <transition mode="out-in"> <router-view /> </transition>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import Breadcrumbs from 'components/pages/Breadcrumbs.vue'
import { defineComponent, ref, reactive, computed } from '@vue/composition-api'

export default defineComponent({
  name: 'Index',
  components: { Breadcrumbs },
  setup (_, { root }) {
    const module = 'sindicancias'
    const tabs = ref([
      { link: '/', label: 'Gerais', icon: 'fa fa-users', badge: 10 },
      { link: '/pendencias-fatd', label: 'Fatd', icon: 'fa fa-balance-scale', badge: 15 },
      { link: '/pendencias-ipm', label: 'IPM', icon: 'fa fa-university', badge: 0 },
      { link: '/pendencias-sindicancia', label: 'Sindicância', icon: 'fa fa-search', badge: 8 },
      { link: '/pendencias-cd', label: 'CD', icon: 'fa fa-gavel', badge: 3 }
    ])
    const state = reactive({
      tab: ''
    })
    return { module, tabs, state }
  }
})
</script>
