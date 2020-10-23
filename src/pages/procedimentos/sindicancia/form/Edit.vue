<template>
  <page :breadcrumbs="breadcrumbs">
    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="main" icon="edit" label="Principal"/>
      <q-tab name="movimentos" icon="loop" label="Movimentos"/>
      <q-tab name="sobrestamentos" icon="hourglass_top" label="Sobrestamentos"/>
      <q-tab name="arquivos" icon="folder" label="Arquivos"/>
    </q-tabs>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="main" class="row">
        <div class="q-pa-md col-12">
          <Prioridade v-model="register.prioridade"/>
        </div>
        <div class="q-pa-md col-4">
          <Andamento v-model="register.id_andamento" type="sindicancia"/>
        </div>
        <div class="q-pa-md col-4">
          <AndamentoCoger v-model="register.id_andamentocoger" type="sindicancia"/>
        </div>
        <div v-if="register.id_andamentocoger == 99" class="q-pa-md col-4">
          <InputText label="Motivo cancelamento" v-model="register.motivo_cancelamento" ref="motivo_cancelamento" required/>
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
        <div class="q-pa-md col-4">
          <Portaria label="N° Portaria" v-model="register.portaria_numero" ref="portaria_numero" required/>
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
        <div class="q-pa-md col-4">
          <InputSN v-model="register.prorogacao" label="Houve prorogação"/>
        </div>
        <div v-if="register.prorogacao" class="q-pa-md col-4">
          <InputNumber label="Quantos dias?" v-model="register.prorogacao_dias" ref="prorogacao_dias" required/>
        </div>
        <div class="q-pa-md col-12">
          <InputText label="Sintese do fato" v-model="register.sintese_txt" ref="sintese_txt" :minLength="200" autogrow required/>
        </div>
        <ProcedOrigem v-if="register.id" type="sindicancia" :data="{ id_sindicancia: register.id }"/>
        <Vitima />
        <Membro v-if="register.id" label="Sindicante" v-model="sindicante" ref="sindicante" required :data="{ id_sindicancia: register.id }"/>
        <Membro label="Escrivão"/>
        <acusado label="Sindicado"/>
        <FileUpload label="Relatório do Encarregado"/>
        <FileUpload label="Solução do Comandante"/>
        <FileUpload label="Solução CMT Geral"/>
        <q-btn @click="create" color="primary" label="Salvar" class="full-width"/>
      </q-tab-panel>

      <q-tab-panel name="movimentos">
        <movimento />
      </q-tab-panel>

      <q-tab-panel name="sobrestamentos">
        <sobrestamento />
      </q-tab-panel>

      <q-tab-panel name="arquivos">
        <arquivo />
      </q-tab-panel>
    </q-tab-panels>

  </page>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs } from '@vue/composition-api'

import Page from 'components/pages/Page.vue'
import ProcedOrigem from 'components/subform/ProcedOrigem.vue'
import Acusado from 'components/subform/Acusado.vue'
import Vitima from 'components/subform/Vitima.vue'
import FileUpload from 'components/subform/FileUpload.vue'
import Membro from 'components/subform/Membro.vue'
import Movimento from 'components/subform/Movimento.vue'
import Sobrestamento from 'components/subform/Sobrestamento.vue'
import Arquivo from 'components/subform/Arquivo.vue'
import InputDate from 'components/form/InputDate.vue'
import TipoBoletim from 'components/form/TipoBoletim.vue'
import Prioridade from 'components/form/Prioridade.vue'
import InputText from 'components/form/InputText.vue'
import InputNumber from 'components/form/InputNumber.vue'
import InputSN from 'components/form/InputSN.vue'
import OPM from 'components/form/OPM.vue'
import Portaria from 'components/form/Portaria.vue'
import Andamento from 'components/form/Andamento.vue'
import AndamentoCoger from 'components/form/AndamentoCoger.vue'

import { get } from 'src/libs/api'

import { vars } from './index'
import { validate } from 'src/libs/validator'
const fields = ['motivo_cancelamento', 'doc_origem_txt', 'opm', 'portaria_numero', 'sintese_txt', 'portaria_data', 'prorogacao_dias', 'motivo_outros']
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
    InputNumber,
    InputSN,
    OPM,
    Portaria,
    Andamento,
    AndamentoCoger
  },
  setup (_, { refs, root }) {
    const functions = {
      create () {
        vars.onSubmit = true
        if (validate(refs, fields) && vars.hasSindicante) {
          // root.$router.push('/')
        }
        vars.onSubmit = false
      },
      checkDuplicated (value: string) {
        if (value === '1212/12') refs.dialog.show()
      },
      changeHasSindicante (value: boolean) {
        vars.hasSindicante = value
      },
      async loadData () {
        const { id } = root.$route.params
        if (id) {
          const { data } = await get(`sindicancias/${id}`)
          vars.register = data
        }
      }
    }

    void functions.loadData()
    return {
      ...toRefs(vars),
      denseVal: computed(() => root.$store.state.configs.dense),
      ...functions
    }
  }
})
</script>
