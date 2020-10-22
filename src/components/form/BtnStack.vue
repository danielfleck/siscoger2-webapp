<template>
  <q-btn 
  :dense="denseVal"
  :stack="!denseVal"
  :label="label"
  :icon="icon"
  :disable="disable"
  :loading="loading"
  @click="$emit('click')"
  />
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { localePTBR } from 'src/config/app'

export default defineComponent({
  name: 'InputDate',
  props: {
    label: {
      type: String,
      required: true
    },
    icon: {
      type: String,
    },
    required: {
      type: Boolean,
      default: false
    },
    disable: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
  },
  setup (props, { root }) {
    return {
      denseVal: computed(() => root.$store.state.configs.dense)
    }
  }
})
</script>

<style>

</style>