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
            @click="load(tab)"
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

type Link = {
  link: string | undefined
  label: string | undefined
}

export default defineComponent({
  name: 'Index',
  components: { Breadcrumbs },
  setup (_, { root }) {
    const vars = reactive({
      module: 'apfd',
      breadcrumbs: [] as Link[],
      tabs: [
        { link: '/apfd/lista', label: 'Consulta' },
        { link: '/apfd/rel_situacao', label: 'Rel.  Situação' },
        { link: '/apfd/andamento', label: 'Andamento' },
        { link: '/apfd/resultado', label: 'Resultado' },
        { link: '/apfd/prazos', label: 'Prazos' },
        { link: '/apfd/apagados', label: 'Apagados' }
      ] as Link[],
      tab: 'Lista'
    })
    const functions = {
      onClick () {
        console.log('clicked')
      },
      load (tab:Link) {
        vars.breadcrumbs = []
        const { label, link } = tab
        vars.breadcrumbs.push({ label, link })
      }
    }

    functions.load({ link: '/apfd/lista', label: 'Lista' })

    return {
      ...toRefs(vars),
      ...functions,
      fab: computed(() => getFab(root))
    }
  }
})
</script>
