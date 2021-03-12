<template>
  <page :breadcrumbs="[
    { label: 'Lista', link: '/proc_outros' },
    { label: 'Criar', link: '/proc_outros/inserir' },
    ]">
    <q-stepper v-model="step" ref="stepper" color="primary" animated>

      <q-step :name="1" title="Dados principais" icon="settings" :done="step > 1">
        <form class="row">
          <div-form>
            <InputText label="Andamento" value="Abertura" disable/>
          </div-form>
          <div-form>
            <InputText label="N° PID" v-model="register.num_pid" ref="num_pid" required/>
          </div-form>
          <div-form>
            <InputDate v-model="register.data" label="Data da fato" />
          </div-form>
          <div-form>
            <InputDate v-model="register.abertura_data" label="Data de recebimento" />
          </div-form>
          <div-form>
            <InputDate v-model="register.limite_data" label="Data limite" />
          </div-form>
          <div-form>
            <OPM v-model="register.cdopm_apuracao" ref="cdopm_apuracao" required/>
          </div-form>
          <div-form>
            <InputSelect label="Doc. Origem" v-model="register.doc_origem" :options="docOrigemProcOutros" />
          </div-form>
          <div-form >
            <InputText label="Nº Documento, ou descrição outros documentos" v-model="register.num_doc_origem" ref="motivo_outros" required/>
          </div-form>
          <div-form>
            <InputSelect label="Doc. Origem" v-model="register.motivo_abertura" :options="motivoAberturaProcOutros" />
          </div-form>
          <div-form>
            <InputAno label="BOU Ano" v-model="register.bou_ano"/>
          </div-form>
          <div-form>
            <InputNumber label="BOU Número" v-model="register.bou_numero"/>
          </div-form>
          <div-form full>
            <InputText label="Sintese do fato" v-model="register.sintese_txt" ref="sintese_txt" :minLength="200" autogrow required :lorem="200"/>
          </div-form>
        </form>
      </q-step>

      <q-step :name="2" title="Envolvidos" icon="create_new_folder" :done="step > 2">
        <template v-if="register.id">
          <!-- <ProcedResultante type="proc_outros" :data="{ id_proc_outros: register.id }"/> -->
          <!-- <Viaturas :data="{ proc: 'proc_outros', id_proc: register.id }"/> -->
          <Acusado label="Envolvido" :data="{ situacao: 'Envolvido', id_proc_outros: register.id }"/>
          <Vitima :data="{ id_proc_outros: register.id }"/>
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

import { ProcOutros } from 'src/types'
import { addPendence, api, errorNotify, getPendenceById, getUserCdopm, incompleteProc, removePendence, validate } from 'src/services'
import InputAno from 'src/components/form/InputAno.vue'
import { docOrigemProcOutros, motivoAberturaProcOutros } from 'src/config'
import { procoutroRequiredFields } from 'src/rules'
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
    InputSelect,
    InputNumber,
    InputSN,
    OPM,
    Portaria,
    InputAno,
    DivForm
  },
  setup (_, { refs, root }) {
    const vars = reactive({
      step: 1,
      incompleto: '',
      loading: false,
      register: {
        id: 0,
        sjd_ref: 0,
        sjd_ref_ano: 0,
        rg_cadastro: '',
        cdopm: '',
        opm_abreviatura: '',
        cdopm_apuracao: '',
        abertura_data: new Date(),
        data: new Date(),
        bou_ano: '',
        bou_numero: '',
        id_municipio: 0,
        doc_origem: '',
        num_doc_origem: '',
        motivo_abertura: '',
        sintese_txt: '', // text
        relatorio1: '',
        relatorio1_file: '',
        relatorio1_data: new Date(),
        relatorio2: '',
        relatorio2_file: '',
        relatorio2_data: new Date(),
        relatorio3: '',
        relatorio3_file: '',
        relatorio3_data: new Date(),
        desc_outros: '',
        andamento: 'Abertura',
        andamentocoger: '',
        vtr1_placa: '',
        vtr1_prefixo: '',
        vtr2_placa: '',
        vtr2_prefixo: '',
        digitador: '',
        num_pid: '',
        limite_data: new Date(),
        deletedAt: undefined
      } as ProcOutros,
      cdopm: getUserCdopm(),
      docOrigemProcOutros,
      motivoAberturaProcOutros
    })

    async function create () {
      if (validate(refs, procoutroRequiredFields.toCreate)) {
        const { ok, data } = await api.post('procoutros', vars.register, { silent: true, debug: true })
        if (ok) {
          const procOutros = data as ProcOutros
          vars.register.id = Number(procOutros.id)
          await handlePendence()
          return next()
        }
      }
    }

    async function update (id: number) {
      if (validate(refs, procoutroRequiredFields.toCreate)) {
        const { ok } = await api.put(`procoutros/${id}`, vars.register, { silent: true, debug: true })

        if (ok) {
          refs.stepper.next()
        }
      }
    }

    async function finalize () {
      if (validate(refs, procoutroRequiredFields.toCreate)) {
        // const validateSubforms = await subforms()

        if (vars.register.id) {
          vars.register.completo = true
          await api.put(`procoutros/${vars.register.id}`, vars.register)
          await removePendence(vars.incompleto)
          return root.$router.push('/proc_outros')
        }
      }
    }

    async function handlePendence () {
      const { _id } = await addPendence({
        register: vars.register as never,
        proc: 'proc_outros',
        pendencias: ['incompleto'],
        state: [vars.register]
      })
      incompleteProc(root, String(_id))
    }

    // async function subforms () {
    //   const Envolvido = await refs.Envolvido.getState()
    //   if (Envolvido === 'toInsert') {
    //     errorNotify('Insira o Envolvido')
    //     return false
    //   }
    //   return true
    // }

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
