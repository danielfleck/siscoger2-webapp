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
            <OPM v-model="register.cdopm" ref="opm" required/>
          </div-form>
          <div-form>
            <InputDate v-model="register.fato_data" label="Data da fato" />
          </div-form>
          <div-form>
            <InputDate v-model="register.abertura_data" label="Data da portaria de delegação de poderes" />
          </div-form>
          <div-form>
            <InputDate v-model="register.autuacao_data" label="Data da portaria de instauração" />
          </div-form>
          <div-form v-if="register.cdopm">
            <Portaria label="N° Portaria" v-model="register.portaria_numero" ref="portaria_numero" required proc="ipm" :cdopm="register.cdopm"/>
          </div-form>
          <div-form>
            <InputSelect label="Motivo da abertura (crime)" v-model="register.crime" :options="crime" />
          </div-form>
          <div-form>
            <InputSelect label="Tipo (crime)" v-model="register.tentado" :options="tentado" />
          </div-form>
          <div-form v-if="register.crime === 'Outros'">
            <InputText label="Documento de origem" v-model="register.crime_especificar" ref="crime_especificar" required/>
          </div-form>
          <div-form>
            <InputSelect label="Situação" v-model="register.id_situacao" :options="situacaoServicoOuFora" />
          </div-form>
          <div-form>
            <City v-model="register.id_municipio"/>
          </div-form>
          <div-form>
            <InputText label="N° Boletim" mask="#######" v-model="register.bou_numero" />
          </div-form>
          <div-form>
            <InputAno label="Bou Ano" v-model="register.bou_ano" ref="bou_ano" required/>
          </div-form>
          <div-form>
            <InputText label="N° Eproc" mask="#######" v-model="register.n_eproc" />
          </div-form>
          <div-form>
            <InputAno label="Eproc Ano" v-model="register.ano_eproc" ref="bou_ano" required/>
          </div-form>
          <div-form>
            <InputText label="Conclusão do encarregado" v-model="register.relato_enc" />
          </div-form>
          <div-form>
            <InputText label="Solução do Cmt OPM" v-model="register.relato_cmtopm" />
          </div-form>
          <div-form>
            <InputText label="Decisão do Cmt Geral" v-model="register.relato_cmtgeral" />
          </div-form>
          <div-form full>
            <InputText label="Sintese do fato" v-model="register.sintese_txt" ref="sintese_txt" :minLength="200" autogrow required :lorem="200"/>
          </div-form>
        </form>
      </q-step>

      <q-step :name="2" title="Envolvidos" icon="create_new_folder" :done="step > 2">
        <template v-if="register.id">
          <ProcedOrigem type="ipm" :data="{ id_ipm: register.id }"/>
          <Membro label="Encarregado" ref="Encarregado" required :data="{ situacao: 'encarregado', id_ipm: register.id }"/>
          <Membro label="Escrivão" ref="escrivao" :data="{ situacao: 'escrivao', id_ipm: register.id }"/>
          <Acusado label="Indiciados" :data="{ situacao: 'indiciado', id_ipm: register.id }"/>
          <Vitima :data="{ id_ipm: register.id }"/>
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

import { andamentoCogerIPM, andamentoIPM } from 'src/config'
import { Ipm } from 'src/types'
import { addPendence, api, errorNotify, getPendenceById, getUserCdopm, incompleteProc, removePendence, validate } from 'src/services'
import DivForm from 'src/components/form/DivForm.vue'
import { ipmRequiredFields } from 'src/rules'
import City from 'src/components/form/City.vue'
import InputAno from 'src/components/form/InputAno.vue'
import { ipmRoute } from 'src/routenames'

const breadcrumbs = [
  { label: 'Lista', link: `/${ipmRoute}` },
  { label: 'Criar', link: `/${ipmRoute}/inserir` }
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
    DivForm,
    City,
    InputAno
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
        id_municipio: 0,
        id_situacao: 0,
        cdopm: '',
        opm_sigla: '',
        opm_ref: 0,
        opm_ref_ano: 0,
        sjd_ref: 0,
        sjd_ref_ano: 0,
        abertura_data: new Date(),
        fato_data: new Date(),
        autuacao_data: new Date(),
        crime: '',
        tentado: '',
        crime_especificar: '',
        sintese_txt: '', // text
        relato_enc: '',
        relato_enc_data: new Date(),
        relato_cmtopm: '',
        relato_cmtopm_data: new Date(),
        relato_cmtgeral: '',
        relato_cmtgeral_data: new Date(),
        vajme_ref: '',
        justicacomum_ref: '',
        vitima: '',
        confronto_armado_bl: '',
        vitima_qtdd: 0,
        julgamento: '',
        portaria_numero: '',
        exclusao_txt: '', // text
        relato_enc_file: '',
        relato_cmtopm_file: '',
        relato_cmtgeral_file: '',
        defensor_oab: '',
        defensor_nome: '',
        relcomplementar_file: '',
        relcomplementar_data: new Date(),
        opm_meta4: '',
        bou_ano: 0,
        bou_numero: 0,
        prioridade: false,
        deletedAt: undefined
      } as Ipm,
      cdopm: getUserCdopm(),
      breadcrumbs,
      andamentoCogerIPM,
      andamentoIPM
    })

    async function create () {
      if (validate(refs, ipmRequiredFields.toCreate)) {
        const { ok, data } = await api.post(ipmRoute, vars.register, { silent: true, debug: true })
        if (ok) {
          const ipm = data as Ipm
          vars.register.id = Number(ipm.id)
          await handlePendence()
          return next()
        }
      }
    }

    async function update (id: number) {
      if (validate(refs, ipmRequiredFields.toCreate)) {
        const { ok } = await api.put(`${ipmRoute}/${id}`, vars.register, { silent: true, debug: true })

        if (ok) {
          refs.stepper.next()
        }
      }
    }

    async function finalize () {
      if (validate(refs, ipmRequiredFields.toCreate)) {
        const validateSubforms = await subforms()

        if (validateSubforms && vars.register.id) {
          vars.register.completo = true
          await api.put(`${ipmRoute}/${vars.register.id}`, vars.register)
          const removedPendence = await removePendence(vars.incompleto)
          if (removedPendence) return root.$router.push(`/${ipmRoute}`)
          else errorNotify('Erro ao finalizar!')
        }
      }
    }

    async function handlePendence () {
      const { _id } = await addPendence({
        register: vars.register as never,
        proc: 'ipm',
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
