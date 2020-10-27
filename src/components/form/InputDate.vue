<template>
  <q-input
    hide-bottom-space
    :dense="denseVal"
    outlined
    clearable
    v-model="_value"
    :label="label"
    mask="##/##/####"
    v-bind="$attrs"
    v-on="$listeners"
    ref="root"
    @blur="validable = true"
    @validate="validate"
    :error-message="errorMsg"
    :error="!isValid"
    :disable="disable"
    >
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
          <q-date
          :locale="localePTBR"
          v-model="_value"
          @input="closeCalendar"
          today-btn
          mask="DD/MM/YYYY"/>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineComponent, computed, reactive, toRefs, watch } from '@vue/composition-api'
import { localePTBR } from 'src/config/app'
import { changeDate, Locales } from 'src/filters'
import { getDense } from 'src/store/utils'
import { getCurrentDate } from 'src/utils/mockValues'

export default defineComponent({
  name: 'InputDate',
  props: {
    label: {
      type: String,
      required: true
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
    defaultToday: {
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
        get: () => functions.castDate(props.value, 'pt-br'),
        set: value => emit('input', functions.castDate(value, 'fr-ca'))
      }),
      localePTBR
    })

    const functions = {
      validate () {
        vars.validable = true
        refs.root.validate()
        return vars.isValid
      },
      closeCalendar () {
        refs.qDateProxy.hide()
      },
      getCurrentDate () {
        if (props.defaultToday) vars._value = getCurrentDate()
        return null
      },
      castDate (date: any, type: Locales) {
        return changeDate(date, type)
      }
    }

    functions.getCurrentDate()

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
