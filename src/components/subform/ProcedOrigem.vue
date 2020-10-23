<template>
  <q-card class="col-12" flat>
    <q-card-section class="row">
      <div class="q-pa-xs col-12">{{label}} <span class="text-bold text-red">(apenas se houver)</span></div>
      <div class="q-pa-xs col-3">
        <ProcedTipos v-model="register.origem_proc" label="Processo/Procedimento" ref="origem_proc" required/>
      </div>
      <div class="q-pa-xs col-3">
        <InputText label="Referência" v-model="register.origem_sjd_ref" ref="origem_sjd_ref" mask="######" required/>
      </div>
      <div class="q-pa-xs col-3">
        <InputAno v-model="register.origem_sjd_ref_ano" ref="origem_sjd_ref_ano" required/>
      </div>
      <div class="q-pa-xs col-3">
        <q-btn-group spread>
          <BtnStack v-if="register.id" label="Editar" icon="fa fa-plus" @click="update(register)"/>
          <BtnStack v-else label="Inserir" icon="fa fa-plus" @click="create"/>
        </q-btn-group>
      </div>
    </q-card-section>
    </q-card-section>
    <q-card-section v-if="registers.length" class="row">
      <q-list bordered separator class="q-pa-xs col-12">
        <q-item clickable v-ripple >
          <q-item-section>Processo/Procedimento</q-item-section>
          <q-item-section>Referência</q-item-section>
          <q-item-section>Ano</q-item-section>
          <q-item-section>Ações</q-item-section>
        </q-item>
        <q-item clickable v-ripple v-for="reg in registers" :key="reg.rg">
          <q-item-section>{{reg.origem_proc}}</q-item-section>
          <q-item-section>{{reg.origem_sjd_ref}}</q-item-section>
          <q-item-section>{{reg.origem_sjd_ref_ano}}</q-item-section>
          <q-item-section>
            <q-btn-group spread>
              <BtnStack label="Editar" icon="fa fa-pen" @click="edit(reg)"/>
              <BtnStack label="Apagar" icon="fa fa-trash" @click="remove(reg)"/>
            </q-btn-group>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
/* eslint-disable camelcase */
import { defineComponent, reactive, toRefs, computed } from '@vue/composition-api'
import { procedTipos } from 'src/config/selects'
import { validate } from 'src/libs/validator'

import ProcedTipos from 'components/form/ProcedTipos.vue'
import InputText from 'components/form/InputText.vue'
import InputAno from 'components/form/InputAno.vue'
import BtnStack from 'components/form/BtnStack.vue'
import { deleteData, post, put } from 'src/libs/api'
import { confirmMsg } from 'src/libs/dialog'

const fields = ['origem_proc', 'origem_sjd_ref', 'origem_sjd_ref_ano']

export interface Register {
  id?: number
  origem_proc: string
  origem_sjd_ref: number | null
  origem_sjd_ref_ano: number | null
}

const cleanRegister = {
  id: 0,
  origem_proc: '',
  origem_sjd_ref: null,
  origem_sjd_ref_ano: null
}

export default defineComponent({
  name: 'ProcedOrigem',
  components: {
    ProcedTipos,
    InputText,
    InputAno,
    BtnStack
  },
  props: {
    label: {
      type: String,
      default: 'Procedimento de origem'
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
        origem_proc: '',
        origem_sjd_ref: null,
        origem_sjd_ref_ano: null
      },
      procedTipos,
      registers: [] as Array<Register>,
      disabled: true,
      type: props.label
    })
    const functions = {
      async loadData () {
        vars.registers = await post('ligacoes/search', props.data, { silent: true })
        return true
      },
      async create () {
        if (validate(refs, fields)) {
          vars.register.origem_sjd_ref = Number(vars.register.origem_sjd_ref)
          const data = { ...props.data, ...vars.register }
          const response = await post('ligacoes', data)
          if (response) {
            this.loadData()
            vars.register = cleanRegister
          }
        }
      },
      edit (register: Register) {
        vars.register = register
      },
      async update (register: Register) {
        if (validate(refs, fields)) {
          vars.register.origem_sjd_ref = Number(vars.register.origem_sjd_ref)
          const data = { ...props.data, ...register }
          const response = await put(`ligacoes/${register?.id}`, data)
          if (response) {
            // eslint-disable-next-line no-void
            void this.loadData()
            vars.register = cleanRegister
          }
        }
      },
      remove (register: Register) {
        const found = vars.registers.findIndex(f => f.id === register.id)
        root.$q.dialog(confirmMsg).onOk(async () => {
          await deleteData(`ligacoes/${register.id}`)
          vars.registers.splice(found, 1)
        })
      }
    }

    // eslint-disable-next-line no-void
    void functions.loadData()

    return {
      ...toRefs(vars),
      ...functions,
      denseVal: computed(() => root.$store.state.configs.dense)
    }
  }
})
</script>
