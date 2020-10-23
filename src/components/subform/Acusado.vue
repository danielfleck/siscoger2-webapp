<template>
  <q-card class="col-12" flat>
    <q-card-section class="row">
      <div class="q-pa-xs col-12">{{ label }}</div>
      <div class="q-pa-xs col-2">
        <InputText label="RG" ref="rg" v-model="register.rg" required/>
      </div>
      <div class="q-pa-xs col-3">
        <InputText :disable="disabled" label="Nome" ref="nome" v-model="register.nome" required/>
      </div>
      <div class="q-pa-xs col-3">
        <PostoGrad v-model="register.cargo" ref="cargo" required/>
      </div>
      <div class="q-pa-xs col-2">
        <ResultadoAcusado v-model="register.resultado" label="Resultado" ref="resultado"/>
      </div>
      <div class="q-pa-xs col-2">
         <q-btn-group spread>
          <BtnStack :label="disabled ? 'Liberar' : 'Bloquear'" :icon=" disabled ? 'fa fa-lock' : 'fa fa-lock-open'" @click="disabled = !disabled"/>
          <BtnStack v-if="register.id" label="Editar" icon="fa fa-plus" @click="update(register)"/>
          <BtnStack :disable="unique && registers.length" v-else label="Inserir" icon="fa fa-plus" @click="create"/>
        </q-btn-group>
      </div>
    </q-card-section>
    <q-card-section v-if="registers.length" class="row">
      <q-list bordered separator class="q-pa-xs col-12">
        <q-item clickable v-ripple >
          <q-item-section>RG</q-item-section>
          <q-item-section>Nome</q-item-section>
          <q-item-section>Posto/Grad</q-item-section>
          <q-item-section>Resultado</q-item-section>
          <q-item-section>Ações</q-item-section>
        </q-item>
        <q-item clickable v-ripple v-for="acusado in registers" :key="acusado.rg">
          <q-item-section>{{acusado.rg}}</q-item-section>
          <q-item-section>{{acusado.nome}}</q-item-section>
          <q-item-section>{{acusado.cargo}}</q-item-section>
          <q-item-section>{{acusado.resultado || 'Não há'}}</q-item-section>
          <q-item-section>
            <q-btn-group spread>
              <BtnStack label="Editar" icon="fa fa-plus" @click="edit(acusado)"/>
              <BtnStack label="Apagar" icon="fa fa-trash" @click="remove(acusado)"/>
            </q-btn-group>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from '@vue/composition-api'
import { resultadoAcusado, postograd } from 'src/config/selects'
import { confirmMsg } from 'src/libs/dialog'
import { validate, resetValidation } from 'src/libs/validator'

import InputText from 'components/form/InputText.vue'
import PostoGrad from 'components/form/PostoGrad.vue'
import ResultadoAcusado from 'components/form/ResultadoAcusado.vue'
import BtnStack from 'components/form/BtnStack.vue'
const fields = ['rg', 'nome', 'cargo']
// const situacao = {
//   sindicancia: 'Sindicado'
// }
const randomIntFromInterval = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)

export interface Register{
  id: any
  rg: string
  nome: string
  cargo: string
  resultado: string
}

const cleanRegister = {
  id: 0,
  rg: '',
  nome: '',
  cargo: '',
  resultado: ''
}

export default defineComponent({
  name: 'Acusado',
  components: { InputText, PostoGrad, ResultadoAcusado, BtnStack },
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    disable: {
      type: Boolean,
      default: false
    },
    unique: {
      type: Boolean,
      default: false
    }
    // proc: {
    //   type: String,
    //   required: true
    // },
    // id_proc: {
    //   type: Number,
    //   default: 0
    // }
  },

  setup (props, { root, refs }) {
    const vars = reactive({
      register: {
        id: 0,
        rg: '',
        nome: '',
        cargo: '',
        resultado: ''
      },
      registers: [] as Array<Register>,
      disabled: true,
      resultadoAcusado,
      postograd
    })
    const functions = {
      create () {
        if (validate(refs, fields)) {
          vars.register.id = randomIntFromInterval(1, 999)
          vars.registers.push(vars.register)
          resetValidation(refs, fields)
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
        resetValidation(refs, fields)
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
      ...functions,
      denseVal: computed(() => root.$store.state.configs.dense)
    }
  }
})
</script>
