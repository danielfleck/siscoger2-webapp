<template>
  <div :class="full ? `q-pa-${pa} col-12` : `q-pa-${pa} col-lg-${lg} col-md-${md} col-xs-${xs}`">
    <slot></slot>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'DivForm',
  props: {
    pa: {
      type: String,
      default: 'md'
    },
    lg: {
      type: Number,
      default: 4
    },
    md: {
      type: Number,
      default: 6
    },
    xs: {
      type: Number,
      default: 12
    },
    full: {
      type: Boolean,
      default: false
    }
  }
})
</script>
<style>

</style>
