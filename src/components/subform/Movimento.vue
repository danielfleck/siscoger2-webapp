<template>
  <q-card class="col-12" flat>
    <q-card-section class="row">
      <div class="q-pa-xs col-12">{{ label }}</div>
      <div class="q-pa-xs col-12">
        <InputDate v-model="register.data" label="Data" ref="data" required defaultToday/>
      </div>
      <div class="q-pa-xs col-12">
        <InputText label="Descrição" ref="descricao" v-model="register.descricao" :minLength="50" autogrow required :lorem="100"/>
      </div>
      <div class="q-pa-xs col-12">
        <q-btn
          color="primary"
          @click="register.id ? update(register) : create()"
          :label="register.id ? 'Editar' : 'Inserir'"
          class="full-width"
          :icon="register.id ? 'fa fa-pen' : 'fa fa-plus'"
          />
      </div>
    </q-card-section>
    <q-card-section v-if="registers.length" class="row">
      <q-list bordered separator class="q-pa-xs col-12">
        <q-item clickable v-ripple >
          <q-item-section>Data</q-item-section>
          <q-item-section>Descrição</q-item-section>
          <q-item-section>OPM</q-item-section>
          <q-item-section>RG</q-item-section>
          <q-item-section>Ações</q-item-section>
        </q-item>
        <q-item v-ripple v-for="movimento in registers" :key="movimento.rg">
          <q-item-section>{{movimento.data | dateBr }}</q-item-section>
          <q-item-section>{{movimento.descricao}}</q-item-section>
          <q-item-section>{{movimento.cdopm}}</q-item-section>
          <q-item-section>{{movimento.rg}}</q-item-section>
          <q-item-section>
            <q-btn-group spread>
              <BtnStack label="Editar" icon="fa fa-pen" @click="edit(movimento)"/>
              <BtnStack label="Apagar" icon="fa fa-trash" @click="remove(movimento)"/>
            </q-btn-group>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>

  </q-card>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { defineComponent, reactive, toRefs } from '@vue/composition-api'
import { api, confirmMsg, validate } from 'src/services'

import InputText from 'components/form/InputText.vue'
import InputDate from 'components/form/InputDate.vue'
import BtnStack from 'components/form/BtnStack.vue'
import { changeDate } from 'src/filters'
import { movimentoRoute } from 'src/routenames'

export interface Register{
  id: number
  cdopm: string
  rg: string
  data: string
  descricao: string
}

const cleanRegister = {
  id: 0,
  cdopm: '',
  rg: '',
  data: '',
  descricao: ''
}

const fields = ['data', 'descricao']
const moduleName = movimentoRoute
export default defineComponent({
  name: 'Movimento',
  components: { InputText, InputDate, BtnStack },
  filters: {
    dateBr (date: string) {
      return changeDate(date, 'pt-br', { extensive: true })
    }
  },
  props: {
    label: {
      type: String,
      default: 'Movimentos'
    },
    data: {
      type: Object,
      required: true
    }
  },
  setup (props, { root, refs }) {
    const vars = reactive({
      register: {
        id: 0,
        cdopm: '',
        rg: '',
        data: '',
        descricao: ''
      },
      registers: [] as Array<Register>
    })
    const functions = {
      async loadData (): Promise<void> {
        // resetValidation(refs, fields)
        const { data } = await api.post(`${moduleName}/search`, props.data, { silent: true })
        vars.registers = data as Register[]
      },
      async create (): Promise<void> {
        if (validate(refs, fields)) {
          const data = { ...props.data, ...vars.register }
          const { ok } = await api.post(moduleName, data)
          if (ok) {
            vars.register = cleanRegister
            await this.loadData()
          }
        }
      },
      edit (register: Register) {
        vars.register = register
      },
      async update (register: Register): Promise<void> {
        if (validate(refs, fields)) {
          const data = { ...props.data, ...register }
          const { ok } = await api.put(`${moduleName}/${register?.id}`, data)
          if (ok) {
            vars.register = cleanRegister
            await this.loadData()
          }
        }
      },
      remove (register: Register): void {
        const found = vars.registers.findIndex(f => f.id === register.id)
        root.$q.dialog(confirmMsg).onOk(async () => {
          const { ok } = await api.delete(`${moduleName}/${register.id}`)
          if (ok) vars.registers.splice(found, 1)
        })
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    functions.loadData()

    return {
      ...toRefs(vars),
      ...functions
    }
  }
})
</script>
