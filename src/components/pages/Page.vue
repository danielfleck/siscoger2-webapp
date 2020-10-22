<template>
  <q-page class="doc-container q-pa-md">
    <q-card flat>
      <q-card-section>
        <Breadcrumbs :breadcrumbs="breadcrumbs"/>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <slot/>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import Breadcrumbs from 'components/pages/Breadcrumbs.vue'

export default defineComponent({
  name: 'Page',
  components: { Breadcrumbs },
  props: {
    breadcrumbs: {
      type: Array,
      required: true
    }
  }
})
</script>
