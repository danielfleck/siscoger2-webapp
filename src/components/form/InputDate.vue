<template>
  <q-input
  stack-label
  type="date"
  hide-bottom-space
  :dense="denseVal"
  outlined
  v-model="_value"
  :label="label"
  ref="root"
  @blur="validable = true"
  @validate="validate"
  :error-message="errorMsg"
  :error="!isValid"
  :disable="disable"
  />
  <!-- <q-input
    hide-bottom-space
    :dense="denseVal"
    outlined
    clearable
    v-model="_value"
    :label="label"
    ref="root"
    @blur="validable = true"
    @validate="validate"
    :error-message="errorMsg"
    :error="!isValid"
    :disable="disable"
    >
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy
          ref="qDateProxy"
          transition-show="scale"
          transition-hide="scale"
          >
          <q-date
          minimal
          v-model="_value"
          :locale="localePTBR"
          @input="closeCalendar"
          mask="DD/MM/YYYY"
          />
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input> -->
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { defineComponent, computed, reactive, toRefs, watch } from '@vue/composition-api'
import { localePTBR } from 'src/config/app'
import { changeDate, Locales } from 'src/filters'
import { getDense } from 'src/store/utils'
// import { getCurrentDate } from 'src/filters/date'

export default defineComponent({
  name: 'InputDate',
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: [String, Date],
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
        get: () => functions.castDate(props.value, 'fr-ca'),
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
      resetValidation () {
        vars.validable = false
        refs.root.resetValidation()
        return vars.isValid
      },
      openCalendar () {
        refs.qDateProxy.show()
      },
      closeCalendar () {
        refs.qDateProxy.hide()
      },
      getDate (): void {
        if (!props.value && props.defaultToday) {
          vars._value = new Date().toISOString()
        }
      },
      castDate (date: any, type: Locales) {
        const casted = changeDate(date, type)
        return casted
      }
    }

    functions.getDate()

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
