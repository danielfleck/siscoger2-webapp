<template>
  <q-input
    hide-bottom-space
    clearable
    v-model="_value"
    :dense="denseVal"
    outlined
    :label="label"
    ref="root"
    @blur="validable = true"
    @validate="validate"
    :error-message="errorMsg"
    :error="!isValid"
    :disable="disable"
    :autogrow="autogrow"
    mask="############"
    />
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineComponent, computed, reactive, toRefs, watch } from '@vue/composition-api'
import { getDense } from 'src/store/utils'

export default defineComponent({
  name: 'InputRG',
  props: {
    label: {
      type: String,
      default: 'RG'
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
    },
    autogrow: {
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
