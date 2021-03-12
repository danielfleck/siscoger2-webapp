<template>
  <page :breadcrumbs="[
  { label: 'Lista', link: '/iso' },
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
        <div-form full>
          <BannerDeleted v-if="register.deletedAt" :id="register.id" proc="iso"/>
        </div-form>
        <div-form full>
          <Prioridade v-model="register.prioridade"/>
        </div-form>
        <div-form>
          <Andamento v-model="register.id_andamento" type="iso"/>
        </div-form>
        <div-form>
          <AndamentoCoger label="Tramite administrativo" v-model="register.id_andamentocoger" type="iso"/>
        </div-form>
        <div-form>
          <InputDate v-model="register.fato_data" label="Data da fato" />
        </div-form>
        <div-form>
          <InputDate v-model="register.abertura_data" label="Data da abertura" />
        </div-form>
        <div-form>
          <InputText label="Tipo penal" v-model="register.tipo_penal" ref="tipo_penal" required/>
        </div-form>
        <div-form>
          <TipoBoletim v-model="register.doc_tipo"/>
        </div-form>
        <div-form>
          <InputText label="N° Boletim" mask="#######/####" reverse v-model="register.doc_numero" />
        </div-form>
        <div-form>
          <Portaria label="N° Portaria" v-model="register.portaria_numero" ref="portaria_numero" required proc="iso" :cdopm="register.cdopm"/>
        </div-form>
        <div-form>
          <InputDate v-model="register.portaria_data" label="Data da Portaria" ref="portaria_data" required/>
        </div-form>
        <div-form full>
          <InputText label="Sintese do fato" v-model="register.sintese_txt" ref="sintese_txt" :minLength="200" autogrow required :lorem="200"/>
        </div-form>
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
import { isoRequiredFields } from 'src/rules'
import DivForm from 'src/components/form/DivForm.vue'

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
        cdopm: '',
        fato_data: new Date(),
        abertura_data: new Date(),
        sintese_txt: '',
        tipo_penal: '',
        doc_tipo: '',
        doc_numero: '',
        portaria_numero: '',
        portaria_data: new Date(),
        exclusao_txt: '',
        opm_meta4: '',
        relatoriomedico_file: '',
        relatoriomedico_data: new Date(),
        solucaoautoridade_file: '',
        solucaoautoridade_data: new Date(),
        prioridade: false,
        completo: false
      } as Iso
    })

    function getRequiredFields () {
      return vars.register.id_andamento === 19 ? isoRequiredFields.toFinalize : isoRequiredFields.toEdit
    }

    async function update () {
      if (validate(refs, getRequiredFields())) {
        const validateSubforms = subforms()

        if (validateSubforms && vars.register.id) {
          vars.register.completo = true
          const { ok } = await api.put(`isos/${vars.register.id}`, vars.register)
          if (ok) return root.$router.push('/iso')
        }
      }
    }

    async function changeAndamento (sobrestamento: { termino_data: string }) {
      if (!vars.register.id) return
      const { id } = vars.register
      if (!sobrestamento.termino_data) {
        vars.register.id_andamento = getSobrestamento('iso')
        const { ok } = await api.put(`isos/${id}`, vars.register, { silent: true })
        if (ok) return
      }
      vars.register.id_andamento = getAndamento('iso')
      await api.put(`iso/${id}`, vars.register, { silent: true })
    }

    async function validateNavigation (tab: string) {
      if (validate(refs, getRequiredFields())) {
        const { ok } = await api.put(`isos/${String(vars.register.id)}`, vars.register, { silent: true })
        if (ok) vars.tab = tab
      } else {
        vars.tab = 'main'
      }
    }

    async function loadData () {
      const { id } = root.$route.params
      if (id) {
        const { data, ok } = await api.get(`isos/${id}`)
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
