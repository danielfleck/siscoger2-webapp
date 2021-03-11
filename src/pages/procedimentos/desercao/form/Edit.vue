<template>
  <page :breadcrumbs="[
  { label: 'Lista', link: '/desercao' },
  { label: 'Editar', link: '/desercao/editar' },
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
          <BannerDeleted v-if="register.deletedAt" :id="register.id" proc="desercao"/>
        </div-form>
        <div-form full>
          <Prioridade v-model="register.prioridade"/>
        </div-form>
        <div-form full>
            <Prioridade v-model="register.prioridade"/>
          </div-form>
          <div-form>
            <Andamento v-model="register.id_andamento" type="desercao"/>
          </div-form>
          <div-form>
            <AndamentoCoger v-model="register.id_andamentocoger" type="desercao"/>
          </div-form>
          <div-form>
            <InputDate v-model="register.fato_data" label="Data da fato" />
          </div-form>
          <div-form>
            <OPM v-model="register.cdopm" ref="opm" required/>
          </div-form>
          <div-form>
            <TipoBoletim v-model="register.doc_tipo"/>
          </div-form>
          <div-form>
            <InputText label="N° Boletim" mask="#######/####" reverse v-model="register.doc_numero" />
          </div-form>
          <div-form>
            <InputSelect label="Termo exclusão/agregação" v-model="register.termo_exclusao" :options="termoExclusaoAgregacao" ref="termo_exclusao" required/>
          </div-form>
          <div-form v-if="register.termo_exclusao">
            <InputText tooltip="Ex: BG 110/2010" label="Publicação" v-model="register.termo_exclusao_pub" ref="termo_exclusao_pub" required/>
          </div-form>
          <div-form>
            <InputSelect label="Motivo abertura" v-model="register.termo_captura" :options="termoApresentacaoCaptura" ref="termo_captura" required/>
          </div-form>
          <div-form v-if="register.termo_captura">
            <InputText tooltip="Ex: BG 110/2010" label="Publicação" v-model="register.termo_captura_pub" ref="termo_captura_pub" required/>
          </div-form>
          <div-form>
            <InputSelect label="Motivo abertura" v-model="register.pericia" :options="desercaoPericia" ref="pericia" required/>
          </div-form>
          <div-form v-if="register.pericia">
            <InputText tooltip="Ex: BG 110/2010" label="Publicação" v-model="register.pericia_pub" ref="pericia_pub" required/>
          </div-form>
          <div-form>
            <InputSelect label="Motivo abertura" v-model="register.termo_inclusao" :options="termoInclusaoReversao" ref="termo_inclusao" required/>
          </div-form>
          <div-form v-if="register.termo_inclusao">
            <InputText tooltip="Ex: BG 110/2010" label="Publicação" v-model="register.termo_inclusao_pub" ref="termo_inclusao_pub" required/>
          </div-form>
          <div-form>
            <InputText tooltip="Nº do processo, vara" label="Referencia VAJME" v-model="register.referenciavajme" ref="referenciavajme" required/>
          </div-form>
        <template v-if="register.id">
          <Acusado label="Desertor" :data="{ situacao: 'desertor', id_desercao: register.id }"/>
          <!-- <FileUpload label="Solução do Comandante" :data="{ proc: 'desercao', campo: 'solucao_cmt_file', id_proc: register.id}"/> -->
        </template>
        <q-btn @click="update" color="primary" label="Salvar" class="full-width"/>
      </q-tab-panel>

      <q-tab-panel name="movimentos">
        <movimento :data="{ id_desercao: register.id }"/>
      </q-tab-panel>

      <q-tab-panel name="reus" @transition="validateNavigation">
        TODO
      </q-tab-panel>

      <q-tab-panel name="arquivos" @transition="validateNavigation">
        <arquivo :data="{ id_desercao: register.id }"/>
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

import { andamentoCogerDesercao, termoExclusaoAgregacao, termoApresentacaoCaptura, desercaoPericia, termoInclusaoReversao } from 'src/config'
import { Desercao } from 'src/types'
import { api, errorNotify, getUserCdopm, validate } from 'src/services'
import InputSelect from 'src/components/form/InputSelect.vue'

const fields = [
  'decorrenciaconselho',
  'cdopm',
  'fato_data',
  'doc_tipo',
  'doc_numero',
  'termo_exclusao',
  'termo_exclusao_pub',
  'termo_captura',
  'termo_captura_pub',
  'pericia',
  'pericia_pub',
  'termo_inclusao',
  'termo_inclusao_pub',
  'opm_meta4',
  'referenciavajme'
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
        decorrenciaconselho: '',
        id_andamento: 0,
        id_andamentocoger: 0,
        sjd_ref: 0,
        sjd_ref_ano: 0,
        cdopm: '',
        fato_data: new Date(),
        doc_tipo: '',
        doc_numero: '',
        termo_exclusao: '',
        termo_exclusao_pub: '',
        termo_captura: '',
        termo_captura_pub: '',
        pericia: '',
        pericia_pub: '',
        termo_inclusao: '',
        termo_inclusao_pub: '',
        opm_meta4: '',
        referenciavajme: '',
        prioridade: 0,
        deletedAt: undefined
      } as Desercao,
      cdopm: getUserCdopm(),
      andamentoCogerDesercao,
      termoExclusaoAgregacao,
      termoApresentacaoCaptura,
      desercaoPericia,
      termoInclusaoReversao
    })

    async function update () {
      if (validate(refs, fields)) {
        const validateSubforms = subforms()

        if (validateSubforms && vars.register.id) {
          vars.register.completo = true
          const { ok } = await api.put(`desercoes/${vars.register.id}`, vars.register)
          if (ok) return root.$router.push('/desercao')
        }
      }
    }

    async function validateNavigation (tab: string) {
      if (validate(refs, fields)) {
        const { ok } = await api.put(`desercoes/${String(vars.register.id)}`, vars.register, { silent: true })
        if (ok) vars.tab = tab
      } else {
        vars.tab = 'main'
      }
    }

    async function loadData () {
      const { id } = root.$route.params
      if (id) {
        const { data, ok } = await api.get(`desercoes/${id}`)
        if (ok) vars.register = data as Desercao
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
