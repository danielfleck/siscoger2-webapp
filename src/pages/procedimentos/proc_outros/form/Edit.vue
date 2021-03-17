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
      @input="validateNavigation"
    >
      <q-tab name="main" icon="edit" label="Principal"/>
      <q-tab name="movimentos" icon="loop" label="Movimentos" />
      <q-tab name="sobrestamentos" icon="hourglass_top" label="Sobrestamentos"/>
      <q-tab name="arquivos" icon="folder" label="Arquivos" />
    </q-tabs>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="main" class="row">
        <div-form full>
          <BannerDeleted v-if="register.deletedAt" :id="register.id" proc="proc_outros"/>
        </div-form>
        <div-form>
          <Andamento v-model="register.andamento" type="proc_outros"/>
        </div-form>
        <div-form>
          <AndamentoCoger v-model="register.andamentocoger" type="proc_outros"/>
        </div-form>
        <div-form>
          <InputText label="N° PID" v-model="register.num_pid" ref="num_pid" required/>
        </div-form>
        <div-form>
          <InputDate v-model="register.data" label="Data da fato" />
        </div-form>
        <div-form>
          <InputDate v-model="register.abertura_data" label="Data de recebimento" />
        </div-form>
        <div-form>
          <InputDate v-model="register.limite_data" label="Data limite" />
        </div-form>
        <div-form>
          <OPM v-model="register.cdopm_apuracao" ref="cdopm_apuracao" required/>
        </div-form>
        <div-form>
          <InputSelect label="Doc. Origem" v-model="register.doc_origem" :options="docOrigemProcOutros" />
        </div-form>
        <div-form >
          <InputText label="Nº Documento, ou descrição outros documentos" v-model="register.num_doc_origem" ref="motivo_outros" required/>
        </div-form>
        <div-form>
          <InputSelect label="Doc. Origem" v-model="register.motivo_abertura" :options="motivoAberturaProcOutros" />
        </div-form>
        <div-form>
          <InputAno label="BOU Ano" v-model="register.bou_ano"/>
        </div-form>
        <div-form>
          <InputNumber label="BOU Número" v-model="register.bou_numero"/>
        </div-form>
        <div-form full>
          <InputText label="Sintese do fato" v-model="register.sintese_txt" ref="sintese_txt" :minLength="200" autogrow required :lorem="200"/>
        </div-form>
        <template v-if="register.id">
          <ProcedOrigem type="proc_outros" :data="{ id_proc_outros: register.id }"/>
          <Membro label="Sindicante" ref="sindicante" required :data="{ situacao: 'sindicante', id_proc_outros: register.id }"/>
          <Membro label="Escrivão" ref="escrivao" :data="{ situacao: 'escrivao', id_proc_outros: register.id }"/>
          <Acusado label="Sindicado" :data="{ situacao: 'sindicado', id_proc_outros: register.id }"/>
          <Vitima :data="{ id_proc_outros: register.id }"/>
          <FileUpload label="Relatório do Encarregado" :data="{ proc: 'proc_outros', campo: 'relatorio_encarregado_file', id_proc: register.id}"/>
          <FileUpload label="Solução do Comandante" :data="{ proc: 'proc_outros', campo: 'solucao_cmt_file', id_proc: register.id}"/>
          <FileUpload label="Solução CMT Geral" :data="{ proc: 'proc_outros', campo: 'solucao_cmtgeral_file', id_proc: register.id}"/>
        </template>
        <q-btn @click="update" color="primary" label="Salvar" class="full-width"/>
      </q-tab-panel>

      <q-tab-panel name="movimentos">
        <movimento :data="{ id_proc_outros: register.id }"/>
      </q-tab-panel>

      <q-tab-panel name="sobrestamentos" @transition="validateNavigation">
        <sobrestamento @submit="changeAndamento" :data="{ id_proc_outros: register.id }"/>
      </q-tab-panel>

      <q-tab-panel name="arquivos" @transition="validateNavigation">
        <arquivo :data="{ id_proc_outros: register.id }"/>
      </q-tab-panel>
    </q-tab-panels>

  </page>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable camelcase */
import { defineComponent, toRefs, reactive } from '@vue/composition-api'

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
import DivForm from 'src/components/form/DivForm.vue'

import { docOrigemProcOutros, motivoAberturaProcOutros } from 'src/config'
import { ProcOutros } from 'src/types'
import { api, errorNotify, validate } from 'src/services'
import InputSelect from 'src/components/form/InputSelect.vue'
import { procoutroRequiredFields } from 'src/rules'
import { procoutrosRoute } from 'src/routenames'

const breadcrumbs = [
  { label: 'Lista', link: `/${procoutrosRoute}` },
  { label: 'Criar', link: `/${procoutrosRoute}/inserir` }
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
    BannerDeleted,
    DivForm,
    InputSelect
  },
  setup (_, { refs, root }) {
    const vars = reactive({
      step: 1,
      tab: 'main',
      loading: false,
      register: {
        id: 0,
        sjd_ref: 0,
        sjd_ref_ano: 0,
        rg_cadastro: '',
        cdopm: '',
        opm_abreviatura: '',
        cdopm_apuracao: '',
        abertura_data: new Date(),
        data: new Date(),
        bou_ano: '',
        bou_numero: '',
        id_municipio: 0,
        doc_origem: '',
        num_doc_origem: '',
        motivo_abertura: '',
        sintese_txt: '', // text
        relatorio1: '',
        relatorio1_file: '',
        relatorio1_data: new Date(),
        relatorio2: '',
        relatorio2_file: '',
        relatorio2_data: new Date(),
        relatorio3: '',
        relatorio3_file: '',
        relatorio3_data: new Date(),
        desc_outros: '',
        andamento: '',
        andamentocoger: '',
        vtr1_placa: '',
        vtr1_prefixo: '',
        vtr2_placa: '',
        vtr2_prefixo: '',
        digitador: '',
        num_pid: '',
        limite_data: new Date(),
        deletedAt: undefined
      } as ProcOutros,
      breadcrumbs,
      docOrigemProcOutros,
      motivoAberturaProcOutros
    })

    function getRequiredFields () {
      return vars.register.andamento === 'Concluído' ? procoutroRequiredFields.toFinalize : procoutroRequiredFields.toEdit
    }

    async function update () {
      if (validate(refs, getRequiredFields())) {
        const validateSubforms = subforms()

        if (validateSubforms && vars.register.id) {
          vars.register.completo = true
          const { ok } = await api.put(`${procoutrosRoute}/${vars.register.id}`, vars.register)
          if (ok) return root.$router.push(`/${procoutrosRoute}`)
        }
      }
    }

    async function validateNavigation (tab: string) {
      if (validate(refs, getRequiredFields())) {
        const { ok } = await api.put(`${procoutrosRoute}/${String(vars.register.id)}`, vars.register, { silent: true })
        if (ok) vars.tab = tab
      } else {
        vars.tab = 'main'
      }
    }

    async function loadData () {
      const { id } = root.$route.params
      if (id) {
        const { data, ok } = await api.get(`${procoutrosRoute}/${id}`)
        if (ok) vars.register = data as ProcOutros
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
      update,
      validateNavigation
    }
  }
})
</script>
