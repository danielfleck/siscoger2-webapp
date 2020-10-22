<template>
  <q-card class="col-12" flat>
    <q-card-section class="row">
      <div class="q-pa-xs col-12">Vítima <span class="text-bold text-red">(apenas se houver)</span></div>
      <div class="q-pa-xs col-4">
        <InputRG v-model="register.rg" ref="rg" required/>
      </div>
      <div class="q-pa-xs col-4">
        <InputText label="Nome" v-model="register.nome" ref="nome" required/>
      </div>
      <div v-if="type == 'ipm'" class="q-pa-xs col-4">
        <InputSelect label="Resultado" v-model="register.resultado" :options="ofendidoResultado"/>
      </div>
      <div class="q-pa-xs col-2">
        <InputSelect label="Sexo" v-model="register.sexo" :options="ofendidoSexo"/>
      </div>
      <template v-if="type !== 'ipm'">
        <div class="q-pa-xs col-2">
          <InputText label="Telefone" v-model="register.fone" />
        </div>
        <div class="q-pa-xs col-4">
          <InputText label="E-mail" v-model="register.email"/>
        </div>
      </template>
      <div class="q-pa-xs col-2">
        <InputText label="Idade" v-model="register.idade" mask="###"/>
      </div>
      <div v-if="type !== 'sai'&& type !== 'proc_outros'" class="q-pa-xs col-4">
        <InputSelect label="Escolaridade" v-model="register.escolaridade" :options="ofendidoEscolaridade"/>
      </div>
      <div class="q-pa-xs col-4" v-if="type == 'sai'|| type == 'proc_outros'">
        <InputSelect label="Envolvimento" v-model="register.situacao" :options="ofendidoSituacao"/>
      </div>
      <template v-else>
        <input type="hidden" name="situacao" value="Vitima">
      </template>
      <div class="q-pa-xs col-2">
        <q-btn-group spread>
          <BtnStack label="Cancelar" icon="fa fa-minus" @click="add = !add"/>
          <BtnStack v-if="register.id" label="Editar" icon="fa fa-plus" @click="update(register)"/>
          <BtnStack v-else label="Inserir" icon="fa fa-plus" @click="create"/>
        </q-btn-group>
      </div>
    </q-card-section>
    </q-card-section>
    <q-card-section v-if="registers.length" class="row">
      <q-list bordered separator class="q-pa-xs col-12">
        <q-item clickable v-ripple >
          <q-item-section>rg</q-item-section>
          <q-item-section>nome</q-item-section>
          <q-item-section>resultado/Grad</q-item-section>
          <q-item-section>sexo</q-item-section>
          <q-item-section>fone</q-item-section>
          <q-item-section>email</q-item-section>
          <q-item-section>idade</q-item-section>
          <q-item-section>escolaridade</q-item-section>
          <q-item-section>situacao</q-item-section>
          <q-item-section>Ações</q-item-section>
        </q-item>
        <q-item clickable v-ripple v-for="vitima in registers" :key="vitima.rg">
          <q-item-section>{{vitima.rg}}</q-item-section>
          <q-item-section>{{vitima.nome}}</q-item-section>
          <q-item-section>{{vitima.resultado}}</q-item-section>
          <q-item-section>{{vitima.sexo}}</q-item-section>
          <q-item-section>{{vitima.fone}}</q-item-section>
          <q-item-section>{{vitima.email}}</q-item-section>
          <q-item-section>{{vitima.idade}}</q-item-section>
          <q-item-section>{{vitima.escolaridade}}</q-item-section>
          <q-item-section>{{vitima.situacao}}</q-item-section>
          <q-item-section>
            <q-btn-group spread>
              <BtnStack label="Editar" icon="fa fa-plus" @click="edit(vitima)"/>
              <BtnStack label="Apagar" icon="fa fa-plus" @click="remove(vitima)"/>
            </q-btn-group>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from '@vue/composition-api'
import { ofendidoResultado, ofendidoSexo, ofendidoEscolaridade, ofendidoSituacao } from 'src/config/selects'
const randomIntFromInterval = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)
import { validate } from 'src/libs/validator'

import InputRG from 'components/form/InputRG.vue'
import InputText from 'components/form/InputText.vue'
import InputSelect from 'components/form/InputSelect.vue'
import BtnStack from 'components/form/BtnStack.vue'

const fields = ['rg', 'nome']

export interface Register{
  id: any
  rg: string
  nome: string
  resultado: string
  sexo: string
  fone: string
  email: string
  idade: string
  escolaridade: string
  situacao: string
}

const cleanRegister = {
  id: 0,
  rg: '',
  nome: '',
  resultado: '',
  sexo: '',
  fone: '',
  email: '',
  idade: '',
  escolaridade: '',
  situacao: '',
}

export default defineComponent({
  name: 'Name',
  components: {
    InputRG,
    InputText,
    InputSelect,
    BtnStack,
  },
  props: {
    label: {
      type: String,
      default: 'vitima'
    }
  },
  setup (props, { root, refs }) {
    const vars = reactive({
      ofendidoResultado,
      ofendidoSexo,
      ofendidoEscolaridade,
      ofendidoSituacao,
      register: {
        id: 0,
        rg: '',
        nome: '',
        resultado: '',
        sexo: '',
        fone: '',
        email: '',
        idade: '',
        escolaridade: '',
        situacao: '',
      },
      registers: [] as Array<Register>,
      disabled: true,
      type: props.label
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
        root.$q.dialog({
          title: 'Atenção!',
          message: 'Você tem certeza que deseja realmente remover?',
          cancel: true,
          persistent: true
        }).onOk(() => {
          vars.registers.splice(found, 1)
        })
      }
    }
    return {
      ...toRefs(vars),
      ...functions,
      denseVal: computed(() => root.$store.state.configs.dense),
    }
  }
})
</script>
