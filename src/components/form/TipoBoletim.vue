<template>
  <q-select
    hide-bottom-space
    clearable
    outlined
    v-model="_value"
    emit-value
    map-options
    :options="tipoBoletim"
    :dense="denseVal"
    :label="label"
    />
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineComponent, computed } from '@vue/composition-api'
import { tipoBoletim } from 'src/config/selects'
import { getDense } from 'src/store/utils'

export default defineComponent({
  name: 'TipoBoletim',
  props: {
    label: {
      type: String,
      default: 'Tipo de boletim'
    },
    value: {
      type: String,
      default: ''
    }
  },
  setup (props, { root, emit }) {
    return {
      tipoBoletim,
      denseVal: computed(() => getDense(root)),
      _value: computed({
        get: () => props.value,
        set: value => emit('input', value)
      })
    }
  }
})
</script>

<style>

</style>
