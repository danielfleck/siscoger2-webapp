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
  :option-value="optionValue"
  :option-label="optionLabel"
  :use-chips="useChips"
  :stack-label="stackLabel"
  :multiple="multiple"
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

export default defineComponent({
  name: 'PostoGrad',
  props: {
    label: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      default: []
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
    optionValue: {
      type: String
    },
    optionLabel: {
      type: String
    },
    useChips: {
      type: Boolean
    },
    stackLabel: {
      type: Boolean
    },
    multiple: {
      type: Boolean
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
      })
    })

    const functions = {
      validate () {
        vars.validable = true
        refs.root.validate()
        return vars.isValid
      }
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
