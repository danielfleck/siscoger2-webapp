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
          <BannerDeleted v-if="register.deletedAt" :id="register.id" proc="apfd"/>
        </div-form>
        <div-form full>
          <Prioridade v-model="register.prioridade"/>
        </div-form>
        <div-form>
          <InputSelect label="Tipo" v-model="register.tipo" :options="tipoApfd" />
        </div-form>
        <div-form>
          <OPM v-model="register.cdopm" ref="opm" required/>
        </div-form>
        <div-form>
          <Andamento v-model="register.id_andamento" type="apfd"/>
        </div-form>
        <div-form>
          <AndamentoCoger v-model="register.id_andamentocoger" type="apfd"/>
        </div-form>
        <div-form>
          <InputDate v-model="register.fato_data" label="Data da fato" />
        </div-form>
          <div-form>
          <InputSelect tooltip="Do mais grave ao menos grave" label="Tipos penais" v-model="register.tipo_penal_novo" :options="crime" />
        </div-form>
        <div-form v-if="register.tipo_penal_novo === 'Outros'">
          <InputText label="Documento de origem" v-model="register.especificar" ref="especificar" required/>
        </div-form>
        <div-form>
          <TipoBoletim v-model="register.doc_tipo"/>
        </div-form>
        <div-form>
          <InputText label="N° Boletim" mask="#######/####" reverse v-model="register.doc_numero" />
        </div-form>
        <div-form>
          <InputText tooltip="Nº do processo e vara" label="Referencia da VAJME" v-model="register.referenciavajme" />
        </div-form>
        <div-form full>
          <InputText label="Sintese do fato" v-model="register.sintese_txt" ref="sintese_txt" :minLength="200" autogrow required :lorem="200"/>
        </div-form>
        <template v-if="register.id">
          <Membro label="Presidente" ref="Presidente" required :data="{ situacao: 'Presidente', id_apfd: register.id }"/>
          <Membro label="Condutor" ref="condutor" required :data="{ situacao: 'condutor', id_apfd: register.id }"/>
          <Membro label="Escrivão" ref="escrivao" :data="{ situacao: 'escrivao', id_apfd: register.id }"/>
          <Acusado label="Acusado" :data="{ situacao: 'acusado', id_apfd: register.id }"/>
          <Vitima :data="{ id_apfd: register.id }"/>
          <!-- <FileUpload label="Relatório do Encarregado" :data="{ proc: 'apfd', campo: 'relatorio_encarregado_file', id_proc: register.id}"/> -->
        </template>
        <q-btn @click="update" color="primary" label="Salvar" class="full-width"/>
      </q-tab-panel>

      <q-tab-panel name="movimentos">
        <movimento :data="{ id_apfd: register.id }"/>
      </q-tab-panel>

      <q-tab-panel name="reus" @transition="validateNavigation">
        TODO
      </q-tab-panel>

      <q-tab-panel name="arquivos" @transition="validateNavigation">
        <arquivo :data="{ id_apfd: register.id }"/>
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

import { andamentoCogerAPFD, crime, tipoApfd } from 'src/config'
import { getDense } from 'src/store/utils'
import { getAndamento, getSobrestamento } from 'src/utils'
import { Apfd } from 'src/types'
import { api, errorNotify, getUserCdopm, validate } from 'src/services'
import DivForm from 'src/components/form/DivForm.vue'
import InputSelect from 'src/components/form/InputSelect.vue'
import { apfdRequiredFields } from 'src/rules'
import { apfdRoute } from 'src/routenames'

const breadcrumbs = [
  { label: 'Lista', link: `/${apfdRoute}` },
  { label: 'Criar', link: `/${apfdRoute}/inserir` }
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
        tipo: '',
        cdopm: '',
        fato_data: new Date(),
        sintese_txt: '',
        tipo_penal: '',
        tipo_penal_novo: '',
        especificar: '',
        doc_tipo: '',
        doc_numero: '',
        exclusao_txt: '',
        opm_meta4: '',
        referenciavajme: '',
        prioridade: false,
        deletedAt: undefined
      } as Apfd,
      cdopm: getUserCdopm(),
      breadcrumbs,
      andamentoCogerAPFD,
      crime,
      tipoApfd
    })

    function getRequiredFields () {
      // return vars.register.id_andamento === 10 ? apfdRequiredFields.toFinalize : apfdRequiredFields.toEdit
      return apfdRequiredFields.toEdit
    }

    async function update () {
      if (validate(refs, getRequiredFields())) {
        const validateSubforms = subforms()

        if (validateSubforms && vars.register.id) {
          vars.register.completo = true
          const { ok } = await api.put(`${apfdRoute}/${vars.register.id}`, vars.register)
          if (ok) return root.$router.push(`/${apfdRoute}`)
        }
      }
    }

    async function changeAndamento (sobrestamento: { termino_data: string }) {
      if (!vars.register.id) return
      const { id } = vars.register
      if (!sobrestamento.termino_data) {
        vars.register.id_andamento = getSobrestamento('apfd')
        const { ok } = await api.put(`${apfdRoute}/${id}`, vars.register, { silent: true })
        if (ok) return
      }
      vars.register.id_andamento = getAndamento('apfd')
      await api.put(`${apfdRoute}/${id}`, vars.register, { silent: true })
    }

    async function validateNavigation (tab: string) {
      if (validate(refs, getRequiredFields())) {
        const { ok } = await api.put(`${apfdRoute}/${String(vars.register.id)}`, vars.register, { silent: true })
        if (ok) vars.tab = tab
      } else {
        vars.tab = 'main'
      }
    }

    async function loadData () {
      const { id } = root.$route.params
      if (id) {
        const { data, ok } = await api.get(`${apfdRoute}/${id}`)
        if (ok) vars.register = data as Apfd
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
      denseVal: computed(() => getDense(root)),
      update,
      changeAndamento,
      validateNavigation
    }
  }
})
</script>
