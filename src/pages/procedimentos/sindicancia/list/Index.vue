<template>
  <q-page class="doc-container q-pa-md">
    <q-card flat>
      <q-card-section>
        <Breadcrumbs :breadcrumbs="breadcrumbs"/>
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
          <q-route-tab
            v-for="tab in tabs"
            :to="tab.link"
            :label="tab.label"
            :key="tab.label"
          />
        </q-tabs>
        <transition mode="out-in">
          <router-view />
        </transition>
      </q-card-section>
    </q-card>
    <q-page-sticky v-if="fab" position="bottom-right" :offset="[18, 18]">
      <q-fab color="amber" text-color="black" icon="keyboard_arrow_left" direction="left">
        <q-fab-action label="Filtro avançado" color="primary" text-color="white" @click="onClick" icon="fa fa-filter" />
      </q-fab>
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts">
import Breadcrumbs from 'components/pages/Breadcrumbs.vue'
import { defineComponent, toRefs, reactive, computed } from '@vue/composition-api'
import { getFab } from 'src/store/utils'

export default defineComponent({
  name: 'Index',
  components: { Breadcrumbs },
  setup (_, { root }) {
    const vars = reactive({
      module: 'sindicancias',
      breadcrumbs: [
        { label: 'Sindicância', link: '/sindicancia' }
      ],
      tabs: [
        { link: '/sindicancias/lista', label: 'Lista' },
        { link: '/sindicancias/andamento', label: 'Andamento' },
        { link: '/sindicancias/prazos', label: 'Prazos' },
        { link: '/sindicancias/rel_situacao', label: 'Rel.  Situação' },
        { link: '/sindicancias/resultado', label: 'Resultado' },
        { link: '/sindicancias/apagados', label: 'Apagados' }
      ],
      tab: 'lista'
    })
    const functions = {
      onClick () {
        console.log('clicked')
      }
    }
    return {
      ...toRefs(vars),
      ...functions,
      fab: computed(() => getFab(root))
    }
  }
})
</script>
