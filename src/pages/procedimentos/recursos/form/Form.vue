<template>
  <page :breadcrumbs="[
  { label: 'Lista', link: '/recursos' },
  { label: 'Editar', link: '/recursos/editar' },
  ]">
    <div-form full>
      <BannerDeleted v-if="register.deletedAt" :id="register.id" proc="recursos"/>
    </div-form>
    <div-form>
      <ProcedTipos v-model="register.procedimento" label="Processo/Procedimento" ref="origem_proc" required/>
    </div-form>
    <div-form>
      <InputText label="Referência" v-model="register.sjd_ref" ref="origem_sjd_ref" mask="######" required/>
    </div-form>
    <div-form>
      <InputAno v-model="register.sjd_ref_ano" ref="origem_sjd_ref_ano" required/>
    </div-form>
    <div-form>
      <InputText label="Data e hora do recebimento (automático)" v-model="register.datahora" disable/>
    </div-form>
    <div-form full>
      <q-btn-group spread>
        <BtnStack v-if="register.id" label="Atualizar" icon="fa fa-pen" @click="save"/>
        <BtnStack v-else label="Inserir" icon="fa fa-plus" @click="create"/>
      </q-btn-group>
    </div-form>
    <q-btn @click="save" color="primary" label="Salvar" class="full-width"/>
  </page>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable camelcase */
import { defineComponent, toRefs, reactive } from '@vue/composition-api'

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
import DivForm from 'src/components/form/DivForm.vue'

import { Recurso } from 'src/types'
import { api, getUserCdopm, validate } from 'src/services'
import { recursoRequiredFields } from 'src/rules'

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
        cdopm: getUserCdopm(),
        opm: '',
        rg: '',
        nome: '',
        procedimento: '',
        sjd_ref: 0,
        sjd_ref_ano: 0,
        datahora: new Date(), // datetime
        id_movimento: 0,
        deletedAt: undefined
      } as Recurso
    })

    async function save () {
      if (validate(refs, recursoRequiredFields.toCreate)) {
        if (vars.register.id) {
          const { ok } = await api.put(`recursos/${vars.register.id}`, vars.register)
          if (ok) return root.$router.push('/recursos')
        } else {
          const { ok } = await api.post('recursos', vars.register)
          if (ok) return root.$router.push('/recursos')
        }
      }
    }

    async function loadData () {
      const { id } = root.$route.params
      if (id) {
        const { data, ok } = await api.get(`recursos/${id}`)
        if (ok) vars.register = data as Recurso
      }
    }
    // eslint-disable-next-line no-void
    void loadData()

    return {
      ...toRefs(vars),
      save
    }
  }
})
</script>
