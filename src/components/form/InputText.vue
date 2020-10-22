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
    :mask="mask"
    >
    <template v-slot:prepend v-if="tooltip">
      <q-icon color="grey-9" name="fa fa-question-circle" >
        <q-tooltip>
          {{tooltip}}
        </q-tooltip>
      </q-icon>
    </template>
  </q-input>
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
      type: [String, Number],
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    minLength: {
      type: Number,
      default: 0
    },
    disable: {
      type: Boolean,
      default: false
    },
    autogrow: {
      type: Boolean,
      default: false
    },
    mask: {
      type: String
    },
    tooltip: {
      type: String,
      default: ''
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
        if (props.minLength && String(vars._value).length < props.minLength) {
          vars.errorMsg = `${props.label} é deve ter no mínimo ${props.minLength} caracteres`
          return false
        }
        return true
      }),
      _value: computed({
        get: () => props.value,
        set: value => emit('input', value)
      }),
    })

    const functions = {
      validate () {
        vars.validable = true
        refs.root.validate()
        return vars.isValid
      }
    }

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
