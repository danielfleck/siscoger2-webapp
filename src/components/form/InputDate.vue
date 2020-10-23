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
import { defineComponent, computed, reactive, toRefs, watch } from '@vue/composition-api'
import { localePTBR } from 'src/config/app'
import { changeDate } from 'src/filters'
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
        set: value => emit('input', functions.castDate(value))
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
      castDate (date: any) {
        return changeDate(date, 'fr-ca')
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
