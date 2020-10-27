<template>
  <q-card class="col-12" flat>
    <q-card-section class="row">
      <div class="q-pa-xs col-12">Vítima <span class="text-bold text-red">(apenas se houver)</span></div>
      <div class="q-pa-xs col-4">
        <InputRG v-model="register.rg" ref="rg" required/>
      </div>
      <div class="q-pa-xs col-4">
        <InputText label="Nome" v-model="register.nome" ref="nome" required/>
      </div>
      <div v-if="type == 'ipm'" class="q-pa-xs col-4">
        <InputSelect label="Resultado" v-model="register.resultado" :options="ofendidoResultado"/>
      </div>
      <div class="q-pa-xs col-2">
        <InputSelect label="Sexo" v-model="register.sexo" :options="ofendidoSexo"/>
      </div>
      <template v-if="type !== 'ipm'">
        <div class="q-pa-xs col-2">
          <InputText label="Telefone" v-model="register.fone" />
        </div>
        <div class="q-pa-xs col-4">
          <InputText label="E-mail" v-model="register.email"/>
        </div>
      </template>
      <div class="q-pa-xs col-2">
        <InputText label="Idade" v-model="register.idade" mask="###"/>
      </div>
      <div v-if="type !== 'sai'&& type !== 'proc_outros'" class="q-pa-xs col-4">
        <InputSelect label="Escolaridade" v-model="register.escolaridade" :options="ofendidoEscolaridade"/>
      </div>
      <div class="q-pa-xs col-4" v-if="type == 'sai'|| type == 'proc_outros'">
        <InputSelect label="Envolvimento" v-model="register.situacao" :options="ofendidoSituacao"/>
      </div>
      <template v-else>
        <input type="hidden" name="situacao" value="Vitima">
      </template>
      <div class="q-pa-xs col-2">
        <q-btn-group spread>
          <BtnStack v-if="register.id" label="Atualizar" icon="fa fa-pen" @click="update(register)"/>
          <BtnStack v-else label="Inserir" icon="fa fa-plus" @click="create"/>
        </q-btn-group>
      </div>
    </q-card-section>
    <q-expansion-item v-if="registers.length" :label="`${label} - lista`" default-opened>
      <q-card-section class="row">
        <q-list bordered separator class="q-pa-xs col-12">
          <q-item clickable v-ripple >
            <q-item-section>rg</q-item-section>
            <q-item-section>nome</q-item-section>
            <q-item-section>sexo</q-item-section>
            <q-item-section>fone</q-item-section>
            <q-item-section>email</q-item-section>
            <q-item-section>idade</q-item-section>
            <q-item-section>escolaridade</q-item-section>
            <q-item-section>Ações</q-item-section>
          </q-item>
          <q-item clickable v-ripple v-for="vitima in registers" :key="vitima.rg">
            <q-item-section>{{vitima.rg}}</q-item-section>
            <q-item-section>{{vitima.nome}}</q-item-section>
            <q-item-section>{{vitima.sexo}}</q-item-section>
            <q-item-section>{{vitima.fone}}</q-item-section>
            <q-item-section>{{vitima.email}}</q-item-section>
            <q-item-section>{{vitima.idade}}</q-item-section>
            <q-item-section>{{vitima.escolaridade}}</q-item-section>
            <q-item-section>
              <q-btn-group spread>
                <BtnStack label="Editar" icon="fa fa-pen" @click="edit(vitima)"/>
                <BtnStack label="Apagar" icon="fa fa-trash" @click="remove(vitima)"/>
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
import { defineComponent, reactive, toRefs, computed } from '@vue/composition-api'
import { ofendidoResultado, ofendidoSexo, ofendidoEscolaridade, ofendidoSituacao } from 'src/config/selects'
import { resetValidation, validate } from 'src/libs/validator'

import InputRG from 'components/form/InputRG.vue'
import InputText from 'components/form/InputText.vue'
import InputSelect from 'components/form/InputSelect.vue'
import BtnStack from 'components/form/BtnStack.vue'
import { getDense } from 'src/store/utils'
import { confirmMsg } from 'src/libs/dialog'
import { deleteData, post, put } from 'src/libs/api'

const fields = ['rg', 'nome']

export interface Register{
  id?: number
  rg: string
  nome: string
  resultado: string
  sexo: string
  fone: string
  email: string
  idade: string
  escolaridade: string
  situacao: string
}

const cleanRegister = {
  id: 0,
  rg: '',
  nome: '',
  resultado: '',
  sexo: '',
  fone: '',
  email: '',
  idade: '',
  escolaridade: '',
  situacao: ''
}

const moduleName = 'ofendidos'
export default defineComponent({
  name: 'Name',
  components: {
    InputRG,
    InputText,
    InputSelect,
    BtnStack
  },
  props: {
    label: {
      type: String,
      default: 'Vitima'
    },
    data: {
      type: Object,
      required: true
    }
  },
  setup (props, { root, refs }) {
    const vars = reactive({
      ofendidoResultado,
      ofendidoSexo,
      ofendidoEscolaridade,
      ofendidoSituacao,
      register: {
        id: 0,
        rg: '',
        nome: '',
        resultado: '',
        sexo: '',
        fone: '',
        email: '',
        idade: '',
        escolaridade: '',
        situacao: ''
      } as Register,
      registers: [] as Array<Register>,
      disabled: true,
      type: props.label
    })
    const functions = {
      async loadData (): Promise<void> {
        resetValidation(refs, fields)
        vars.registers = await post(`${moduleName}/search`, props.data, { silent: true })
      },
      async create (): Promise<void> {
        if (validate(refs, fields)) {
          const data = { ...props.data, ...vars.register }
          const response = await post(moduleName, data)
          if (response) {
            vars.register = cleanRegister
            await this.loadData()
          }
        }
      },
      edit (register: Register) {
        vars.register = register
      },
      async update (register: Register): Promise<void> {
        if (validate(refs, fields)) {
          const data = { ...props.data, ...register }
          await put(`${moduleName}/${register?.id}`, data)
          vars.register = cleanRegister
          await this.loadData()
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
