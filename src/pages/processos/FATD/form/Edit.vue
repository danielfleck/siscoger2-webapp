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
      <q-tab name="acompanhamento" icon="hourglass_top" label="Acompanhamento"/>
      <q-tab name="arquivos" icon="folder" label="Arquivos" />
    </q-tabs>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="main" class="row">
        <div-form full>
          <BannerDeleted v-if="register.deletedAt" :id="register.id" proc="fatd"/>
        </div-form>
        <div-form full>
          <Prioridade v-model="register.prioridade"/>
        </div-form>
        <div-form>
          <Andamento v-model="register.id_andamento" type="fatd"/>
        </div-form>
        <div-form>
          <AndamentoCoger v-model="register.id_andamentocoger" type="fatd"/>
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
          <InputSelect label="Motivo do FATD" v-model="register.motivo_fatd" :options="motivoFATD" />
        </div-form>
        <div-form v-if="register.motivo_fatd === 'Outro'">
          <InputText label="Descreva o motivo" v-model="register.motivo_outros" ref="motivo_outros" required/>
        </div-form>
        <div-form>
          <InputSelect label="Situação" v-model="register.situacao_fatd" :options="situacaoFatd" />
        </div-form>
        <div-form>
          <InputText tooltip="ATENÇÃO, CINCO NÚMEROS" label="Nº do despacho que designa o Encarregado" mask="#####" v-model="register.despacho_numero" ref="despacho_numero" required/>
        </div-form>
        <div-form>
          <InputDate v-model="register.portaria_data" label="Data do despacho" ref="portaria_data" required/>
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
        <div-form full>
          <InputText label="Sintese do fato" v-model="register.sintese_txt" ref="sintese_txt" :minLength="200" autogrow required :lorem="200"/>
        </div-form>
        <template v-if="register.id">
          <ProcedOrigem type="fatd" :data="{ id_fatd: register.id }"/>
          <Membro label="Encarregado" ref="Encarregado" required :data="{ situacao: 'Encarregado', id_fatd: register.id }"/>
          <Membro label="Acusador" ref="Acusador" required :data="{ situacao: 'Acusador', id_fatd: register.id }"/>
          <Membro label="Defensor" ref="Defensor" :data="{ situacao: 'Defensor', id_fatd: register.id }"/>
          <Acusado label="Sindicado" :data="{ situacao: 'sindicado', id_fatd: register.id }"/>
          <Vitima :data="{ id_fatd: register.id }"/>

          <FileUpload label="Relato do fato imputado" :data="{ proc: 'fatd', campo: 'fato_file', id_proc: register.id}"/>
          <FileUpload label="Relatório" :data="{ proc: 'fatd', campo: 'relatorio_file', id_proc: register.id}"/>
          <FileUpload label="Solução do Comandante" :data="{ proc: 'fatd', campo: 'sol_cmt_file', id_proc: register.id}"/>
          <FileUpload label="Solução do Cmt Geral" :data="{ proc: 'fatd', campo: 'sol_cg_file', id_proc: register.id}"/>
          <FileUpload label="Nota de punição" :data="{ proc: 'fatd', campo: 'notapunicao_file', id_proc: register.id}"/>
          <div-form full>
            <InputText tooltip="Ex: BI nº 12/2011" label="Publicação da nota de punição" reverse v-model="register.publicacaonp" />
          </div-form>
          <FileUpload label="Reconsideração de ato (solução)" :data="{ proc: 'fatd', campo: 'rec_ato_file', id_proc: register.id}"/>
          <FileUpload label="Recurso Cmt OPM" :data="{ proc: 'fatd', campo: 'rec_cmt_file', id_proc: register.id}"/>
          <FileUpload label="Recurso Cmt CRPM" :data="{ proc: 'fatd', campo: 'rec_crpm_file', id_proc: register.id}"/>
          <FileUpload label="Recurso Cmt Geral" :data="{ proc: 'fatd', campo: 'rec_cg_file', id_proc: register.id}"/>
        </template>
        <q-btn @click="update" color="primary" label="Salvar" class="full-width"/>
      </q-tab-panel>

      <q-tab-panel name="movimentos">
        <movimento :data="{ id_fatd: register.id }"/>
      </q-tab-panel>

      <q-tab-panel name="sobrestamentos" @transition="validateNavigation">
        <sobrestamento @submit="changeAndamento" :data="{ id_fatd: register.id }"/>
      </q-tab-panel>

      <q-tab-panel name="acompanhamento" @transition="validateNavigation">
        TODO
      </q-tab-panel>

      <q-tab-panel name="arquivos" @transition="validateNavigation">
        <arquivo :data="{ id_fatd: register.id }"/>
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

import { motivoFATD, situacaoFATD } from 'src/config'
import { getDense } from 'src/store/utils'
import { getAndamento, getSobrestamento } from 'src/utils'
import { Fatd } from 'src/types'
import { api, errorNotify, getUserCdopm, validate } from 'src/services'
import InputSelect from 'src/components/form/InputSelect.vue'
import { fatdRequiredFields } from 'src/rules'
import { fatdRoute } from 'src/routenames'

const breadcrumbs = [
  { label: 'Lista', link: `/${fatdRoute}` },
  { label: 'Criar', link: `/${fatdRoute}/inserir` }
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
        id_andamento: 0,
        id_andamentocoger: 0,
        sjd_ref: 0,
        sjd_ref_ano: 0,
        fato_data: new Date(),
        abertura_data: new Date(),
        sintese_txt: '', // text
        cdopm: '',
        doc_tipo: '',
        doc_numero: '',
        doc_origem_txt: '', // text
        despacho_numero: '',
        portaria_data: new Date(),
        fato_file: '',
        relatorio_file: '',
        sol_cmt_file: '',
        sol_cg_file: '',
        rec_ato_file: '',
        rec_cmt_file: '',
        rec_crpm_file: '',
        rec_cg_file: '',
        opm_meta4: '',
        notapunicao_file: '',
        publicacaonp: '',
        prioridade: false,
        situacao_fatd: '',
        motivo_fatd: '',
        motivo_outros: '',
        deletedAt: undefined
      } as Fatd,
      breadcrumbs,
      cdopm: getUserCdopm(),
      motivoFATD,
      situacaoFATD
    })

    function getRequiredFields () {
      return vars.register.id_andamento === 2 ? fatdRequiredFields.toFinalize : fatdRequiredFields.toEdit
    }

    async function update () {
      if (validate(refs, getRequiredFields())) {
        const validateSubforms = subforms()

        if (validateSubforms && vars.register.id) {
          vars.register.completo = true
          const { ok } = await api.put(`${fatdRoute}/${vars.register.id}`, vars.register)
          if (ok) return root.$router.push(`/${fatdRoute}`)
        }
      }
    }

    async function changeAndamento (sobrestamento: { termino_data: string }) {
      if (!vars.register.id) return
      const { id } = vars.register
      if (!sobrestamento.termino_data) {
        vars.register.id_andamento = getSobrestamento('fatd')
        const { ok } = await api.put(`${fatdRoute}/${id}`, vars.register, { silent: true })
        if (ok) return
      }
      vars.register.id_andamento = getAndamento('fatd')
      await api.put(`${fatdRoute}/${id}`, vars.register, { silent: true })
    }

    async function validateNavigation (tab: string) {
      if (validate(refs, getRequiredFields())) {
        const { ok } = await api.put(`${fatdRoute}/${String(vars.register.id)}`, vars.register, { silent: true })
        if (ok) vars.tab = tab
      } else {
        vars.tab = 'main'
      }
    }

    async function loadData () {
      const { id } = root.$route.params
      if (id) {
        const { data, ok } = await api.get(`${fatdRoute}/${id}`)
        if (ok) vars.register = data as Fatd
      }
    }

    function subforms () {
      const Encarregado = refs.Encarregado.getState()
      if (Encarregado === 'toInsert') {
        errorNotify('Insira o Encarregado')
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
