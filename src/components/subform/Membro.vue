<template>
  <q-card class="col-12" flat>
    <q-card-section class="row">
      <div class="q-pa-xs col-12">{{ label }}</div>
      <div class="q-pa-xs col-3">
        <InputText label="RG" ref="rg" :disable="submeted" v-model="register.rg" required/>
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
          <BtnStack v-if="!submeted" :label="disabled ? 'Liberar' : 'Bloquear'" :icon=" disabled ? 'fa fa-lock' : 'fa fa-lock-open'" @click="toogleDisable"/>
          <BtnStack v-if="requireds && submeted" label="Substituição" icon="fa fa-sync" @click="replace(register)"/>
          <BtnStack v-if="toReplace" label="Substituir" icon="fa fa-plus" @click="update(register)"/>
          <BtnStack :disable="submeted" v-else label="Inserir" icon="fa fa-plus" @click="create"/>
        </q-btn-group>
      </div>
    </q-card-section>
    <q-expansion-item
      v-if="registers.length"
      :label="`${label} - lista`"
      default-opened
      :caption="`Total: ${registers.length}`"
      >
      <q-card-section class="row">
        <q-list bordered separator class="q-pa-xs col-12">
          <q-item clickable v-ripple >
            <q-item-section>RG</q-item-section>
            <q-item-section>Nome</q-item-section>
            <q-item-section>Posto/Grad</q-item-section>
            <q-item-section>Substituto</q-item-section>
          </q-item>
          <q-item clickable v-ripple v-for="(membro, i) in registers" :key="i">
            <q-item-section>{{membro.rg}}</q-item-section>
            <q-item-section>{{membro.nome}}</q-item-section>
            <q-item-section>{{membro.cargo}}</q-item-section>
            <q-item-section>{{membro.rg_substituto || 'Não há'}}</q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-expansion-item>
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
import { confirmMsg } from 'src/libs/dialog'

const fields = ['rg', 'nome', 'cargo']

declare interface Register {
  id?: number
  rg: string
  nome: string
  cargo: string
  situacao: string
  rg_substituto: string
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
      type: [String, Number, Boolean, Object],
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
    const cleanRegister = {
      id: 0,
      rg: '',
      nome: '',
      cargo: '',
      resultado: '',
      situacao: props.label,
      rg_substituto: ''
    } as Register

    const vars = reactive({
      register: {
        rg: '',
        nome: '',
        cargo: '',
        situacao: props.label
      } as Register,
      registers: [] as Array<Register>,
      validable: false,
      disabled: true,
      submeted: false,
      toReplace: false,
      postograd
    })

    const computeds = {
      _value: computed({
        get: () => String(props.value),
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
      toogleDisable () {
        vars.disabled = !vars.disabled
        if (vars.submeted) vars.submeted = false
      },
      getCurrent (response: Register[]) {
        if (!response.length) return cleanRegister
        const filtered = response.filter(r => !r.rg_substituto)
        if (filtered) {
          vars.submeted = true
          return filtered[0]
        }
      },
      async loadData (): Promise<void> {
        const response = await post(`${moduleName}/search`, props.data, { silent: true })
        vars.registers = response
        vars.register = this.getCurrent(response)
        console.log(vars.register)
      },
      async create (): Promise<boolean> {
        vars.disabled = true
        vars.submeted = true

        const data = { ...vars.register, ...props.data }
        const response = await post(moduleName, data, { silent: true, complete: true, debug: true })
        return !!response.success
      },
      async update (register: Register): Promise<boolean> {
        if (vars?.register?.id) {
          const { id } = vars.register
          vars.disabled = true
          vars.submeted = true

          const data = { ...vars.register, ...props.data }
          const response = await put(`${moduleName}/${id}`, data, { silent: true, complete: true, debug: true })
          return !!response.success
        }
        return false
      },
      async replace (register: Register):Promise<boolean> {
        root.$q.dialog(confirmMsg).onOk(async () => {
          vars.register = cleanRegister
          vars.toReplace = true
          console.log('here')
        })
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    functions.loadData()

    return {
      ...toRefs(vars),
      ...computeds,
      ...functions,
      denseVal: computed(() => getDense(root))
    }
  }
})
</script>
