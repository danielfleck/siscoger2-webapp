<template>
  <page :breadcrumbs="[
  { label: 'Lista', link: '/ipm' },
  { label: 'Editar', link: '/ipm/editar' },
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
          <BannerDeleted v-if="register.deletedAt" :id="register.id" proc="ipm"/>
        </div-form>
        <div-form full>
          <Prioridade v-model="register.prioridade"/>
        </div-form>
        <div-form>
          <Andamento v-model="register.id_andamento" type="ipm"/>
        </div-form>
        <div-form>
          <AndamentoCoger v-model="register.id_andamentocoger" type="ipm"/>
        </div-form>
        <div-form>
          <OPM v-model="register.cdopm" ref="opm" required/>
        </div-form>
        <div-form>
          <InputDate v-model="register.fato_data" label="Data da fato" />
        </div-form>
        <div-form>
          <InputDate v-model="register.abertura_data" label="Data da portaria de delegação de poderes" />
        </div-form>
        <div-form>
          <InputDate v-model="register.autuacao_data" label="Data da portaria de instauração" />
        </div-form>
        <div-form v-if="register.cdopm">
          <Portaria label="N° Portaria" v-model="register.portaria_numero" ref="portaria_numero" required proc="ipm" :cdopm="register.cdopm"/>
        </div-form>
        <div-form>
          <InputSelect label="Motivo da abertura (crime)" v-model="register.crime" :options="crime" />
        </div-form>
        <div-form>
          <InputSelect label="Tipo (crime)" v-model="register.tentado" :options="tentado" />
        </div-form>
        <div-form v-if="register.crime === 'Outros'">
          <InputText label="Documento de origem" v-model="register.crime_especificar" ref="crime_especificar" required/>
        </div-form>
        <div-form>
          <InputSelect label="Situação" v-model="register.id_situacao" :options="situacaoServicoOuFora" />
        </div-form>
        <div-form>
          CIDADE DO FATO - TODO
        </div-form>
        <div-form>
          <InputText label="N° Boletim" mask="#######" v-model="register.bou_numero" />
        </div-form>
        <div-form>
          <InputAno label="Bou Ano" v-model="register.bou_ano" ref="bou_ano" required/>
        </div-form>
        <div-form>
          <InputText label="N° Eproc" mask="#######" v-model="register.n_eproc" />
        </div-form>
        <div-form>
          <InputAno label="Eproc Ano" v-model="register.ano_eproc" ref="bou_ano" required/>
        </div-form>
        <div-form>
          <InputText label="Conclusão do encarregado" v-model="register.relato_enc" />
        </div-form>
        <div-form>
          <InputText label="Solução do Cmt OPM" v-model="register.relato_cmtopm" />
        </div-form>
        <div-form>
          <InputText label="Decisão do Cmt Geral" v-model="register.relato_cmtgeral" />
        </div-form>
        <div-form full>
          <InputText label="Sintese do fato" v-model="register.sintese_txt" ref="sintese_txt" :minLength="200" autogrow required :lorem="200"/>
        </div-form>
        <template v-if="register.id">
          <ProcedOrigem type="ipm" :data="{ id_ipm: register.id }"/>
          <Membro label="Encarregado" ref="Encarregado" required :data="{ situacao: 'Encarregado', id_ipm: register.id }"/>
          <Membro label="Escrivão" ref="escrivao" :data="{ situacao: 'escrivao', id_ipm: register.id }"/>
          <Acusado label="Indiciados" :data="{ situacao: 'indiciado', id_ipm: register.id }"/>
          <Vitima :data="{ id_ipm: register.id }"/>
          <FileUpload label="Conclusão do encarregado" :data="{ proc: 'ipm', campo: 'relato_enc_file', id_proc: register.id}"/>
          <FileUpload label="Solução do Comandante" :data="{ proc: 'ipm', campo: 'relato_cmtopm_file', id_proc: register.id}"/>
          <FileUpload label="Solução CMT Geral" :data="{ proc: 'ipm', campo: 'relato_cmtgeral_file', id_proc: register.id}"/>
          <FileUpload label="Relatório complementar" :data="{ proc: 'ipm', campo: 'relcomplementar_file', id_proc: register.id}"/>
        </template>
        <q-btn @click="update" color="primary" label="Salvar" class="full-width"/>
      </q-tab-panel>

      <q-tab-panel name="movimentos">
        <movimento :data="{ id_ipm: register.id }"/>
      </q-tab-panel>

      <q-tab-panel name="sobrestamentos" @transition="validateNavigation">
        <sobrestamento @submit="changeAndamento" :data="{ id_ipm: register.id }"/>
      </q-tab-panel>

      <q-tab-panel name="arquivos" @transition="validateNavigation">
        <arquivo :data="{ id_ipm: register.id }"/>
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
import InputSelect from 'src/components/form/InputSelect.vue'

import { getDense } from 'src/store/utils'
import { Ipm } from 'src/types'
import { api, errorNotify, validate } from 'src/services'
import { ipmRequiredFields } from 'src/rules'

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
        prioridade: false,
        deletedAt: undefined
      } as Ipm
    })

    function getRequiredFields () {
      // return vars.register.id_andamento === 10 ? ipmRequiredFields.toFinalize : ipmRequiredFields.toEdit
      return ipmRequiredFields.toEdit
    }

    async function update () {
      if (validate(refs, getRequiredFields())) {
        const validateSubforms = subforms()

        if (validateSubforms && vars.register.id) {
          vars.register.completo = true
          const { ok } = await api.put(`ipms/${vars.register.id}`, vars.register)
          if (ok) return root.$router.push('/ipm')
        }
      }
    }

    async function validateNavigation (tab: string) {
      if (validate(refs, getRequiredFields())) {
        const { ok } = await api.put(`ipms/${String(vars.register.id)}`, vars.register, { silent: true })
        if (ok) vars.tab = tab
      } else {
        vars.tab = 'main'
      }
    }

    async function loadData () {
      const { id } = root.$route.params
      if (id) {
        const { data, ok } = await api.get(`ipms/${id}`)
        if (ok) vars.register = data as Ipm
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
      validateNavigation
    }
  }
})
</script>
