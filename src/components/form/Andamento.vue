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
            vars.options = andamentoFATD
          case 'ipm':
            vars.options = andamentoIPM
          case 'sindicancia':
            vars.options = andamentoSindicancia
          case 'cd':
            vars.options = andamentoCD
          case 'cj':
            vars.options = andamentoCJ
          case 'adl':
            vars.options = andamentoADL
          case 'iso':
            vars.options = andamentoISO
          case 'it':
            vars.options = andamentoIT
          case 'pad':
            vars.options = andamentoPAD
          case 'sai':
            vars.options = andamentoSAI
        
          default:
            vars.options = andamentoSindicancia
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