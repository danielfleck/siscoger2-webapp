<template>
  <page :breadcrumbs="[
  { label: 'Lista', link: '/pad' },
  { label: 'Editar', link: '/pad/editar' },
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
          <BannerDeleted v-if="register.deletedAt" :id="register.id" proc="pad"/>
        </div-form>
        <div-form full>
          <Prioridade v-model="register.prioridade"/>
        </div-form>
        <div-form>
          <Andamento v-model="register.id_andamento" type="pad"/>
        </div-form>
        <div-form>
          <AndamentoCoger v-model="register.id_andamentocoger" type="pad"/>
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
        <div-form v-if="register.cdopm">
          <Portaria label="Nº da portaria de designação" v-model="register.portaria_numero" ref="portaria_numero" required proc="pad" :cdopm="register.cdopm"/>
        </div-form>
        <div-form>
          <InputDate v-model="register.portaria_data" label="Data da portaria de designação" ref="portaria_data" required/>
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
          <Membro label="Presidente" ref="Presidente" required :data="{ situacao: 'Presidente', id_pad: register.id }"/>
          <Membro label="Membro" ref="Membro" required :data="{ situacao: 'Membro', id_pad: register.id }"/>
          <Membro label="Membro" ref="Membro" required :data="{ situacao: 'Membro', id_pad: register.id }"/>
          <Vitima label="Civis envolvidos (Pessoa física, Apenas se houver)" :data="{ id_pad: register.id }"/>
          <!-- <Pj label="Pessoas juridicas envolvidas" :data="{ id_pad: register.id }"/> -->
          <FileUpload label="Relatorio" :data="{ proc: 'pad', campo: 'relatorio_file', id_proc: register.id}"/>
          <FileUpload label="Solucao" :data="{ proc: 'pad', campo: 'solucao_file', id_proc: register.id}"/>
        </template>
        <q-btn @click="update" color="primary" label="Salvar" class="full-width"/>
      </q-tab-panel>

      <q-tab-panel name="movimentos">
        <movimento :data="{ id_pad: register.id }"/>
      </q-tab-panel>

      <q-tab-panel name="sobrestamentos" @transition="validateNavigation">
        <sobrestamento @submit="changeAndamento" :data="{ id_pad: register.id }"/>
      </q-tab-panel>

      <q-tab-panel name="arquivos" @transition="validateNavigation">
        <arquivo :data="{ id_pad: register.id }"/>
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

import { getAndamento, getSobrestamento } from 'src/utils'
import { Pad } from 'src/types'
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
    BannerDeleted,
    DivForm
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
        doc_origem_txt: '', // text
        fato_data: new Date(),
        cdopm: '',
        sintese_txt: '', // text
        portaria_numero: '',
        portaria_data: new Date(),
        doc_tipo: '',
        doc_numero: '',
        abertura_data: new Date(),
        relatorio_file: '',
        solucao_file: '',
        prioridade: 0,
        deletedAt: undefined
      } as Pad
    })

    async function update () {
      if (validate(refs, fields)) {
        const validateSubforms = subforms()

        if (validateSubforms && vars.register.id) {
          vars.register.completo = true
          const { ok } = await api.put(`pad/${vars.register.id}`, vars.register)
          if (ok) return root.$router.push('/pad')
        }
      }
    }

    async function changeAndamento (sobrestamento: { termino_data: string }) {
      if (!vars.register.id) return
      const { id } = vars.register
      if (!sobrestamento.termino_data) {
        vars.register.id_andamento = getSobrestamento('pad')
        const { ok } = await api.put(`pad/${id}`, vars.register, { silent: true })
        if (ok) return
      }
      vars.register.id_andamento = getAndamento('pad')
      await api.put(`pad/${id}`, vars.register, { silent: true })
    }

    async function validateNavigation (tab: string) {
      if (validate(refs, fields)) {
        const { ok } = await api.put(`pad/${String(vars.register.id)}`, vars.register, { silent: true })
        if (ok) vars.tab = tab
      } else {
        vars.tab = 'main'
      }
    }

    async function loadData () {
      const { id } = root.$route.params
      if (id) {
        const { data, ok } = await api.get(`pad/${id}`)
        if (ok) vars.register = data as Pad
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
      changeAndamento,
      validateNavigation
    }
  }
})
</script>
