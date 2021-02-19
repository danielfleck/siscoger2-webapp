<template>
  <q-tab-panel name="cd">
    <abertura />
    <prazos />
  </q-tab-panel>
</template>

<script lang="ts">
/* eslint-disable no-void */
import { defineComponent } from '@vue/composition-api'
import Prazos from './Prazos.vue'
import Abertura from './Abertura.vue'

export default defineComponent({
  name: 'DashboardCD',
  components: { Abertura, Prazos }
})
</script>
