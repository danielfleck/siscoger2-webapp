<template>
  <q-btn-dropdown stretch flat dropdown-icon="fas fa-bell" no-icon-animation>
    <template v-slot:label v-if="total">
      <q-badge color="negative" floating>{{ total }}</q-badge>
    </template>
    <q-list>
      <q-item-label header>Pendências</q-item-label>
      <HeadPendences
        v-for="pendence in pendences"
        :key="pendence.label"
        :label="pendence.label"
        :link="pendence.label === 'gerais' ? '/' : `/pendencias-${pendence.label}`"
        :qtd="pendence.qtd"
      />
    </q-list>
  </q-btn-dropdown>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { getPendence } from 'src/services'
import HeadPendences from './Pendences.vue'

const Pendences = defineComponent({
  name: 'HeaderMenu',
  components: { HeadPendences },
  setup () {
    const pendences = ref([
      { label: 'cd', qtd: 0 },
      { label: 'fatd', qtd: 0 },
      { label: 'gerais', qtd: 0 },
      { label: 'ipm', qtd: 0 },
      { label: 'sindicancia', qtd: 0 }
    ])

    const total = ref(0)

    function loadData () {
      const store = getPendence('total-pendences')
      if (store) {
        pendences.value = Object.entries(store).map(([key, value]) => {
          total.value += value
          return {
            label: key,
            qtd: +value
          }
        })
      }
      console.log(total)
    }

    loadData()

    return {
      pendences,
      total
    }
  }
})

export default Pendences
</script>

<style >

</style>
