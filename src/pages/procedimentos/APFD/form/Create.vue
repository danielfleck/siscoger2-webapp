<template>
  <page :breadcrumbs="breadcrumbs">
    <q-stepper v-model="step" ref="stepper" color="primary" animated>

      <q-step :name="1" title="Dados principais" icon="settings" :done="step > 1">
        <form class="row">
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
            <InputDate v-model="register.fato_data" label="Data da fato" />
          </div-form>
           <div-form>
            <InputSelect tooltip="Do mais grave ao menos grave" label="Tipos penais" v-model="register.tipo_penal_novo" :options="crime" />
          </div-form>
          <div-form v-if="register.tipo_penal_novo === 'Outros'" >
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
        </form>
      </q-step>

      <q-step :name="2" title="Envolvidos" icon="create_new_folder" :done="step > 2">
        <template v-if="register.id">
          <Membro label="Presidente" ref="Presidente" required :data="{ situacao: 'Presidente', id_apfd: register.id }"/>
          <Membro label="Condutor" ref="Condutor" required :data="{ situacao: 'Condutor', id_apfd: register.id }"/>
          <Membro label="Escrivão" ref="Escrivão" :data="{ situacao: 'Escrivão', id_apfd: register.id }"/>
          <Acusado label="Acusado" :data="{ situacao: 'Acusado', id_apfd: register.id }"/>
          <Vitima :data="{ id_apfd: register.id }"/>
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

import { andamentoCogerAPFD, crime, tipoApfd } from 'src/config'
import { Apfd } from 'src/types'
import { addPendence, api, errorNotify, getPendenceById, getUserCdopm, incompleteProc, removePendence, validate } from 'src/services'
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

    async function create () {
      if (validate(refs, apfdRequiredFields.toCreate)) {
        const { ok, data } = await api.post(apfdRoute, vars.register, { silent: true, debug: true })
        if (ok) {
          const apfd = data as Apfd
          vars.register.id = Number(apfd.id)
          await handlePendence()
          return next()
        }
      }
    }

    async function update (id: number) {
      if (validate(refs, apfdRequiredFields.toCreate)) {
        const { ok } = await api.put(`${apfdRoute}/${id}`, vars.register, { silent: true, debug: true })

        if (ok) {
          refs.stepper.next()
        }
      }
    }

    async function finalize () {
      if (validate(refs, apfdRequiredFields.toCreate)) {
        const validateSubforms = await subforms()

        if (validateSubforms && vars.register.id) {
          vars.register.completo = true
          await api.put(`${apfdRoute}/${vars.register.id}`, vars.register)
          await removePendence(vars.incompleto)
          return root.$router.push(`/${apfdRoute}`)
        }
      }
    }

    async function handlePendence () {
      const { _id } = await addPendence({
        register: vars.register as never,
        proc: 'apfd',
        pendencias: ['incompleto'],
        state: [vars.register]
      })
      incompleteProc(root, String(_id))
    }

    async function subforms () {
      const Presidente = await refs.Presidente.getState()
      if (Presidente === 'toInsert') {
        errorNotify('Insira o Presidente')
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
