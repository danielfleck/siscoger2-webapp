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
        </form>
      </q-step>

      <q-step :name="2" title="Envolvidos" icon="create_new_folder" :done="step > 2">
        <template v-if="register.id">
          <Acusado label="Desertor" :data="{ situacao: 'Desertor', id_desercao: register.id }" ref="Desertor" required/>
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

import { andamentoCogerDesercao, termoExclusaoAgregacao, termoApresentacaoCaptura, desercaoPericia, termoInclusaoReversao } from 'src/config'
import { Desercao } from 'src/types'
import { addPendence, api, errorNotify, getPendenceById, getUserCdopm, incompleteProc, removePendence, validate } from 'src/services'
import { desercaoRequiredFields } from 'src/rules'
import { desercaoRoute } from 'src/routenames'

const breadcrumbs = [
  { label: 'Lista', link: `/${desercaoRoute}` },
  { label: 'Criar', link: `/${desercaoRoute}/inserir` }
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
        prioridade: false,
        deletedAt: undefined
      } as Desercao,
      breadcrumbs,
      cdopm: getUserCdopm(),
      andamentoCogerDesercao,
      termoExclusaoAgregacao,
      termoApresentacaoCaptura,
      desercaoPericia,
      termoInclusaoReversao
    })

    async function create () {
      if (validate(refs, desercaoRequiredFields.toCreate)) {
        const { ok, data } = await api.post(desercaoRoute, vars.register, { silent: true, debug: true })
        if (ok) {
          const desercao = data as Desercao
          vars.register.id = Number(desercao.id)
          await handlePendence()
          return next()
        }
      }
    }

    async function update (id: number) {
      if (validate(refs, desercaoRequiredFields.toCreate)) {
        const { ok } = await api.put(`${desercaoRoute}/${id}`, vars.register, { silent: true, debug: true })

        if (ok) {
          refs.stepper.next()
        }
      }
    }

    async function finalize () {
      if (validate(refs, desercaoRequiredFields.toCreate)) {
        const validateSubforms = await subforms()

        if (validateSubforms && vars.register.id) {
          vars.register.completo = true
          await api.put(`${desercaoRoute}/${vars.register.id}`, vars.register)
          const removedPendence = await removePendence(vars.incompleto)
          if (removedPendence) return root.$router.push(`/${desercaoRoute}`)
          else errorNotify('Erro ao finalizar!')
        }
      }
    }

    async function handlePendence () {
      const { _id } = await addPendence({
        register: vars.register as never,
        proc: 'desercao',
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
