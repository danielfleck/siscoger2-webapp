<template>
  <q-select
  :dense="denseVal"
  hide-bottom-space
  clearable
  outlined
  v-model="_value"
  emit-value
  map-options
  :options="options"
  ref="root"
  :label="label"
  @blur="validable = true"
  @validate="validate"
  :error-message="errorMsg"
  :error="!isValid"
  :disable="disable"
  />
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineComponent, computed, toRefs, reactive, watch } from '@vue/composition-api'
import { getDense } from 'src/store/utils'

declare type Mixed = number | string
export default defineComponent({
  name: 'InputAno',
  props: {
    label: {
      type: String,
      default: 'Ano'
    },
    value: {
      default: ''
    },
    disable: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    select: {
      type: Boolean,
      default: false
    },
    all: {
      type: Boolean,
      default: false
    },
    start: {
      type: Number,
      default: 2007
    },
    end: {
      type: Number,
      default: () => new Date().getFullYear()
    }
  },
  setup (props, { root, emit, refs }) {
    const vars = reactive({
      errorMsg: '',
      validable: false,
      denseVal: computed(() => getDense(root)),
      isValid: computed(() => {
        if (!vars.validable) return true
        if (props.required && !vars._value) {
          vars.errorMsg = `${props.label} é obrigatório`
          return false
        }
        return true
      }),
      _value: computed({
        get: () => props.value,
        set: value => emit('input', value)
      }),
      options: [] as Mixed[]
    })

    const functions = {
      validate () {
        vars.validable = true
        refs.root.validate()
        return vars.isValid
      },
      getOptions () {
        const start = props.end || new Date().getFullYear()
        const end = props.start || 2007
        const tam = start - end
        const options: Mixed[] = Array.from({ length: tam }, (value, index) => start - index)
        if (props.select) options.unshift('')
        if (props.all) options.unshift('todos')
        vars.options = options
        return true
      }
    }
    watch(() => vars._value, () => (vars.validable = true))
    functions.getOptions()

    return {
      ...toRefs(vars),
      ...functions
    }
  }
})
</script>

<style>

</style>
