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
    :type="isPwd ? 'password' : 'text'"
    :placeholder="placeholder"
    >
    
    <template v-slot:prepend>
      <q-icon :color="iconColor" :name="icon" />
    </template>
    <template v-slot:append>
      <q-icon
        color="grey-9"
        :name="isPwd ? 'visibility_off' : 'visibility'"
        class="cursor-pointer"
        @click="isPwd = !isPwd"
      />
    </template>

  </q-input>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineComponent, computed, reactive, toRefs, watch } from '@vue/composition-api'
import { getDense } from 'src/store/utils'

export default defineComponent({
  name: 'InputText',
  props: {
    label: {
      type: String,
      required: true
    },
    placeholder: {
      type: String
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
    icon: {
      type: String,
      default: 'vpn_key'
    },
    iconColor: {
      type: String,
      default: 'grey-9'
    },
    lorem: {
      type: Number,
      default: 0
    }
  },
  setup (props, { root, emit, refs }) {
    const vars = reactive({
      isPwd: true,
      errorMsg: '',
      validable: false,
      denseVal: computed(() => getDense(root)),
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
