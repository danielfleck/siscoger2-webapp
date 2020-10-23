<template>
  <div>
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
      @input="checkDuplicated"
      :error-message="errorMsg"
      :error="!isValid"
      :disable="disable"
      :autogrow="autogrow"
      mask="####/##"
      />
    <q-dialog ref="dialog" persistent >
      <q-card >
        <q-card-section >
          <div class="text-h5 text-bold">
            <q-icon name="warning" class="text-red" size="lg"/>
            ATENÇÃO
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none text-h6">
          <p>
            Já existe a {{msg.proc}} n°{{msg.sjd_ref}}/{{msg.sjd_ref_ano}} com o mesmo número de portaria,
            possivelmente esta nova inserção será uma duplicação,
            gostaria mesmo assim inserir outro procedimento com o mesmo número?
          </p>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn label="Não" v-close-popup color="positive" to="/" />
          <q-btn label="Sim" v-close-popup color="negative" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, toRefs, watch } from '@vue/composition-api'
import { toLowercase, ucFirst } from 'src/filters'
import { post } from 'src/libs/api'

export default defineComponent({
  name: 'InputPortaria',
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: ''
    },
    proc: {
      type: String,
      default: ''
    },
    cdopm: {
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
      }),
      msg: {
        proc: '',
        sjd_ref: '',
        sjd_ref_ano: ''
      }
    })

    const functions = {
      validate () {
        vars.validable = true
        refs.root.validate()
        return vars.isValid
      },
      async checkDuplicated (value: string) {
        if (props.proc && props.cdopm) {
          const proc = toLowercase(props.proc, true)
          const response = await post(`${proc}/portarias`, {
            cdopm: props.cdopm,
            portaria_numero: value
          })

          if (response) {
            refs.dialog.show()
            vars.msg = {
              proc: ucFirst(props.proc),
              ...response
            }
          }
        }
      }
    }

    watch(() => vars._value, () => vars.validable = true)
    watch(() => props.cdopm, () => functions.checkDuplicated(vars._value))

    return {
      ...toRefs(vars),
      ...functions
    }
  }
})
</script>

<style>

</style>
