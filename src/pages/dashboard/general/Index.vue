<template>
  <q-tab-panel name="geral">
    <transferencias />
    <comportamento />
  </q-tab-panel>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Table from 'components/pages/Table.vue'
import Comportamento from './Comportamento.vue'
import Transferencias from './Transferencias.vue'

export default defineComponent({
  name: 'DashboardGeneral',
  components: { Table, Transferencias, Comportamento }
})
</script>
