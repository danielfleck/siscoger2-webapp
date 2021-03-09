<template>
  <page :breadcrumbs="[
    { label: 'Lista', link: '/cd/lista' },
    { label: 'Criar', link: '/cd/inserir' },
    ]">
    <q-stepper v-model="step" ref="stepper" color="primary" animated>

      <q-step :name="1" title="Dados principais" icon="settings" :done="step > 1">
        <form class="row">
          <div class="q-pa-md col-12">
            <Prioridade v-model="register.prioridade"/>
          </div>
          <div class="q-pa-md col-4">
            <InputText label="Andamento" value="Andamento" disable/>
          </div>
          <div class="q-pa-md col-6">
            <InputSelect tooltip="Lei nº 16.544/2010" label="Motivo abertura" v-model="register.id_motivoconselho" :options="motivoAberturaCd" />
          </div>
          <div class="q-pa-md col-6">
            <InputSelect label="Situação" v-model="register.id_situacaoconselho" :options="situacaoServicoOuFora" />
          </div>
          <div class="q-pa-md col-6">
            <InputSelect label="Em decorrência de" v-model="register.id_decorrenciaconselho" :options="decorrenciaConselho" />
          </div>
          <div class="q-pa-md col-4" v-if="register.id_decorrenciaconselho === 13">
            <InputText label="Especificar (no caso de outros motivos)" v-model="register.outromotivo" ref="outromotivo" required/>
          </div>
          <div class="q-pa-md col-4">
            <Portaria label="N° Portaria" v-model="register.portaria_numero" ref="portaria_numero" required proc="cd" :cdopm="register.cdopm"/>
          </div>
          <div class="q-pa-md col-4">
            <InputDate v-model="register.portaria_data" label="Data da Portaria" ref="portaria_data" required/>
          </div>
          <div class="q-pa-md col-4">
            <TipoBoletim v-model="register.doc_tipo"/>
          </div>
          <div class="q-pa-md col-4">
            <InputText label="N° Boletim" mask="#######/####" reverse v-model="register.doc_numero" />
          </div>
          <div class="q-pa-md col-4">
            <InputDate v-model="register.fato_data" label="Data da fato" />
          </div>
          <div class="q-pa-md col-4">
            <InputDate v-model="register.abertura_data" label="Data da abertura" />
          </div>
          <div class="q-pa-md col-4">
            <InputDate v-model="register.prescricao_data" label="Data da prescrição" />
          </div>
          <div class="q-pa-md col-12">
            <InputText label="Sintese do fato" v-model="register.sintese_txt" ref="sintese_txt" :minLength="200" autogrow required :lorem="200"/>
          </div>
        </form>
      </q-step>

      <q-step :name="2" title="Envolvidos" icon="create_new_folder" :done="step > 2">
        <template v-if="register.id">
          <ProcedOrigem type="cd" :data="{ id_cd: register.id }"/>
          <Membro label="Sindicante" ref="sindicante" required :data="{ situacao: 'sindicante', id_cd: register.id }"/>
          <Membro label="Escrivão" ref="escrivao" :data="{ situacao: 'escrivao', id_cd: register.id }"/>
          <Acusado label="Sindicado" :data="{ situacao: 'sindicado', id_cd: register.id }"/>
          <Vitima :data="{ id_cd: register.id }"/>
        </template>
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <template v-if="step === 1">
            <q-btn v-if="step === 1" @click="register.id ? update(register.id) : create()" color="positive" label="Continuar" :loading="loading" class="full-width" icon="fa fa-arrow-right"/>
          </template>
          <template v-else>
            <q-btn flat color="white" @click="previous" label="Voltar" class="full-width bg-positive" icon="fa fa-arrow-left"/>
            <q-btn @click="finalize" color="primary" label="Finalizar" class="full-width"/>
          </template>
        </q-stepper-navigation>
      </template>
    </q-stepper>

  </page>
</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { defineComponent, reactive, toRefs } from '@vue/composition-api'

import Page from 'components/pages/Page.vue'
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
import InputSelect from 'components/form/InputSelect.vue'
import InputNumber from 'components/form/InputNumber.vue'
import InputSN from 'components/form/InputSN.vue'
import OPM from 'components/form/OPM.vue'
import Portaria from 'components/form/Portaria.vue'

import { Cd } from 'src/types'
import { motivoAberturaCd, situacaoServicoOuFora, decorrenciaConselho } from 'src/config'
import { addPendence, api, errorNotify, getPendenceById, getUserCdopm, incompleteProc, removePendence, validate } from 'src/services'

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
    InputSelect,
    InputNumber,
    InputSN,
    OPM,
    Portaria
  },
  setup (_, { refs, root }) {
    const vars = reactive({
      step: 1,
      incompleto: '',
      loading: false,
      register: {
        id: 0,
        id_andamentocoger: 0,
        id_andamento: 0,
        id_motivoconselho: 0,
        id_decorrenciaconselho: 0,
        id_situacaoconselho: 0,
        sjd_ref: 0,
        sjd_ref_ano: 0,
        motivo_outros: '',
        fato_data: new Date(),
        abertura_data: new Date(),
        sintese_text: '',
        libelo_file: '',
        doc_tipo: '',
        doc_numero: '',
        portaria_numero: '',
        portaria_data: new Date(),
        parecer_file: '',
        decisao_file: '',
        doc_prorrogacao: '',
        prescricao_comissao: '',
        parecer_cmtgeral: '',
        exclusao_text: '',
        rec_ato_file: '',
        rec_gov_file: '',
        cdopm: '',
        ac_desempenho_bl: '',
        ac_conduta_bl: '',
        ac_honra_bl: '',
        tjpr_file: '',
        sjd_file: '',
        deletedAt: undefined
      } as Cd,
      cdopm: getUserCdopm(),
      motivoAberturaCd,
      decorrenciaConselho,
      situacaoServicoOuFora
    })

    async function create () {
      if (validate(refs, fields)) {
        const { ok, data } = await api.post('cd', vars.register, { silent: true, debug: true })
        if (ok) {
          const cd = data as cd
          vars.register.id = Number(cd.id)
          await handlePendence()
          return next()
        }
      }
    }

    async function update (id: number) {
      if (validate(refs, fields)) {
        const { ok } = await api.put(`cd/${id}`, vars.register, { silent: true, debug: true })

        if (ok) {
          refs.stepper.next()
        }
      }
    }

    async function finalize () {
      if (validate(refs, fields)) {
        const validateSubforms = await subforms()

        if (validateSubforms && vars.register.id) {
          vars.register.completo = true
          await api.put(`cd/${vars.register.id}`, vars.register)
          await removePendence(vars.incompleto)
          return root.$router.push('/cd/lista')
        }
      }
    }

    async function handlePendence () {
      const { _id } = await addPendence({
        register: vars.register as never,
        proc: 'cd',
        pendencias: ['incompleto'],
        state: [vars.register]
      })
      incompleteProc(root, '',(_id))
    }

    async function subforms () {
      const sindicante = await refs.sindicante.getState()
      if (sindicante === 'toInsert') {
        errorNotify('Insira o sindicante')
        return false
      }
      return true
    }

    const next = () => refs.stepper.next()
    const previous = () => refs.stepper.previous()

    async function getPendence () {
      vars.incompleto = '',(root.$route.query.incompleto)
      const state = await getPendenceById(vars.incompleto)
      if (state?.length) vars.register = state[0]
      next()
    }

    if (root.$route.query.incompleto) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      getPendence()
    }

    console.log(root.$route.fullPath)

    return {
      ...toRefs(vars),
      create,
      update,
      finalize,
      previous
    }
  }
})
</script>
