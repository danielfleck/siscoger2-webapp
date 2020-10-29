<template>
  <q-card class="col-12" flat>
    <q-card-section class="row">
      <div class="q-pa-xs col-12">{{ label }}</div>
      <div class="q-pa-xs col-4">
        <InputSelect label="Motivo" v-model="register.motivo" :options="motivoSobrestamento" ref="motivo" required/>
      </div>
      <div class="q-pa-xs col-4" v-if="register.motivo === 'outros'">
        <InputText label="Motivo outros" v-model="register.motivo_outros" ref="motivo_outros" required/>
      </div>
      <div class="q-pa-xs col-4">
        <InputDate label="Data de início" v-model="register.inicio_data" ref="inicio_data" required/>
      </div>
      <div class="q-pa-xs col-4">
        <InputText label="N° Documento" v-model="register.doc_controle_inicio" ref="doc_controle_inicio" required tooltip="Ex: Despacho n° 2.144/2018"/>
      </div>
      <div class="q-pa-xs col-4">
        <InputText label="Publicação início" v-model="register.publicacao_inicio" ref="publicacao_inicio" tooltip="Ex: Despacho n° 2.144/2018"/>
      </div>
      <div class="q-pa-xs col-4">
        <InputDate label="Data de Término" v-model="register.termino_data" ref="termino_data" />
      </div>
      <div class="q-pa-xs col-4">
        <InputText label="N° Documento Término" v-model="register.doc_controle_termino" ref="doc_controle_termino" :required="Boolean(register.termino_data)" tooltip="Ex: Despacho n° 2.144/2018"/>
      </div>
      <div class="q-pa-xs col-4">
        <InputText label="Publicação Término" v-model="register.publicacao_termino" ref="publicacao_termino" :required="Boolean(register.termino_data)" tooltip="Ex: Despacho n° 2.144/2018"/>
      </div>
      <div class="q-pa-xs col-12">
        <q-btn
          color="primary"
          @click="register.id ? update(register) : create()"
          :label="register.id ? 'Editar' : 'Inserir'"
          class="full-width"
          :icon="register.id ? 'fa fa-pen' : 'fa fa-plus'"
          />
      </div>
    </q-card-section>
    <q-card-section v-if="registers.length" class="row">
      <q-list bordered separator class="q-pa-xs col-12">
        <q-item clickable v-ripple >
          <q-item-section>Início</q-item-section>
          <q-item-section>Doc.Início</q-item-section>
          <q-item-section>Término</q-item-section>
          <q-item-section>Doc.Término</q-item-section>
          <q-item-section>Motivo</q-item-section>
          <q-item-section>Ações</q-item-section>
        </q-item>
        <q-item v-ripple v-for="sobrestamento in registers" :key="sobrestamento.rg">
          <q-item-section>{{sobrestamento.inicio_data}}</q-item-section>
          <q-item-section>{{sobrestamento.doc_controle_inicio}}</q-item-section>
          <q-item-section>{{sobrestamento.termino_data}}</q-item-section>
          <q-item-section>{{sobrestamento.doc_controle_termino}}</q-item-section>
          <q-item-section v-if="sobrestamento.motivo !== 'outros'">{{sobrestamento.motivo}}</q-item-section>
          <q-item-section v-else>{{sobrestamento.motivo_outros}}</q-item-section>
          <q-item-section>
            <q-btn-group spread>
              <BtnStack label="Editar" icon="fa fa-pen" @click="edit(sobrestamento)"/>
              <BtnStack label="Apagar" icon="fa fa-trash" @click="remove(sobrestamento)"/>
            </q-btn-group>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { defineComponent, reactive, toRefs } from '@vue/composition-api'
import { confirmMsg } from 'src/libs/dialog'
import { validate } from 'src/libs/validator'
import { motivoSobrestamento } from 'src/config/selects'

import { deleteData, post, put } from 'src/libs/api'

import InputText from 'components/form/InputText.vue'
import InputSelect from 'components/form/InputSelect.vue'
import InputDate from 'components/form/InputDate.vue'
import BtnStack from 'components/form/BtnStack.vue'

export interface Register{
  id: number
  cdopm: string
  rg: string
  motivo: string
  motivo_outros: string
  inicio_data: string
  doc_controle_inicio: string
  publicacao_inicio: string
  termino_data: string
  doc_controle_termino: string
  publicacao_termino: string
}

const cleanRegister = {
  id: 0,
  cdopm: '',
  rg: '',
  motivo: '',
  motivo_outros: '',
  inicio_data: '',
  doc_controle_inicio: '',
  publicacao_inicio: '',
  termino_data: '',
  doc_controle_termino: '',
  publicacao_termino: ''
}

const fields = ['motivo', 'motivo_outros', 'inicio_data', 'doc_controle_inicio', 'publicacao_inicio']
const moduleName = 'sobrestamentos'
export default defineComponent({
  name: 'Sobrestamentos',
  components: { InputText, InputSelect, InputDate, BtnStack },
  props: {
    label: {
      type: String,
      default: 'Sobrestamentos'
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
        cdopm: '',
        rg: '',
        motivo: '',
        motivo_outros: '',
        inicio_data: '',
        doc_controle_inicio: '',
        publicacao_inicio: '',
        termino_data: '',
        doc_controle_termino: '',
        publicacao_termino: ''
      } as Register,
      registers: [] as Array<Register>,
      motivoSobrestamento
    })

    const functions = {
      async loadData (): Promise<void> {
        // resetValidation(refs, fields)
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
      ...functions
    }
  }
})
</script>
