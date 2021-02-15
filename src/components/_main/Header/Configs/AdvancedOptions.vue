<template>
  <q-item clickable v-close-popup tabindex="0">
    <q-item-section avatar>
      <q-toggle v-model="fab" label="Opções avançadas" />
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { getFab } from 'src/store/utils'
import { defineComponent, computed } from '@vue/composition-api'

const AdvancedOptions = defineComponent({
  name: 'AdvancedOptions',
  setup (_, { root }) {
    return {
      fab: computed({
        get: () => getFab(root),
        set: () => root.$store.dispatch('configs/toogleFab')
      })
    }
  }
})

export default AdvancedOptions
</script>

<style >

</style>
