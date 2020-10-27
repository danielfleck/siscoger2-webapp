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
import {
  andamentoCogerFATD,
  andamentoCogerIPM,
  andamentoCogerSindicancia,
  andamentoCogerCD,
  andamentoCogerCJ,
  andamentoCogerADL,
  andamentoCogerISO,
  andamentoCogerIT,
  andamentoCogerPAD,
  andamentoCogerSAI,
  andamentoCogerDesercao,
  andamentoCogerAPFD,
  Option
} from 'src/config/selects'
import { getDense } from 'src/store/utils'

export default defineComponent({
  name: 'PostoGrad',
  props: {
    label: {
      type: String,
      default: 'Andamento'
    },
    type: {
      type: String,
      default: 'sindicancia'
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
      options: [] as Option[]
    })

    const functions = {
      validate () {
        vars.validable = true
        refs.root.validate()
        return vars.isValid
      },
      getOptions () {
        const type = props.type.toLowerCase()
        switch (type) {
          case 'fatd': vars.options = andamentoCogerFATD; return true
          case 'ipm': vars.options = andamentoCogerIPM; return true
          case 'sindicancia': vars.options = andamentoCogerSindicancia; return true
          case 'cd': vars.options = andamentoCogerCD; return true
          case 'cj': vars.options = andamentoCogerCJ; return true
          case 'adl': vars.options = andamentoCogerADL; return true
          case 'iso': vars.options = andamentoCogerISO; return true
          case 'it': vars.options = andamentoCogerIT; return true
          case 'pad': vars.options = andamentoCogerPAD; return true
          case 'sai': vars.options = andamentoCogerSAI; return true
          case 'desercao': vars.options = andamentoCogerDesercao; return true
          case 'apfd': vars.options = andamentoCogerAPFD; return true
          default: vars.options = andamentoCogerSindicancia; return true
        }
      }
    }

    functions.getOptions()

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
