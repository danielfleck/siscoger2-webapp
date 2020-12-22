<template>
  <page :breadcrumbs="[
    { label: 'Lista', link: '/sindicancias/lista' },
    { label: 'Criar', link: '/sindicancias/inserir' },
    ]">
    <q-stepper
      v-model="step"
      ref="stepper"
      color="primary"
      animated
    >
      <q-step
        :name="1"
        title="Dados principais"
        icon="settings"
        :done="step > 1"
      >
        <form class="row">
          <div class="q-pa-md col-12">
            <Prioridade v-model="register.prioridade"/>
          </div>
          <div class="q-pa-md col-4">
            <InputText label="Andamento" value="Andamento" disable/>
          </div>
          <div class="q-pa-md col-4">
            <InputText label="Documento de origem" v-model="register.doc_origem_txt" ref="doc_origem_txt" required/>
          </div>
          <div class="q-pa-md col-4">
            <InputDate v-model="register.fato_data" label="Data da fato" />
          </div>
          <div class="q-pa-md col-4">
            <OPM v-model="register.cdopm" ref="opm" required/>
          </div>
          <div class="q-pa-md col-4" v-if="register.cdopm">
            <Portaria label="N° Portaria" v-model="register.portaria_numero" ref="portaria_numero" required proc="sindicancia" :cdopm="register.cdopm"/>
          </div>
          <div class="q-pa-md col-4">
            <InputDate v-model="register.portaria_data" label="Data da Portaria" ref="portaria_data" required/>
          </div>
          <div class="q-pa-md col-4">
            <TipoBoletim v-model="register.doc_tipo"/>
          </div>
          <div class="q-pa-md col-4">
            <InputText label="N° Boletim" v-model="register.doc_numero" />
          </div>
          <div class="q-pa-md col-4">
            <InputDate v-model="register.abertura_data" label="Data da abertura"/>
          </div>
          <div class="q-pa-md col-6">
            <InputSelect label="Motivo abertura" v-model="register.motivo_abertura" :options="motivoAberturaSindicancia" />
          </div>
          <div class="q-pa-md col-6" v-if="register.motivo_abertura === 'Outro'">
            <InputText label="Descreva o motivo" v-model="register.motivo_outros" ref="motivo_outros" required/>
          </div>
          <div class="q-pa-md col-12">
            <InputText label="Sintese do fato" v-model="register.sintese_txt" ref="sintese_txt" :minLength="200" autogrow required :lorem="200"/>
          </div>
        </form>
      </q-step>

      <q-step
        :name="2"
        title="Envolvidos"
        icon="create_new_folder"
        :done="step > 2"
      >
        <template v-if="register.id">
          <ProcedOrigem type="sindicancia" :data="{ id_sindicancia: register.id }"/>
          <Membro label="Sindicante" ref="sindicante" required :data="{ situacao: 'sindicante', id_sindicancia: register.id }"/>
          <Membro label="Escrivão" ref="escrivao" :data="{ situacao: 'escrivao', id_sindicancia: register.id }"/>
          <Acusado label="Sindicado" :data="{ situacao: 'sindicado', id_sindicancia: register.id }"/>
          <Vitima :data="{ id_sindicancia: register.id }"/>
        </template>
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <template v-if="step === 1">
            <q-btn v-if="step === 1" @click="register.id ? update(register.id) : create()" color="positive" label="Continuar" :loading="loading" class="full-width" icon="fa fa-arrow-right"/>
          </template>
          <template v-else>
            <q-btn flat color="white" @click="previous" label="Voltar" class="full-width bg-positive" icon="fa fa-arrow-left"/>
            <q-btn @click="finalize" color="primary" label="Finalizar" class="full-width"/>
          </template>
        </q-stepper-navigation>
      </template>
    </q-stepper>

  </page>
</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { defineComponent, reactive, toRefs } from '@vue/composition-api'
import {
  Page,
  ProcedOrigem,
  Acusado,
  Vitima,
  FileUpload,
  Membro,
  Movimento,
  Sobrestamento,
  Arquivo,
  InputDate,
  TipoBoletim,
  Prioridade,
  InputText,
  InputSelect,
  InputNumber,
  InputSN,
  OPM,
  Portaria
} from 'components/index'
import { andamentoCogerSindicancia, andamentoSindicancia, motivoAberturaSindicancia, prorogacao, tipoBoletim } from 'src/config/selects'
import { Register } from './index'
import { post, put } from 'src/libs/api'

import { validate } from 'src/libs/validator'
import { errorNotify } from 'src/libs/notify'
const fields = [
  'motivo_cancelamento',
  'doc_origem_txt',
  'opm',
  'portaria_numero',
  'sintese_txt',
  'portaria_data',
  'prorogacao_dias',
  'motivo_outros',
  'sindicante',
  'escrivao'
]

export default defineComponent({
  name: 'Form',
  components: {
    Page,
    ProcedOrigem,
    Acusado,
    Vitima,
    FileUpload,
    Membro,
    Movimento,
    Sobrestamento,
    Arquivo,
    InputDate,
    TipoBoletim,
    Prioridade,
    InputText,
    InputSelect,
    InputNumber,
    InputSN,
    OPM,
    Portaria
  },
  setup (_, { refs, root }) {
    const vars = reactive({
      step: 1,
      tab: 'main',
      loading: false,
      register: {
        id: 0,
        sintese_txt: '',
        prioridade: false,
        id_andamento: 6,
        id_andamentocoger: 0,
        motivo_cancelamento: '',
        doc_origem_txt: '',
        fato_data: '',
        cdopm: '',
        portaria_numero: '',
        portaria_data: '',
        doc_tipo: '',
        doc_numero: '',
        abertura_data: '',
        prorogacao: false,
        prorogacao_dias: 0,
        motivo_abertura: '',
        motivo_outros: '',
        completo: false
      } as Register,
      andamentoCogerSindicancia,
      andamentoSindicancia,
      motivoAberturaSindicancia,
      prorogacao,
      tipoBoletim
    })

    const functions = {
      async create () {
        if (validate(refs, fields)) {
          const response = await post('sindicancias', vars.register, { silent: true, complete: true, debug: true })
          if (response.returntype === 'success') {
            vars.register.id = response.data.id
            refs.stepper.next()
            return undefined
          }
        }
      },
      async update (id: number) {
        if (validate(refs, fields)) {
          const response = await put(`sindicancias/${id}`, vars.register, { silent: true, complete: true, debug: true })

          if (response.returntype === 'success') {
            refs.stepper.next()
          }
        }
      },
      async subforms () {
        const sindicante = await refs.sindicante.getState()
        if (sindicante === 'toInsert') {
          errorNotify('Insira o sindicante')
          return false
        }
        return true
      },
      async finalize () {
        if (validate(refs, fields)) {
          const validateSubforms = await this.subforms()

          if (validateSubforms && vars.register.id) {
            vars.register.completo = true
            await put(`sindicancias/${vars.register.id}`, vars.register)
            return root.$router.push('/sindicancias/lista')
          }
        }
      },
      previous () {
        refs.stepper.previous()
      }
    }
    return {
      ...toRefs(vars),
      ...functions
    }
  }
})
</script>
