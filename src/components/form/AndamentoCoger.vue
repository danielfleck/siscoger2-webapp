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
    },
  },
  setup (props, { root, emit, refs }) {
    const vars = reactive({
      errorMsg: '',
      validable: false,
      denseVal: computed(() => root.$store.state.configs.dense),
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
          case 'fatd':
            vars.options = andamentoCogerFATD
          case 'ipm':
            vars.options = andamentoCogerIPM
          case 'sindicancia':
            vars.options = andamentoCogerSindicancia
          case 'cd':
            vars.options = andamentoCogerCD
          case 'cj':
            vars.options = andamentoCogerCJ
          case 'adl':
            vars.options = andamentoCogerADL
          case 'iso':
            vars.options = andamentoCogerISO
          case 'it':
            vars.options = andamentoCogerIT
          case 'pad':
            vars.options = andamentoCogerPAD
          case 'sai':
            vars.options = andamentoCogerSAI
          case 'desercao':
            vars.options = andamentoCogerDesercao
          case 'apfd':
            vars.options = andamentoCogerAPFD       
          default:
            vars.options = andamentoCogerSindicancia
        }
      }
    }

    void functions.getOptions()

    watch(() => vars._value, () => vars.validable = true)

    return {
      ...toRefs(vars),
      ...functions
    }
  }
})
</script>

<style>

</style>