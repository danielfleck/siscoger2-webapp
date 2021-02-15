<template>
  <q-item clickable v-close-popup tabindex="0">
    <q-item-section avatar>
      <q-toggle v-model="dark" label="Modo escuro" />
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'

const DarkMode = defineComponent({
  name: 'CompactForm',
  setup (_, { root }) {
    return {
      dark: computed({
        get: () => root.$q.dark.isActive,
        set: () => root.$q.dark.toggle()
      })
    }
  }
})

export default DarkMode
</script>

<style >

</style>
