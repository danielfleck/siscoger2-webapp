<template>
  <q-toggle
    v-bind="$attrs"
    v-on="$listeners"
    ref="root"
    v-model="_value"
    :label="label"
    @input="confirm"
    hide-bottom-space
    :dense="denseVal"
  />
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineComponent, computed, reactive, toRefs, watch } from '@vue/composition-api'
import { localePTBR } from 'src/config/app'
import { confirm } from 'src/services'
import { getDense } from 'src/store/utils'

export default defineComponent({
  name: 'Prioridade',
  props: {
    label: {
      type: String,
      default: 'Prioritário'
    },
    value: {
      type: Boolean,
      default: false
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
      localePTBR
    })

    const functions = {
      validate () {
        vars.validable = true
        refs.root.validate()
        return vars.isValid
      },
      confirm (val: boolean) {
        if (val) {
          root.$q.dialog(confirm({ message: 'Você tem certeza que esse procedimento é prioritário?', cancel: true }))
          .onOk(() => { vars._value = val })
          .onCancel(() => { vars._value = !val })
        }
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
