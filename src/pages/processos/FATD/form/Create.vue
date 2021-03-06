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
        </form>
      </q-step>

      <q-step :name="2" title="Envolvidos" icon="create_new_folder" :done="step > 2">
        <template v-if="register.id">
          <ProcedOrigem type="fatd" :data="{ id_fatd: register.id }"/>
          <Membro label="Encarregado" ref="Encarregado" required :data="{ situacao: 'Encarregado', id_fatd: register.id }"/>
          <Membro label="Acusador" ref="Acusador" required :data="{ situacao: 'Acusador', id_fatd: register.id }"/>
          <Membro label="Defensor" ref="Defensor" :data="{ situacao: 'Defensor', id_fatd: register.id }"/>
          <Acusado label="Sindicado" :data="{ situacao: 'sindicado', id_fatd: register.id }"/>
          <Vitima :data="{ id_fatd: register.id }"/>
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

import { motivoFATD, situacaoFATD } from 'src/config'
import { Fatd } from 'src/types'
import { addPendence, api, errorNotify, getPendenceById, getUserCdopm, incompleteProc, removePendence, validate } from 'src/services'
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
        id_andamento: 0,
        id_andamentocoger: 0,
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

    async function create () {
      if (validate(refs, fatdRequiredFields.toCreate)) {
        const { ok, data } = await api.post(fatdRoute, vars.register, { silent: true, debug: true })
        if (ok) {
          const fatd = data as Fatd
          vars.register.id = Number(fatd.id)
          await handlePendence()
          return next()
        }
      }
    }

    async function update (id: number) {
      if (validate(refs, fatdRequiredFields.toCreate)) {
        const { ok } = await api.put(`${fatdRoute}/${id}`, vars.register, { silent: true, debug: true })

        if (ok) {
          refs.stepper.next()
        }
      }
    }

    async function finalize () {
      if (validate(refs, fatdRequiredFields.toCreate)) {
        const validateSubforms = await subforms()

        if (validateSubforms && vars.register.id) {
          vars.register.completo = true
          await api.put(`${fatdRoute}/${vars.register.id}`, vars.register)
          const removedPendence = await removePendence(vars.incompleto)
          if (removedPendence) return root.$router.push(`/${fatdRoute}`)
          else errorNotify('Erro ao finalizar!')
        }
      }
    }

    async function handlePendence () {
      const { _id } = await addPendence({
        register: vars.register as never,
        proc: 'fatd',
        pendencias: ['incompleto'],
        state: [vars.register]
      })
      incompleteProc(root, String(_id))
      vars.incompleto = String(_id)
    }

    async function subforms () {
      const Encarregado = await refs.Encarregado.getState()
      if (Encarregado === 'toInsert') {
        errorNotify('Insira o Encarregado')
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
