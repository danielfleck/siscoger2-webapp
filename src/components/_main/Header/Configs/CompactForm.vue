<template>
  <q-item clickable v-close-popup tabindex="0">
    <q-item-section avatar>
      <q-toggle v-model="dense" label="Formulário Compacto" />
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { getDense } from 'src/store/utils'
import { defineComponent, computed } from '@vue/composition-api'

const CompactForm = defineComponent({
  name: 'CompactForm',
  setup (_, { root }) {
    return {
      dense: computed({
        get: () => getDense(root),
        set: () => root.$store.dispatch('configs/toogleDense')
      })
    }
  }
})

export default CompactForm
</script>

<style >

</style>
