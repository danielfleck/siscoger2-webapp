<template>
  <q-card class="col-12" flat>
    <q-card-section class="row">
      <div class="q-pa-xs col-12">{{ label }}</div>
      <div class="q-pa-xs col-3">
        <InputText label="RG" ref="rg" v-model="register.rg" required/>
      </div>
      <div class="q-pa-xs col-3">
        <InputText label="Nome" :disable="disabled" v-model="register.nome" ref="nome" required/>
      </div>
      <div class="q-pa-xs col-3">
        <PostoGrad v-model="register.cargo" :disable="disabled" ref="cargo" required/>
      </div>
      <div class="q-pa-xs col-3">
         <q-btn-group spread>
          <!-- <q-btn :label="disabled ? 'Liberar' : 'Bloquear'" :icon=" disabled ? 'fa fa-lock' : 'fa fa-lock-open'" @click="disabled = !disabled"/>
          <q-btn v-if="requireds && register.id" label="Substituir" icon="fa fa-sync"/> -->
          <BtnStack :label="disabled ? 'Liberar' : 'Bloquear'" :icon=" disabled ? 'fa fa-lock' : 'fa fa-lock-open'" @click="disabled = !disabled"/>
          <BtnStack v-if="requireds && register.id" label="Substituir" icon="fa fa-sync" />
        </q-btn-group>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { defineComponent, reactive, toRefs, computed } from '@vue/composition-api'
import { postograd } from 'src/config/selects'
import { validate } from 'src/libs/validator'
import { post, put } from 'src/libs/api'

import InputRG from 'components/form/InputRG.vue'
import InputText from 'components/form/InputText.vue'
import PostoGrad from 'components/form/PostoGrad.vue'
import BtnStack from 'components/form/BtnStack.vue'
import { getDense } from 'src/store/utils'

const fields = ['rg', 'nome', 'cargo']

declare interface Register {
  id?: number
  rg: string
  nome: string
  cargo: string
  situacao: string
}
const moduleName = 'envolvidos'
export default defineComponent({
  name: 'Membro',
  components: {
    InputRG,
    InputText,
    PostoGrad,
    BtnStack
  },
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      required: true
    }
  },
  setup (props, { root, refs, emit }) {
    const vars = reactive({
      register: {
        rg: '',
        nome: '',
        cargo: '',
        situacao: props.label
      } as Register,
      validable: false,
      disabled: true,
      postograd
    })

    const computeds = {
      _value: computed({
        get: () => props.value,
        set: () => { emit('input', computeds.isValid); return true }
      }),
      isValid: computed(() => {
        if (computeds.anyTouched) return false
        if (props.required && !computeds.requireds) {
          return false
        }
        return true
      }),
      requireds: computed(() => Boolean(vars.register.rg) && Boolean(vars.register.nome) && Boolean(vars.register.cargo)),
      anyTouched: computed(() => Boolean(vars.register.rg) || Boolean(vars.register.nome) || Boolean(vars.register.cargo))
    }

    const functions = {
      validate () {
        return validate(refs, fields)
      },
      async loadData (): Promise<void> {
        const response = await post(`${moduleName}/search`, props.data, { silent: true })
        vars.register = response.length || response[0]
      },
      async handleSubmit (): Promise<void> {
        if (this.validate()) {
          if (vars?.register?.id) await this.update(vars?.register?.id)
          else await this.create()
        }
      },
      async create (): Promise<void> {
        await post(moduleName, vars.register, { silent: true })
      },
      async update (id: number): Promise<void> {
        await put(`${moduleName}/${id}`, vars.register, { silent: true })
      }
    }

    return {
      ...toRefs(vars),
      ...computeds,
      ...functions,
      denseVal: computed(() => getDense(root))
    }
  }
})
</script>
