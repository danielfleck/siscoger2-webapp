<template>
  <q-card class="col-12" flat>
    <q-card-section class="row">
      <div class="q-pa-xs col-12">{{ label }}</div>
      <div class="q-pa-xs col-2">
        <InputText label="RG" ref="rg" v-model="register.rg" required/>
      </div>
      <div class="q-pa-xs col-3">
        <InputText :disable="disabled" label="Nome" ref="nome" v-model="register.nome" required/>
      </div>
      <div class="q-pa-xs col-3">
        <PostoGrad :disable="disabled" v-model="register.cargo" ref="cargo" required/>
      </div>
      <div class="q-pa-xs col-2">
        <ResultadoAcusado v-model="register.resultado" label="Resultado" ref="resultado"/>
      </div>
      <div class="q-pa-xs col-2">
         <q-btn-group spread>
          <BtnStack :label="disabled ? 'Liberar' : 'Bloquear'" :icon=" disabled ? 'fa fa-lock' : 'fa fa-lock-open'" @click="disabled = !disabled"/>
          <BtnStack v-if="register.id" label="Atualizar" icon="fa fa-pen" @click="update(register)"/>
          <BtnStack :disable="unique && registers.length" v-else label="Inserir" icon="fa fa-plus" @click="create"/>
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
            <q-item-section>Resultado</q-item-section>
            <q-item-section>Ações</q-item-section>
          </q-item>
          <q-item clickable v-ripple v-for="acusado in registers" :key="acusado.rg">
            <q-item-section>{{acusado.rg}}</q-item-section>
            <q-item-section>{{acusado.nome}}</q-item-section>
            <q-item-section>{{acusado.cargo}}</q-item-section>
            <q-item-section>{{acusado.resultado || 'Não há'}}</q-item-section>
            <q-item-section>
              <q-btn-group spread>
                <BtnStack label="Editar" icon="fa fa-pen" @click="edit(acusado)"/>
                <BtnStack label="Apagar" icon="fa fa-trash" @click="remove(acusado)"/>
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
import { defineComponent, reactive, toRefs, computed } from '@vue/composition-api'
import { resultadoAcusado, postograd } from 'src/config/selects'
import { validate, resetValidation } from 'src/libs/validator'

import InputText from 'components/form/InputText.vue'
import PostoGrad from 'components/form/PostoGrad.vue'
import ResultadoAcusado from 'components/form/ResultadoAcusado.vue'
import BtnStack from 'components/form/BtnStack.vue'
import { getDense } from 'src/store/utils'
import { confirmMsg } from 'src/libs/dialog'
import { deleteData, post, put } from 'src/libs/api'

const fields = ['rg', 'nome', 'cargo']

export interface Register {
  id?: number
  rg: string
  nome: string
  cargo: string
  resultado: string
}

const cleanRegister = {
  id: 0,
  rg: '',
  nome: '',
  cargo: '',
  resultado: ''
}

const moduleName = 'envolvidos'
export default defineComponent({
  name: 'Acusado',
  components: { InputText, PostoGrad, ResultadoAcusado, BtnStack },
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number, Boolean],
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
    unique: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      required: true
    }
  },

  setup (props, { root, refs }) {
    const vars = reactive({
      register: {
        id: 0,
        rg: '',
        nome: '',
        cargo: '',
        resultado: ''
      } as Register,
      registers: [] as Array<Register>,
      disabled: true,
      resultadoAcusado,
      postograd
    })
    const functions = {
      async loadData (): Promise<void> {
        resetValidation(refs, fields)
        const response = await post(`${moduleName}/search`, props.data, { silent: true })
        vars.registers = response
      },
      async create (): Promise<void> {
        if (validate(refs, fields)) {
          const data = { ...props.data, ...vars.register }
          const response = await post(moduleName, data, { complete: true })
          if (response.returntype === 'success') {
            vars.register = cleanRegister
            await this.loadData()
          }
        }
      },
      edit (register: Register) {
        vars.disabled = true
        vars.register = register
      },
      async update (register: Register): Promise<void> {
        if (validate(refs, fields)) {
          const data = { ...props.data, ...register }
          const response = await put(`${moduleName}/${register?.id}`, data, { complete: true })
          if (response.returntype === 'success') {
            vars.register = cleanRegister
            await this.loadData()
          }
        }
      },
      remove (register: Register): void {
        const found = vars.registers.findIndex(f => f.id === register.id)
        root.$q.dialog(confirmMsg).onOk(async () => {
          await deleteData(`${moduleName}/${register.id}`)
          vars.registers.splice(found, 1)
        })
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    functions.loadData()

    return {
      ...toRefs(vars),
      ...functions,
      denseVal: computed(() => getDense(root))
    }
  }
})
</script>
