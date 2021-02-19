<template>
  <q-tab-panel name="andamento">
    <abertura />
    <prazos />
  </q-tab-panel>
</template>

<script lang="ts">
/* eslint-disable no-void */
import { defineComponent } from '@vue/composition-api'
import Table from 'components/pages/Table.vue'
import Prazos from './Prazos.vue'
import Abertura from './Abertura.vue'

export default defineComponent({
  name: 'DashboardCD',
  components: { Table, Abertura, Prazos }
})
</script>
