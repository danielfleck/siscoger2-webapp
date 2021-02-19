<template>
  <q-tab-panel name="ipm">
    <abertura />
    <prazos />
  </q-tab-panel>
</template>

<script lang="ts">
/* eslint-disable no-void */
import { defineComponent } from '@vue/composition-api'
import Table from 'components/pages/Table.vue'
import Abertura from './Abertura.vue'
import Prazos from './Prazos.vue'

export default defineComponent({
  name: 'DashboardIPM',
  components: { Table, Abertura, Prazos }
})
</script>
