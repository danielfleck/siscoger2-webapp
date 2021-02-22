<template>
  <q-select
  v-model="_value"
  :options="options"
  use-input
  hide-selected
  fill-input
  input-debounce="0"
  hide-bottom-space
  clearable 
  outlined
  emit-value
  map-options
  :dense="denseVal"
  :label="label"
  ref="root"
  @blur="validable = true"
  @validate="validate"
  @filter="filterFn"
  :error-message="errorMsg"
  :error="!isValid"
  :disable="disable"
  />
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineComponent, computed, reactive, toRefs, watch } from '@vue/composition-api'
import { opms } from 'src/config/opms'
import { getDense } from 'src/store/utils'

export default defineComponent({
  name: 'OPM',
  props: {
    label: {
      type: String,
      default: 'Opm'
    },
    value: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { root, emit, refs }) {
    const vars = reactive({
      errorMsg: '',
      validable: false,
      options: opms,
      denseVal: computed(() => getDense(root)),
      isValid: computed(() => {
        if (!vars.validable) return true
        if (props.required && !vars._value) {
          vars.errorMsg = `${props.label} é obrigatória`
          return false
        }
        return true
      }),
      _value: computed({
        get: () => props.value,
        set: value => emit('input', value)
      })
    })

    const functions = {
      validate () {
        vars.validable = true
        refs.root.validate()
        return vars.isValid
      },
      filterFn (val: string, update: any, abort: any) {
      update(() => {
        const needle = val.toLocaleLowerCase()
        vars.options = opms.filter(v => v.label.toLocaleLowerCase().indexOf(needle) > -1)
      })
    },
    }

    watch(() => vars._value, () => (vars.validable = true))

    return {
      ...toRefs(vars),
      ...functions
    }
  }
})
</script>

<style>

</style>
