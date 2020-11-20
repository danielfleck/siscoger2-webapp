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
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { defineComponent, computed, toRefs, reactive, watch } from '@vue/composition-api'
import {
  andamentoFATD,
  andamentoIPM,
  andamentoSindicancia,
  andamentoCD,
  andamentoCJ,
  andamentoADL,
  andamentoISO,
  andamentoIT,
  andamentoPAD,
  andamentoSAI,
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
      type: [String, Number],
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
        get: () => functions.getAndamento(props.value),
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
      getAndamento (value: string|number): string {
        const options = vars.options as unknown as string[]
        return options[Number(value)] ?? 'ANDAMENTO'
      },
      getOptions () {
        const type = props.type.toLowerCase()
        switch (type) {
          case 'fatd':
            vars.options = andamentoFATD
            return true
          case 'ipm':
            vars.options = andamentoIPM
            return true
          case 'sindicancia':
            vars.options = andamentoSindicancia
            return true
          case 'cd':
            vars.options = andamentoCD
            return true
          case 'cj':
            vars.options = andamentoCJ
            return true
          case 'adl':
            vars.options = andamentoADL
            return true
          case 'iso':
            vars.options = andamentoISO
            return true
          case 'it':
            vars.options = andamentoIT
            return true
          case 'pad':
            vars.options = andamentoPAD
            return true
          case 'sai':
            vars.options = andamentoSAI
            return true

          default:
            vars.options = andamentoSindicancia
            return true
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
