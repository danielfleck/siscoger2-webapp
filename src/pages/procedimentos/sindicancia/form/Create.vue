<template>
  <page :breadcrumbs="breadcrumbs">
    <q-stepper v-model="step" ref="stepper" color="primary" animated>

      <q-step :name="1" title="Dados principais" icon="settings" :done="step > 1">
        <form class="row">
          <div-form full>
            <Prioridade v-model="register.prioridade"/>
          </div-form>
          <div-form>
            <InputText label="Andamento" value="Andamento" disable/>
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
            <Portaria label="N° Portaria" v-model="register.portaria_numero" ref="portaria_numero" required proc="sindicancia" :cdopm="register.cdopm"/>
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
            <InputSelect label="Motivo abertura" v-model="register.motivo_abertura" :options="motivoAberturaSindicancia" />
          </div-form>
          <div-form v-if="register.motivo_abertura === 'Outro'">
            <InputText label="Descreva o motivo" v-model="register.motivo_outros" ref="motivo_outros" required/>
          </div-form>
          <div-form full>
            <InputText label="Sintese do fato" v-model="register.sintese_txt" ref="sintese_txt" :minLength="200" autogrow required :lorem="200"/>
          </div-form>
        </form>
      </q-step>

      <q-step :name="2" title="Envolvidos" icon="create_new_folder" :done="step > 2">
        <template v-if="register.id">
          <ProcedOrigem type="sindicancia" :data="{ id_sindicancia: register.id }"/>
          <Membro label="Sindicante" ref="sindicante" required :data="{ situacao: 'sindicante', id_sindicancia: register.id }"/>
          <Membro label="Escrivão" ref="escrivao" :data="{ situacao: 'escrivao', id_sindicancia: register.id }"/>
          <Acusado label="Sindicado" :data="{ situacao: 'sindicado', id_sindicancia: register.id }"/>
          <Vitima :data="{ id_sindicancia: register.id }"/>
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
import DivForm from 'src/components/form/DivForm.vue'

import { andamentoCogerSindicancia, andamentoSindicancia, motivoAberturaSindicancia, prorogacao, tipoBoletim } from 'src/config/selects'
import { Sindicancia } from 'src/types'
import { addPendence, api, errorNotify, getPendenceById, getUserCdopm, incompleteProc, removePendence, validate } from 'src/services'
import { sindicanciaRequiredFields } from 'src/rules'
import { sindicanciaRoute } from 'src/routenames'

const breadcrumbs = [
  { label: 'Lista', link: `/${sindicanciaRoute}` },
  { label: 'Criar', link: `/${sindicanciaRoute}/inserir` }
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
    Portaria,
    DivForm
  },
  setup (_, { refs, root }) {
    const vars = reactive({
      step: 1,
      incompleto: '',
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
      },
      breadcrumbs,
      cdopm: getUserCdopm(),
      andamentoCogerSindicancia,
      andamentoSindicancia,
      motivoAberturaSindicancia,
      prorogacao,
      tipoBoletim
    })

    async function create () {
      if (validate(refs, sindicanciaRequiredFields.toCreate)) {
        const { ok, data } = await api.post(sindicanciaRoute, vars.register, { silent: true, debug: true })
        if (ok) {
          const sindicancia = data as Sindicancia
          vars.register.id = Number(sindicancia.id)
          await handlePendence()
          return next()
        }
      }
    }

    async function update (id: number) {
      if (validate(refs, sindicanciaRequiredFields.toCreate)) {
        const { ok } = await api.put(`${sindicanciaRoute}/${id}`, vars.register, { silent: true, debug: true })

        if (ok) {
          refs.stepper.next()
        }
      }
    }

    async function finalize () {
      if (validate(refs, sindicanciaRequiredFields.toCreate)) {
        const validateSubforms = await subforms()

        if (validateSubforms && vars.register.id) {
          vars.register.completo = true
          await api.put(`${sindicanciaRoute}/${vars.register.id}`, vars.register)
          const removedPendence = await removePendence(vars.incompleto)
          if (removedPendence) return root.$router.push(`/${sindicanciaRoute}`)
          else errorNotify('Erro ao finalizar!')
        }
      }
    }

    async function handlePendence () {
      const { _id } = await addPendence({
        register: vars.register as never,
        proc: 'sindicancia',
        pendencias: ['incompleto'],
        state: [vars.register]
      })
      incompleteProc(root, String(_id))
      vars.incompleto = String(_id)
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
      vars.incompleto = String(root.$route.query.incompleto)
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
