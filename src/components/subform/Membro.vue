<template>
  <q-card class="col-12" flat>
    <q-card-section class="row">
      <div class="q-pa-xs col-12">{{ label }}</div>
      <div class="q-pa-xs col-3">
        <InputText label="RG" ref="rg" mask="############" :disable="situation === 'inserted'" v-model="register.rg" required/>
      </div>
      <div class="q-pa-xs col-3">
        <InputText label="Nome" :disable="disabled" v-model="register.nome" ref="nome" required/>
      </div>
      <div class="q-pa-xs col-3">
        <PostoGrad v-model="register.cargo" :disable="disabled" ref="cargo" required/>
      </div>
      <div class="q-pa-xs col-3">
         <q-btn-group spread>
          <BtnStack v-if="situation === 'toInsert' || situation === 'toReplace'" :label="disabled ? 'Liberar' : 'Bloquear'" :icon=" disabled ? 'fa fa-lock' : 'fa fa-lock-open'" @click="toogleDisable"/>
          <BtnStack v-if="requireds && situation === 'inserted'" label="Substituição" icon="fa fa-sync" @click="toReplace(register)"/>
          <BtnStack v-if="situation === 'toReplace'" label="Substituir" icon="fa fa-plus" @click="replace()"/>
          <BtnStack v-if="situation === 'toInsert'" label="Inserir" icon="fa fa-plus" @click="create"/>
        </q-btn-group>
      </div>
    </q-card-section>
    <q-expansion-item
      v-if="registers.length"
      :label="`${label} - substituídos`"
      default-opened
      :caption="`Total: ${registers.length}`"
      >
      <q-card-section class="row">
        <q-list bordered separator class="q-pa-xs col-12">
          <q-item clickable v-ripple >
            <q-item-section>RG</q-item-section>
            <q-item-section>Nome</q-item-section>
            <q-item-section>Posto/Grad</q-item-section>
            <q-item-section>RG substituto</q-item-section>
            <q-item-section>Ações</q-item-section>
          </q-item>
          <q-item clickable v-ripple v-for="(membro, i) in registers" :key="i">
            <q-item-section>{{membro.rg}}</q-item-section>
            <q-item-section>{{membro.nome}}</q-item-section>
            <q-item-section>{{membro.cargo}}</q-item-section>
            <q-item-section>{{membro.rg_substituto || 'Não há'}}</q-item-section>
            <q-item-section>
              <q-btn-group spread>
                <BtnStack label="Apagar" icon="fa fa-trash" @click="remove(membro)"/>
              </q-btn-group>
            </q-item-section>
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
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable camelcase */
import { defineComponent, reactive, toRefs, computed } from '@vue/composition-api'
import { postograd } from 'src/config/selects'
import { api, validate, confirmMsg } from 'src/services'

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
    const vars = reactive({
      register: {
        rg: '',
        nome: '',
        cargo: '',
        situacao: props.label
      } as Register,
      registers: [] as Array<Register>,
      substituted: {} as Register,
      validable: false,
      disabled: true,
      situation: 'toInsert',
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
        if (props.required) {
          return validate(refs, fields)
        }
        return true
      },
      getState () {
        return vars.situation
      },
      cleanRegister () {
        return {
          id: 0,
          rg: '',
          nome: '',
          cargo: '',
          resultado: '',
          situacao: props.label,
          rg_substituto: ''
        } as Register
      },
      toogleDisable () {
        vars.disabled = !vars.disabled
      },
      getCurrent (response: Register[]):Register {
        if (!response.length) return this.cleanRegister()
        const filtered = response.filter(r => !r.rg_substituto)
        if (filtered) {
          vars.situation = 'inserted'
          return filtered[0]
        }
        return this.cleanRegister()
      },
      getReplaced (response: Register[]):Register[] {
        if (!response.length) return []
        const filtered = response.filter(r => r.rg_substituto)
        if (filtered) return filtered
        return []
      },
      async loadData (): Promise<void> {
        const { data } = await api.post(`${moduleName}/search`, props.data, { silent: true })
        vars.registers = this.getReplaced(data as Register[])
        vars.register = this.getCurrent(data as Register[])
        // console.log(vars.register)
      },
      async create () {
        vars.disabled = true
        vars.situation = 'inserted'

        const data = { ...vars.register, ...props.data }
        const { ok, data: response } = await api.post(moduleName, data, { silent: true, debug: true })
        if (ok) {
          const responseData = response as Register
          vars.register.id = responseData.id
          await this.loadData()
          return responseData
        }
        await this.loadData()
        return false
      },
      async replace (): Promise<boolean> {
        const substitute = await this.create()
        if (substitute) {
          const { id } = vars.substituted
          vars.substituted.rg_substituto = substitute.rg
          const data = { ...vars.substituted, ...props.data }
          const { ok } = await api.put(`${moduleName}/${id}`, data, { silent: true, debug: true })
          if (ok) await this.loadData()
          return ok
        }
        await this.loadData()
        return false
      },
      toReplace (register: Register) {
        root.$q.dialog(confirmMsg).onOk(() => {
          vars.substituted = register
          console.log(vars.substituted)
          vars.register = this.cleanRegister()
          vars.situation = 'toReplace'
          return true
        }).onCancel(() => false)
      },
      remove (register: Register): void {
        const found = vars.registers.findIndex(f => f.id === register.id)
        root.$q.dialog(confirmMsg).onOk(async () => {
          const { ok } = await api.delete(`${moduleName}/${register.id}`)
          if (ok) vars.registers.splice(found, 1)
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
