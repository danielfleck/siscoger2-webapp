<template>
  <q-card class="col-xs-12 col-sm-6 col-md-3" :class="bg" >
    <q-card-section horizontal>
      <q-card-section>
        <q-icon :name="icon" :size="iconSize"/>
      </q-card-section>
      <q-card-section class="text-h5">
        {{ label }}
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'InfoBox',
  props: {

    icon: {
      type: String,
      default: ''
    },

    label: {
      type: String,
      default: ''
    },

    bg: {
      type: String,
      default: 'bg-blue-3'
    },

    iconSize: {
      type: String,
      default: 'xl' //  'xs', 'sm', 'md', 'lg', 'xl'
    }
  }
})
</script>

<style lang="sass" scoped>
.info-box
  width: 23.9%
</style>
