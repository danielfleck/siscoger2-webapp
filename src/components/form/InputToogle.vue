<template>
  <div>
    <q-toggle
      v-bind="$attrs"
      v-on="$listeners"
      ref="root"
      v-model="_value"
      :label="label"
      hide-bottom-space
      :dense="denseVal"
    />
    <q-icon v-if="tooltip" :color="iconColor" name="fa fa-question-circle" >
    <q-tooltip>
      {{tooltip}}
    </q-tooltip>
  </q-icon>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineComponent, computed, reactive, toRefs, watch } from '@vue/composition-api'
import { localePTBR } from 'src/config/app'
import { getDense } from 'src/store/utils'

export default defineComponent({
  name: 'InputToogle',
  props: {
    label: {
      type: String
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
    },
    tooltip: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    iconColor: {
      type: String,
      default: 'grey-9'
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
          vars.errorMsg = `${String(props.label)} é obrigatório`
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
