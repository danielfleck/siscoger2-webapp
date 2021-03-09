<template>
  <page :breadcrumbs="[
  { label: 'Lista', link: '/iso/lista' },
  { label: 'Editar', link: '/iso/editar' },
  ]">
    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
      @input="validateNavigation"
    >
      <q-tab name="main" icon="edit" label="Principal"/>
      <q-tab name="movimentos" icon="loop" label="Movimentos" />
      <q-tab name="sobrestamentos" icon="hourglass_top" label="Sobrestamentos"/>
      <q-tab name="arquivos" icon="folder" label="Arquivos" />
    </q-tabs>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="main" class="row">
        <div  class="q-pa-md col-12">
          <BannerDeleted v-if="register.deletedAt" :id="register.id" proc="iso"/>
        </div>
        <div class="q-pa-md col-12">
          <Prioridade v-model="register.prioridade"/>
        </div>
        <div class="q-pa-md col-4">
          <Andamento v-model="register.id_andamento" type="iso"/>
        </div>
        <div class="q-pa-md col-4">
          <AndamentoCoger label="Tramite administrativo" v-model="register.id_andamentocoger" type="iso"/>
        </div>
        <div class="q-pa-md col-4">
          <InputDate v-model="register.fato_data" label="Data da fato" />
        </div>
        <div class="q-pa-md col-4">
          <InputDate v-model="register.abertura_data" label="Data da abertura" />
        </div>
        <div class="q-pa-md col-4">
          <InputText label="Tipo penal" v-model="register.tipo_penal" ref="tipo_penal" required/>
        </div>
        <div class="q-pa-md col-4">
          <TipoBoletim v-model="register.doc_tipo"/>
        </div>
        <div class="q-pa-md col-4">
          <InputText label="N° Boletim" mask="#######/####" reverse v-model="register.doc_numero" />
        </div>
        <div class="q-pa-md col-4">
          <Portaria label="N° Portaria" v-model="register.portaria_numero" ref="portaria_numero" required proc="iso" :cdopm="register.cdopm"/>
        </div>
        <div class="q-pa-md col-4">
          <InputDate v-model="register.portaria_data" label="Data da Portaria" ref="portaria_data" required/>
        </div>
        <div class="q-pa-md col-12">
          <InputText label="Sintese do fato" v-model="register.sintese_txt" ref="sintese_txt" :minLength="200" autogrow required :lorem="200"/>
        </div>
        <template v-if="register.id">
          <ProcedOrigem type="iso" :data="{ id_iso: register.id }"/>
          <Membro label="Encarregado" ref="Encarregado" required :data="{ situacao: 'Encarregado', id_iso: register.id }"/>
          <Acusado label="Paciente" :data="{ situacao: 'Paciente', id_iso: register.id }"/>
          <FileUpload label="Relatório do Médico" :data="{ proc: 'iso', campo: 'relatoriomedico_file', id_proc: register.id}"/>
          <FileUpload label="Solução da Autoridade" :data="{ proc: 'iso', campo: 'solucaoautoridade_file', id_proc: register.id}"/>
        </template>
        <q-btn @click="update" color="primary" label="Salvar" class="full-width"/>
      </q-tab-panel>

      <q-tab-panel name="movimentos">
        <movimento :data="{ id_iso: register.id }"/>
      </q-tab-panel>

      <q-tab-panel name="sobrestamentos" @transition="validateNavigation">
        <sobrestamento @submit="changeAndamento" :data="{ id_iso: register.id }"/>
      </q-tab-panel>

      <q-tab-panel name="arquivos" @transition="validateNavigation">
        <arquivo :data="{ id_iso: register.id }"/>
      </q-tab-panel>
    </q-tab-panels>

  </page>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable camelcase */
import { defineComponent, computed, toRefs, reactive } from '@vue/composition-api'

import Page from 'components/pages/Page.vue'
import BannerDeleted from 'components/pages/BannerDeleted.vue'
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

import { getDense } from 'src/store/utils'
import { getAndamento, getSobrestamento } from 'src/utils'
import { Iso } from 'src/types'
import { api, errorNotify, validate } from 'src/services'
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
    InputNumber,
    InputSN,
    OPM,
    Portaria,
    Andamento,
    AndamentoCoger,
    BannerDeleted
  },
  setup (_, { refs, root }) {
    const vars = reactive({
      step: 1,
      tab: 'main',
      loading: false,
      register: {
        id: 0,
        id_andamento: 0,
        id_andamentocoger: 0,
        id_municipio: 0,
        id_situacao: 0,
        cdopm: '',
        opm_sigla: '',
        opm_ref: 0,
        opm_ref_ano: 0,
        sjd_ref: 0,
        sjd_ref_ano: 0,
        abertura_data: new Date(),
        fato_data: new Date(),
        autuacao_data: new Date(),
        crime: '',
        tentado: '',
        crime_especificar: '',
        sintese_txt: '', // text
        relato_enc: '',
        relato_enc_data: new Date(),
        relato_cmtopm: '',
        relato_cmtopm_data: new Date(),
        relato_cmtgeral: '',
        relato_cmtgeral_data: new Date(),
        vajme_ref: '',
        justicacomum_ref: '',
        vitima: '',
        confronto_armado_bl: '',
        vitima_qtdd: 0,
        julgamento: '',
        portaria_numero: '',
        exclusao_txt: '', // text
        relato_enc_file: '',
        relato_cmtopm_file: '',
        relato_cmtgeral_file: '',
        defensor_oab: '',
        defensor_nome: '',
        relcomplementar_file: '',
        relcomplementar_data: new Date(),
        opm_meta4: '',
        bou_ano: 0,
        bou_numero: 0,
        prioridade: 0,
        tipo_penal: '',
        doc_tipo: '',
        doc_numero: '',
        portaria_data: new Date()
      } as Iso
    })

    async function update () {
      if (validate(refs, fields)) {
        const validateSubforms = subforms()

        if (validateSubforms && vars.register.id) {
          vars.register.completo = true
          const { ok } = await api.put(`iso/${vars.register.id}`, vars.register)
          if (ok) return root.$router.push('/iso/lista')
        }
      }
    }

    async function changeAndamento (sobrestamento: { termino_data: string }) {
      if (!vars.register.id) return
      const { id } = vars.register
      if (!sobrestamento.termino_data) {
        vars.register.id_andamento = getSobrestamento('iso')
        const { ok } = await api.put(`iso/${id}`, vars.register, { silent: true })
        if (ok) return
      }
      vars.register.id_andamento = getAndamento('iso')
      await api.put(`iso/${id}`, vars.register, { silent: true })
    }

    async function validateNavigation (tab: string) {
      if (validate(refs, fields)) {
        const { ok } = await api.put(`iso/${String(vars.register.id)}`, vars.register, { silent: true })
        if (ok) vars.tab = tab
      } else {
        vars.tab = 'main'
      }
    }

    async function loadData () {
      const { id } = root.$route.params
      if (id) {
        const { data, ok } = await api.get(`iso/${id}`)
        if (ok) vars.register = data as Iso
      }
    }

    function subforms () {
      const sindicante = refs.sindicante.getState()
      if (sindicante === 'toInsert') {
        errorNotify('Insira o sindicante')
        return false
      }
      return true
    }
    // eslint-disable-next-line no-void
    void loadData()

    return {
      ...toRefs(vars),
      denseVal: computed(() => getDense(root)),
      update,
      changeAndamento,
      validateNavigation
    }
  }
})
</script>
