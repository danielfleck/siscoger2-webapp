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
            <InputSelect tooltip="Lei nº 16.544/2010" label="Motivo abertura" v-model="register.id_motivoconselho" :options="motivoConselho" />
          </div-form>
          <div-form>
            <InputSelect label="Situação" v-model="register.id_situacaoconselho" :options="situacaoServicoOuFora" />
          </div-form>
          <div-form>
            <InputSelect label="Em decorrência de" v-model="register.id_decorrenciaconselho" :options="decorrenciaConselho" />
          </div-form>
          <div-form v-if="register.id_decorrenciaconselho === 13">
            <InputText label="Especificar (no caso de outros motivos)" v-model="register.outromotivo" ref="outromotivo" required/>
          </div-form>
          <div-form>
            <Portaria label="N° Portaria" v-model="register.portaria_numero" ref="portaria_numero" required proc="adl" :cdopm="register.cdopm"/>
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
        </form>
      </q-step>

      <q-step :name="2" title="Envolvidos" icon="create_new_folder" :done="step > 2">
        <template v-if="register.id">
          <ProcedOrigem type="cd" :data="{ id_cd: register.id }"/>
          <Membro label="Presidente" ref="Presidente" required :data="{ situacao: 'Presidente', id_cd: register.id }"/>
          <Membro label="Membro" ref="Membro" required :data="{ situacao: 'Membro', id_cd: register.id }"/>
          <Membro label="Escrivão" ref="Escrivão" required :data="{ situacao: 'Escrivão', id_cd: register.id }"/>
          <Membro label="Defensor" ref="Defensor" :data="{ situacao: 'Defensor', id_cd: register.id }"/>
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
import DivForm from 'src/components/form/DivForm.vue'
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
import { motivoConselho, situacaoServicoOuFora, decorrenciaConselho } from 'src/config'
import { addPendence, api, errorNotify, getPendenceById, getUserCdopm, incompleteProc, removePendence, validate } from 'src/services'
import { cdRequiredFields } from 'src/rules'
import { cdRoute } from 'src/routenames'

const breadcrumbs = [
  { label: 'Lista', link: `/${cdRoute}` },
  { label: 'Criar', link: `/${cdRoute}/inserir` }
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
        id_andamento: 0,
        id_motivoconselho: 0,
        id_decorrenciaconselho: 0,
        id_situacaoconselho: 0,
        motivo_outros: '',
        sintese_text: '',
        libelo_file: '',
        doc_tipo: '',
        doc_numero: '',
        portaria_numero: '',
        parecer_file: '',
        decisao_file: '',
        doc_prorrogacao: '',
        prescricao_comissao: '',
        parecer_cmtgeral: '',
        exclusao_text: '',
        rec_ato_file: '',
        rec_gov_file: '',
        cdopm: getUserCdopm(),
        ac_desempenho_bl: '',
        ac_conduta_bl: '',
        ac_honra_bl: '',
        tjpr_file: '',
        sjd_file: '',
        deletedAt: undefined
      } as Cd,
      cdopm: getUserCdopm(),
      breadcrumbs,
      motivoConselho,
      decorrenciaConselho,
      situacaoServicoOuFora
    })

    async function create () {
      if (validate(refs, cdRequiredFields.toCreate)) {
        const { ok, data } = await api.post(cdRoute, vars.register, { silent: true, debug: true })
        if (ok) {
          const cd = data as Cd
          vars.register.id = Number(cd.id)
          await handlePendence()
          return next()
        }
      }
    }

    async function update (id: number) {
      if (validate(refs, cdRequiredFields.toCreate)) {
        const { ok } = await api.put(`${cdRoute}/${id}`, vars.register, { silent: true, debug: true })

        if (ok) {
          refs.stepper.next()
        }
      }
    }

    async function finalize () {
      if (validate(refs, cdRequiredFields.toCreate)) {
        const validateSubforms = await subforms()

        if (validateSubforms && vars.register.id) {
          vars.register.completo = true
          await api.put(`cd/${vars.register.id}`, vars.register)
          await removePendence(vars.incompleto)
          return root.$router.push(`/${cdRoute}`)
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
