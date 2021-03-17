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
          <BannerDeleted v-if="register.deletedAt" :id="register.id" proc="cd"/>
        </div-form>
        <div-form full>
          <Prioridade v-model="register.prioridade"/>
        </div-form>
        <div-form>
          <Andamento v-model="register.id_andamento" type="cd"/>
        </div-form>
        <div-form>
          <AndamentoCoger v-model="register.id_andamentocoger" type="cd"/>
        </div-form>
        <div-form>
          <InputSelect tooltip="Lei nº 16.544/2010" label="Motivo abertura" v-model="register.id_motivoconselho" :options="motivoConselho" />
        </div-form>
        <div-form>
          <InputSelect label="Situação" v-model="register.id_situacaoconselho" :options="situacaoServicoOuFora" />
        </div-form>
        <div-form>
          <InputSelect label="Em decorrência de" v-model="register.id_decorrenciaconselho" :options="decorrenciaConselho" />
        </div-form>
        <!-- <div-form v-if="register.id_decorrenciaconselho === 13">
          <InputText label="Especificar (no caso de outros motivos)" v-model="register.outromotivo" ref="outromotivo" required/>
        </div-form> -->
        <div-form>
          <Portaria label="N° Portaria" v-model="register.portaria_numero" ref="portaria_numero" required proc="cd" :cdopm="register.cdopm"/>
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
          <InputDate v-model="register.fato_data" label="Data da fato" />
        </div-form>
        <div-form>
          <InputDate v-model="register.abertura_data" label="Data da abertura" />
        </div-form>
        <div-form>
          <InputDate v-model="register.prescricao_data" label="Data da prescrição" />
        </div-form>
        <div-form full>
          <InputText label="Sintese do fato" v-model="register.sintese_txt" ref="sintese_txt" :minLength="200" autogrow required :lorem="200"/>
        </div-form>
        <template v-if="register.id">
          <ProcedOrigem type="cd" :data="{ id_cd: register.id }"/>
          <Membro label="Presidente" ref="Presidente" required :data="{ situacao: 'Presidente', id_cd: register.id }"/>
          <Membro label="Escrivão" ref="Escrivão" :data="{ situacao: 'Escrivão', id_cd: register.id }"/>
          <Membro label="Defensor" ref="Defensor" :data="{ situacao: 'Defensor', id_cd: register.id }"/>
          <Acusado label="Acusado" :data="{ id_cd: register.id }"/>
          <Vitima :data="{ id_cd: register.id }"/>
          <FileUpload label="Libelo" :data="{ proc: 'cd', campo: 'libelo_file', id_proc: register.id}"/>
          <FileUpload label="Parecer Comissão" :data="{ proc: 'cd', campo: 'parecer_file', id_proc: register.id}"/>
          <FileUpload label="Decisão do Cmt Geral" :data="{ proc: 'cd', campo: 'decisao_file', id_proc: register.id}"/>

          <FileUpload label="Reconsideração de ato (solução)" :data="{ proc: 'cd', campo: 'rec_ato_file', id_proc: register.id}"/>
          <FileUpload label="Recurso ao Governador (solução)" :data="{ proc: 'cd', campo: 'stj_file', id_proc: register.id}"/>

          <FileUpload label="TJ-PR" :data="{ proc: 'cd', campo: 'tjpr_file', id_proc: register.id}"/>
          <FileUpload label="STJ/STF" :data="{ proc: 'cd', campo: 'libelo_file', id_proc: register.id}"/>
        </template>
        <q-btn @click="update" color="primary" label="Salvar" class="full-width"/>
      </q-tab-panel>

      <q-tab-panel name="movimentos">
        <movimento :data="{ id_cd: register.id }"/>
      </q-tab-panel>

      <q-tab-panel name="sobrestamentos" @transition="validateNavigation">
        <sobrestamento @submit="changeAndamento" :data="{ id_cd: register.id }"/>
      </q-tab-panel>

      <q-tab-panel name="arquivos" @transition="validateNavigation">
        <arquivo :data="{ id_cd: register.id }"/>
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
import InputSelect from 'src/components/form/InputSelect.vue'

import { motivoConselho, situacaoServicoOuFora, decorrenciaConselho } from 'src/config'
import { getAndamento, getSobrestamento } from 'src/utils'
import { Cj } from 'src/types'
import { api, errorNotify, getUserCdopm, validate } from 'src/services'
import { cjRequiredFields } from 'src/rules'
import { cjRoute } from 'src/routenames'

const breadcrumbs = [
  { label: 'Lista', link: `/${cjRoute}` },
  { label: 'Criar', link: `/${cjRoute}/inserir` }
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
        id_andamentocoger: 0,
        id_andamento: 0,
        id_motivoconselho: 0,
        id_decorrenciaconselho: 0,
        id_situacaoconselho: 0,
        motivo_outros: '',
        cdopm: getUserCdopm(),
        sjd_ref: 0,
        sjd_ref_ano: 0,
        abertura_data: new Date(),
        fato_data: new Date(),
        libelo_file: '',
        doc_tipo: '',
        doc_numero: '',
        portaria_numero: '',
        portaria_data: new Date(),
        parecer_file: '',
        decisao_file: '',
        doc_prorrogacao: '',
        numero_tj: '',
        prescricao_data: new Date(),
        exclusao_txt: '',
        rec_ato_file: '',
        rec_gov_file: '',
        opm_meta4: '',
        ac_desempenho_bl: '',
        ac_conduta_bl: '',
        ac_honra_bl: '',
        tjpr_file: '',
        sjd_file: '',
        sintese_txt: '',
        prioridade: false,
        deletedAt: undefined
      } as Cj,
      cdopm: getUserCdopm(),
      breadcrumbs,
      motivoConselho,
      decorrenciaConselho,
      situacaoServicoOuFora
    })

    function getRequiredFields () {
      return vars.register.id_andamento === 13 ? cjRequiredFields.toFinalize : cjRequiredFields.toEdit
    }

    async function update () {
      if (validate(refs, getRequiredFields())) {
        const validateSubforms = subforms()

        if (validateSubforms && vars.register.id) {
          vars.register.completo = true
          const { ok } = await api.put(`${cjRoute}/${String(vars.register.id)}`, vars.register)
          if (ok) return root.$router.push(`/${cjRoute}`)
        }
      }
    }

    async function changeAndamento (sobrestamento: { termino_data: string }) {
      if (!vars.register.id) return
      const { id } = vars.register
      if (!sobrestamento.termino_data) {
        vars.register.id_andamento = getSobrestamento('cj')
        const { ok } = await api.put(`${cjRoute}/${String(id)}`, vars.register, { silent: true })
        if (ok) return
      }
      vars.register.id_andamento = getAndamento('cj')
      await api.put(`${cjRoute}/${String(id)}`, vars.register, { silent: true })
    }

    async function validateNavigation (tab: string) {
      if (validate(refs, getRequiredFields())) {
        const { ok } = await api.put(`${cjRoute}/${String(vars.register.id)}`, vars.register, { silent: true })
        if (ok) vars.tab = tab
      } else {
        vars.tab = 'main'
      }
    }

    async function loadData () {
      const { id } = root.$route.params
      if (id) {
        const { data, ok } = await api.get(`${cjRoute}/${id}`)
        if (ok) vars.register = data as Cj
      }
    }

    function subforms () {
      const Presidente = refs.Presidente.getState()
      if (Presidente === 'toInsert') {
        errorNotify('Insira o Presidente')
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
