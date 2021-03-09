<template>
  <page :breadcrumbs="[
  { label: 'Lista', link: '/exclusao/lista' },
  { label: register.id ? 'Editar' : 'Inserir', link: '/exclusao/editar' },
  ]">

    <div  class="q-pa-md col-12">
      <BannerDeleted v-if="register.deletedAt" :id="register.id" proc="exclusao"/>
    </div>
    <div class="q-pa-xs col-4">
        <InputText label="RG" ref="rg" v-model="register.rg" required/>
    </div>
    <div class="q-pa-xs col-4">
      <InputText :disable="disabled" label="Nome" ref="nome" v-model="register.nome" required/>
    </div>
    <div class="q-pa-xs col-4">
      <PostoGrad :disable="disabled" v-model="register.cargo" ref="cargo" required/>
    </div>
    <div class="q-pa-md col-4">
      <OPM v-model="register.cdopm_quandoexcluido" ref="cdopm_quandoexcluido" required/>
    </div>
    <div class="q-pa-xs col-4">
      <ProcedTipos v-model="register.origem_proc" label="Processo/Procedimento" ref="origem_proc" required/>
    </div>
    <div class="q-pa-xs col-3">
      <InputAno v-model="register.origem_sjd_ref_ano" ref="origem_sjd_ref_ano" required/>
    </div>
    <div class="q-pa-xs col-3">
      <InputText label="Referência" v-model="register.origem_sjd_ref" ref="origem_sjd_ref" mask="######" required/>
    </div>
    <div class="q-pa-xs col-4">
      <InputText tooltip="Ex: Ação Penal Militar nº 2010.0000XXX-X - Curitiba" label="Processo, Nº do processo - Comarca" v-model="register.processo" ref="processo" required/>
    </div>
    <div class="q-pa-xs col-4">
      <InputText tooltip="Ex: Art. 121 § 2º CP" label="Artigos da Infração penal" v-model="register.complemento" ref="complemento" required/>
    </div>
    <div class="q-pa-xs col-4">
      <InputText tooltip="Ex: 3ª Vara Criminal de Curitiba" label="Vara e Comarca" v-model="register.vara" ref="vara" required/>
    </div>
    <div class="q-pa-xs col-4">
      <InputText tooltip="Ex: 0003956-00.2012.8.16.0013" label="Nº único" v-model="register.numerounico" ref="numerounico" required/>
    </div>
    <div class="q-pa-md col-4">
      <InputDate v-model="register.data" label="Data da sentença" ref="data" required/>
    </div>
    <div class="q-pa-md col-4">
      <InputDate v-model="register.exclusao_data" label="Data da exclusão (data que publicou a portaria)" ref="exclusao_data" required/>
    </div>
    <div class="q-pa-md col-4">
      <Portaria label="N° Portaria" v-model="register.portaria_numero" ref="portaria_numero" required/>
    </div>
    <div class="q-pa-md col-4">
      <InputNumber label="BG número" v-model="register.bg_numero" ref="bg_numero" required/>
    </div>
    <div class="q-pa-md col-4">
      <InputAno label="BG Ano" v-model="register.bg_ano" ref="bg_ano" required/>
    </div>
    <div class="q-pa-md col-12">
      <InputText label="Sintese do fato" v-model="register.obs_txt" ref="obs_txt" :minLength="200" autogrow required :lorem="200"/>
    </div>
    <q-btn @click="save" color="primary" label="Salvar" class="full-width"/>
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

import { ExclusaoJudicial } from 'src/types'
import { api, validate } from 'src/services'
import PostoGrad from 'src/components/form/PostoGrad.vue'
import ProcedTipos from 'src/components/form/ProcedTipos.vue'
const fields = [
  'rg',
  'cargo',
  'nome',
  'cdopm_quandoexcluido',
  'origem_proc',
  'origem_sjd_ref',
  'origem_sjd_ref_ano',
  'origem_opm',
  'processo',
  'complemento',
  'vara',
  'numerounico',
  'data',
  'exclusao_data',
  'obs_txt',
  'portaria_numero',
  'bg_numero',
  'bg_ano'
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
    PostoGrad,
    ProcedTipos
  },
  setup (_, { refs, root }) {
    const vars = reactive({
      loading: false,
      register: {
        id: 0,
        rg: '',
        cargo: '',
        nome: '',
        cdopm_quandoexcluido: '',
        origem_proc: '',
        origem_sjd_ref: 0,
        origem_sjd_ref_ano: 0,
        origem_opm: '',
        processo: '',
        complemento: '',
        vara: '',
        numerounico: '',
        data: new Date(),
        exclusao_data: new Date(),
        obs_txt: '', // text
        portaria_numero: 0,
        bg_numero: 0,
        bg_ano: 0,
        prioridade: 0,
        deletedAt: undefined
      } as ExclusaoJudicial
    })

    async function save () {
      if (validate(refs, fields)) {
        if (vars.register.id) {
          const { ok } = await api.post('exclusao', vars.register)
          if (ok) return root.$router.push('/exclusao/lista')
        }
        const { ok } = await api.put(`exclusao/${String(vars.register.id)}`, vars.register)
        if (ok) return root.$router.push('/exclusao/lista')
      }
    }

    async function loadData () {
      const { id } = root.$route.params
      if (id) {
        const { data, ok } = await api.get(`exclusao/${id}`)
        if (ok) vars.register = data as ExclusaoJudicial
      }
    }
    // eslint-disable-next-line no-void
    void loadData()

    return {
      ...toRefs(vars),
      save
    }
  }
})
</script>
