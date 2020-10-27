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
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineComponent, computed } from '@vue/composition-api'
import { getDense } from 'src/store/utils'

export default defineComponent({
  name: 'InputDate',
  props: {
    label: {
      type: String,
      required: true
    },
    icon: {
      type: String
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
    }
  },
  setup (props, { root }) {
    return {
      denseVal: computed(() => getDense(root))
    }
  }
})
</script>

<style>

</style>
