<template>
  <page :breadcrumbs="[
  { label: 'Lista', link: '/sindicancias' },
  { label: 'Editar', link: '/sindicancias/editar' },
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
        <div-form full>
          <BannerDeleted v-if="register.deletedAt" :id="register.id" proc="sindicancias"/>
        </div-form>
        <div-form full>
          <Prioridade v-model="register.prioridade"/>
        </div-form>
        <div-form>
          <Andamento v-model="register.id_andamento" type="sindicancia"/>
        </div-form>
        <div-form>
          <AndamentoCoger v-model="register.id_andamentocoger" type="sindicancia"/>
        </div-form>
        <div-form v-if="register.id_andamentocoger == 99">
          <InputText label="Motivo cancelamento" v-model="register.motivo_cancelamento" ref="motivo_cancelamento" required/>
        </div-form>
        <div-form>
          <InputText label="Documento de origem" v-model="register.doc_origem_txt" ref="doc_origem_txt" required/>
        </div-form>
        <div-form>
          <InputDate v-model="register.fato_data" label="Data da fato" />
        </div-form>
        <div-form>
          <OPM v-model="register.cdopm" ref="opm" required/>
        </div-form>
        <div-form>
          <Portaria label="N° Portaria" v-model="register.portaria_numero" ref="portaria_numero" required/>
        </div-form>
        <div-form>
          <InputDate v-model="register.portaria_data" label="Data da Portaria" ref="portaria_data" required/>
        </div-form>
        <div-form>
          <TipoBoletim v-model="register.doc_tipo"/>
        </div-form>
        <div-form>
          <InputText label="N° Boletim" mask="#######/####" reverse v-model="register.doc_numero" />
        </div-form>
        <div-form>
          <InputDate v-model="register.abertura_data" label="Data da abertura"/>
        </div-form>
        <div-form>
          <InputSN v-model="register.prorogacao" label="Houve prorogação"/>
        </div-form>
        <div-form v-if="register.prorogacao">
          <InputNumber label="Quantos dias?" v-model="register.prorogacao_dias" ref="prorogacao_dias" required/>
        </div-form>
        <div-form full>
          <InputText label="Sintese do fato" v-model="register.sintese_txt" ref="sintese_txt" :minLength="200" autogrow required :lorem="200"/>
        </div-form>
        <template v-if="register.id">
          <ProcedOrigem type="sindicancia" :data="{ id_sindicancia: register.id }"/>
          <Membro label="Sindicante" ref="sindicante" required :data="{ situacao: 'sindicante', id_sindicancia: register.id }"/>
          <Membro label="Escrivão" ref="escrivao" :data="{ situacao: 'escrivao', id_sindicancia: register.id }"/>
          <Acusado label="Sindicado" :data="{ situacao: 'sindicado', id_sindicancia: register.id }"/>
          <Vitima :data="{ id_sindicancia: register.id }"/>
          <FileUpload label="Relatório do Encarregado" :data="{ proc: 'sindicancia', campo: 'relatorio_encarregado_file', id_proc: register.id}"/>
          <FileUpload label="Solução do Comandante" :data="{ proc: 'sindicancia', campo: 'solucao_cmt_file', id_proc: register.id}"/>
          <FileUpload label="Solução CMT Geral" :data="{ proc: 'sindicancia', campo: 'solucao_cmtgeral_file', id_proc: register.id}"/>
        </template>
        <q-btn @click="update" color="primary" label="Salvar" class="full-width"/>
      </q-tab-panel>

      <q-tab-panel name="movimentos">
        <movimento :data="{ id_sindicancia: register.id }"/>
      </q-tab-panel>

      <q-tab-panel name="sobrestamentos" @transition="validateNavigation">
        <sobrestamento @submit="changeAndamento" :data="{ id_sindicancia: register.id }"/>
      </q-tab-panel>

      <q-tab-panel name="arquivos" @transition="validateNavigation">
        <arquivo :data="{ id_sindicancia: register.id }"/>
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
import DivForm from 'src/components/form/DivForm.vue'

import { andamentoCogerSindicancia, andamentoSindicancia, motivoAberturaSindicancia, prorogacao, tipoBoletim } from 'src/config/selects'
import { getDense } from 'src/store/utils'
import { getAndamento, getSobrestamento } from 'src/utils'
import { Sindicancia } from 'src/types'
import { api, errorNotify, validate } from 'src/services'
import { sindicanciaRequiredFields } from 'src/rules'

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
    DivForm,
    BannerDeleted
  },
  setup (_, { refs, root }) {
    const vars = reactive({
      step: 1,
      tab: 'main',
      loading: false,
      register: {
        id: 0,
        id_andamentocoger: 0,
        id_andamento: 6,
        fato_data: undefined,
        abertura_data: undefined,
        sintese_txt: '',
        cdopm: '',
        doc_tipo: '',
        doc_numero: '',
        doc_origem_txt: '',
        portaria_numero: '',
        portaria_data: undefined,
        sol_cmt_file: '',
        sol_cmt_data: undefined,
        sol_cmtgeral_file: '',
        sol_cmtgeral_data: undefined,
        opm_meta4: '',
        relatorio_file: '',
        relatorio_data: undefined,
        prioridade: false,
        motivo_cancelamento: '',
        motivo_abertura: '',
        motivo_outros: '',
        prorogacao: false,
        prorogacao_dias: 0,
        completo: false,
        diasuteis_sobrestado: 0,
        motivo_sobrestado: '',
        prazo_decorrido: 0,
        deletedAt: undefined
      } as Sindicancia,
      andamentoCogerSindicancia,
      andamentoSindicancia,
      motivoAberturaSindicancia,
      prorogacao,
      tipoBoletim
    })

    function getRequiredFields () {
      return vars.register.id_andamento === 7 ? sindicanciaRequiredFields.toFinalize : sindicanciaRequiredFields.toEdit
    }

    async function update () {
      if (validate(refs, getRequiredFields())) {
        const validateSubforms = subforms()

        if (validateSubforms && vars.register.id) {
          vars.register.completo = true
          const { ok } = await api.put(`sindicancias/${vars.register.id}`, vars.register)
          if (ok) return root.$router.push('/sindicancias')
        }
      }
    }

    async function changeAndamento (sobrestamento: { termino_data: string }) {
      if (!vars.register.id) return
      const { id } = vars.register
      if (!sobrestamento.termino_data) {
        vars.register.id_andamento = getSobrestamento('sindicancia')
        const { ok } = await api.put(`sindicancias/${id}`, vars.register, { silent: true })
        if (ok) return
      }
      vars.register.id_andamento = getAndamento('sindicancia')
      await api.put(`sindicancias/${id}`, vars.register, { silent: true })
    }

    async function validateNavigation (tab: string) {
      if (validate(refs, getRequiredFields())) {
        const { ok } = await api.put(`sindicancias/${String(vars.register.id)}`, vars.register, { silent: true })
        if (ok) vars.tab = tab
      } else {
        vars.tab = 'main'
      }
    }

    async function loadData () {
      const { id } = root.$route.params
      if (id) {
        const { data, ok } = await api.get(`sindicancias/${id}`)
        if (ok) vars.register = data as Sindicancia
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
