<template>
  <page :breadcrumbs="breadcrumbs">
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
            <InputText label="Sintese do fato" v-model="register.sintese_txt" ref="sintese_txt" :minLength="200" autogrow required/>
          </div>
        </form>
      </q-step>

      <q-step
        :name="2"
        title="Envolvidos"
        icon="create_new_folder"
        :done="step > 2"
      >
        <ProcedOrigem type="sindicancia" :data="{ id_sindicancia: register.id }"/>
        <Membro label="Sindicante" v-model="sindicante" ref="sindicante" required :data="{ id_sindicancia: register.id }"/>
        <Membro label="Escrivão" ref="escrivao"/>
        <Acusado label="Sindicado"/>
        <Vitima :data="{ id_sindicancia: register.id }"/>
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <template v-if="step === 1">
            <q-btn v-if="step === 1" @click="add" color="positive" label="Continuar" :loading="loading" class="full-width" icon="fa fa-arrow-right"/>
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
import { defineComponent, toRefs } from '@vue/composition-api'
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
import { post, put } from 'src/libs/api'

import { vars } from './index'
import { validate } from 'src/libs/validator'
const fields = [
  'motivo_cancelamento',
  'doc_origem_txt',
  'opm',
  'portaria_numero',
  'sintese_txt',
  'portaria_data',
  'prorogacao_dias',
  'motivo_outros',
  'sindicante'
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
  setup (_, { refs }) {
    const functions = {
      async add () {
        if (validate(refs, fields)) {
          if (vars?.register?.id) await this.update(vars?.register?.id)
          else await this.create()
        }
      },
      async create () {
        const response = await post('sindicancias', vars.register, { silent: true })
        if (response) {
          vars.register = response
          refs.stepper.next()
        }
      },
      async update (id: number) {
        const response = await put(`sindicancias/${id}`, vars.register, { silent: true })
        if (response) {
          vars.register = response
          refs.stepper.next()
        }
      },
      finalize () {
        if (validate(refs, fields)) {
          const sindicante = refs.sindicante.handleSubmit()
          console.log(sindicante)
        }
        // vars.onSubmit = true
        // if (vars.hasSindicante) {
        //   vars.loading = true
        //   setTimeout(this.fakeLoad, 3000)
        //   // root.$router.push('/')
        // }
        // vars.onSubmit = false
      },
      fakeLoad () {
        vars.loading = false
        refs.stepper.next()
      },
      previous () {
        refs.stepper.previous()
      },
      changeHasSindicante (value: boolean) {
        vars.hasSindicante = value
      }
    }
    return {
      ...toRefs(vars),
      ...functions
    }
  }
})
</script>
