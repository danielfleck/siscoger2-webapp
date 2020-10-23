<template>
  <q-input
    hide-bottom-space
    clearable
    v-model="_value"
    :dense="denseVal"
    outlined
    :label="label"
    ref="root"
    type="number"
    @blur="validable = true"
    @validate="validate"
    :error-message="errorMsg"
    :error="!isValid"
    :disable="disable"
    :autogrow="autogrow"
    />
</template>

<script lang="ts">
import { defineComponent, computed, reactive, toRefs, watch } from '@vue/composition-api'

export default defineComponent({
  name: 'InputText',
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      default: 0
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
