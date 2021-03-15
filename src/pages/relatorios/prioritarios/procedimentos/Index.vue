<template>
  <q-tab-panel name="procedimentos">
    <Apfd />
    <Desercao />
    <Ipm />
    <Iso />
    <It />
    <Sindicancia />
  </q-tab-panel>
</template>

<script lang="ts">

import { defineComponent } from '@vue/composition-api'
import Apfd from './Apfd.vue'
import Desercao from './Desercao.vue'
import Ipm from './Ipm.vue'
import Iso from './Iso.vue'
import It from './It.vue'

export default defineComponent({
  name: 'procedimentos',
  components: { Apfd, Desercao, Ipm, Iso, It }
})
</script>
