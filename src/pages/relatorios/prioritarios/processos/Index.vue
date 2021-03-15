<template>
  <q-tab-panel name="procedimentos">
    <Adl />
    <Cd />
    <Cj />
    <Fatd />
    <Pad />
  </q-tab-panel>
</template>

<script lang="ts">

import { defineComponent } from '@vue/composition-api'
import Adl from './Adl.vue'
import Cd from './Cd.vue'
import Cj from './Cj.vue'
import Fatd from './Fatd.vue'
import Pad from './Pad.vue'

export default defineComponent({
  name: 'procedimentos',
  components: { Adl, Cd, Cj, Fatd, Pad }
})
</script>
