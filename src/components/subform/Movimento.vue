<template>
  <q-card class="col-12" flat>
    <q-card-section class="row">
      <div class="q-pa-xs col-12">{{ label }}</div>
      <div class="q-pa-xs col-12">
        <InputDate v-model="register.data" label="Data" ref="data" required defaultToday/>
      </div>
      <div class="q-pa-xs col-12">
        <InputText label="Descrição" ref="descricao" v-model="register.descricao" :minLength="50" autogrow required/>
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
          <q-item-section>{{movimento.data}}</q-item-section>
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
import { defineComponent, reactive, toRefs, computed } from '@vue/composition-api'
import { confirmMsg } from 'src/libs/dialog'
import { validate } from 'src/libs/validator'

import { randomIntFromInterval } from 'src/utils/mockValues'

import InputText from 'components/form/InputText.vue'
import InputDate from 'components/form/InputDate.vue'
import BtnStack from 'components/form/BtnStack.vue'

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

export default defineComponent({
  name: 'Movimento',
  components: { InputText, InputDate, BtnStack },
  props: {
    label: {
      type: String,
      default: 'Movimentos'
    },
    proc: {
      type: String
    },
    id_proc: {
      type: Number,
      default: 0
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
      create () {
        if (validate(refs, fields)) {
          vars.register.id = randomIntFromInterval(1, 999)
          vars.registers.push(vars.register)
          vars.register = cleanRegister
        }
      },
      edit (register: Register) {
        vars.register = register
      },
      update (register: Register) {
        const found = vars.registers.findIndex(f => f.id === register.id)
        vars.registers[found] = register
        vars.register = cleanRegister
      },
      remove (register: Register) {
        const found = vars.registers.findIndex(f => f.id === register.id)
        root.$q.dialog(confirmMsg).onOk(() => {
          vars.registers.splice(found, 1)
        })
      }
    }

    return {
      ...toRefs(vars),
      ...functions
    }
  }
})
</script>
