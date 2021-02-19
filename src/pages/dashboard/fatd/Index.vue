<template>
  <q-tab-panel name="fatd">
    <Abertura />
    <Prazos />
    <Punicao />
  </q-tab-panel>
</template>

<script lang="ts">
/* eslint-disable no-void */
import { defineComponent } from '@vue/composition-api'
import Table from 'components/pages/Table.vue'
import Abertura from './Abertura.vue'
import Prazos from './Prazos.vue'
import Punicao from './Punicao.vue'

export default defineComponent({
  name: 'DashboardFATD',
  components: { Table, Abertura, Prazos, Punicao }
})
</script>
