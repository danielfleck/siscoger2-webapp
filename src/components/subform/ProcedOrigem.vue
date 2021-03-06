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
          <BtnStack v-if="register.id" label="Atualizar" icon="fa fa-pen" @click="update(register)"/>
          <BtnStack v-else label="Inserir" icon="fa fa-plus" @click="create"/>
        </q-btn-group>
      </div>
    </q-card-section>
    <q-expansion-item
      v-if="registers.length"
      :label="`${label} - lista`"
      default-opened
      :caption="`Total: ${registers.length}`"
      >
      <q-card-section class="row">
        <q-list bordered separator class="q-pa-xs col-12">
          <q-item clickable v-ripple >
            <q-item-section>Processo/Procedimento</q-item-section>
            <q-item-section>Referência</q-item-section>
            <q-item-section>Ano</q-item-section>
            <q-item-section>Ações</q-item-section>
          </q-item>
          <q-item clickable v-ripple v-for="reg in registers" :key="reg.id">
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
    </q-expansion-item>
  </q-card>
</template>

<script lang="ts">
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { defineComponent, reactive, toRefs, computed } from '@vue/composition-api'
import { procedTipos } from 'src/config/selects'
import ProcedTipos from 'components/form/ProcedTipos.vue'
import InputText from 'components/form/InputText.vue'
import InputAno from 'components/form/InputAno.vue'
import BtnStack from 'components/form/BtnStack.vue'
import { api, confirmMsg, validate } from 'src/services'
import { getDense } from 'src/store/utils'

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

const moduleName = 'ligacoes'
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
      } as Register,
      procedTipos,
      registers: [] as Array<Register>,
      disabled: true,
      type: props.label
    })
    const functions = {
      async loadData (): Promise<void> {
        // resetValidation(refs, fields)
        const { data } = await api.post(`${moduleName}/search`, props.data, { silent: true })
        vars.registers = data as Register[]
      },
      async create (): Promise<void> {
        if (validate(refs, fields)) {
          vars.register.origem_sjd_ref = Number(vars.register.origem_sjd_ref)
          const data = { ...props.data, ...vars.register }
          const response = await api.post(moduleName, data)
          if (response) {
            vars.register = cleanRegister
            await this.loadData()
          }
        }
      },
      edit (register: Register): void {
        vars.register = register
      },
      async update (register: Register): Promise<void> {
        if (validate(refs, fields)) {
          vars.register.origem_sjd_ref = Number(vars.register.origem_sjd_ref)
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
      ...functions,
      denseVal: computed(() => getDense(root))
    }
  }
})
</script>
