<template>
  <page :breadcrumbs="[
    { label: 'Lista usuarios', link: '/admin/usuarios' },
    { label: 'Criar', link: '/admin/usuarios/inserir' },
    ]">
      <form class="row">
        <div class="q-pa-md col-4">
          <InputText label="RG" mask="#############" v-model="register.rg" ref="role" required/>
        </div>
        <div class="q-pa-md col-4">
          <InputText label="Nome" v-model="register.name" ref="name" required/>
        </div>
        <div class="q-pa-md col-4">
          <InputText label="CPF"  mask="###.###.###-##" v-model="register.cpf" ref="cpf" required/>
        </div>
        <div class="q-pa-md col-4">
          <InputSelect label="Classe" v-model="register.class" ref="class" required :options="classPMPR"/>
        </div>
        <div class="q-pa-md col-4">
          <InputSelect label="Posto/Graduação" v-model="register.position" ref="position" required :options="postograd"/>
        </div>
        <div class="q-pa-md col-4">
          <InputSelect label="Quadro" v-model="register.group" ref="group" required :options="[
          { value: 'QOPM', label: 'QOPM' },
          { value: 'QOBM', label: 'QOBM' },
          { value: 'QPM', label: 'QPM' },
          { value: 'QBM', label: 'QBM' }
        ]"/>
        </div>
        <div class="q-pa-md col-4">
          <InputSelect label="Subquadro" v-model="register.subgroup" ref="subgroup" required :options="[
            { value: '-', label: '-' },
            { value: '1-0', label: '1-0' },
            { value: '2-0', label: '2-0' }
          ]"/>
        </div>
        <div class="q-pa-md col-4">
          <OPM v-model="register.cdopm" ref="opm" required/>
        </div>
        <div class="q-pa-md col-4">
          <InputText label="Email" v-model="register.email" ref="email" required/>
        </div>
        <div class="q-pa-md col-12">
          <InputSelect 
            label="Papéis" 
            v-model="register.roles"
            optionLabel="role"
            useChips
            stackLabel
            multiple
            ref="subgroup"
            required
            :options="roles"
          />
        </div>
      </form>
      <q-btn
        @click="register.id ? update(register.id) : create()"
        color="positive"
        :label="register.id ? 'Atualizar' : 'Inserir'"
        class="full-width"
        :icon="register.id ? 'fa fa-pen' : 'fa fa-plus'"
      />
  </page>
</template>
<script lang="ts">
/* eslint-disable no-void */
import { defineComponent, reactive, toRefs } from '@vue/composition-api'

import Page from 'components/pages/Page.vue'
import Prioridade from 'components/form/Prioridade.vue'
import InputDate from 'components/form/InputDate.vue'
import InputText from 'components/form/InputText.vue'
import InputSelect from 'components/form/InputSelect.vue'

import { api, validate } from 'src/services'
import { Role, User } from 'src/types'
import OPM from 'src/components/form/OPM.vue'
import { postograd, classPMPR, group, subgroup } from 'src/config'

const fields: string[] = [
  'rg',
  'name',
  'cpf',
  'class',
  'position',
  'group',
  'subgroup',
  'cdopm',
  'email'
]

export default defineComponent({
  name: 'FormRole',
  components: {
    Page,
    Prioridade,
    InputDate,
    InputText,
    InputSelect,
    OPM
  },
  setup (_, { refs, root }) {
    const vars = reactive({
      register: {
        name: '',
        rg: '',
        cpf: '',
        class: '',
        position: '',
        group: '',
        subgroup: '',
        cdopm: '',
        email: '',
        roles: [] as Role[]
      } as User,
      roles: [] as Role[],
      postograd,
      classPMPR,
      group,
      subgroup
    })

    const functions = {
      async loadData () {
        const { id } = root.$route.params
        const { data } = await api.get('roles')
        vars.roles = data as Role[]
        console.log(data)
        if (id) {
          const { data } = await api.get(`users/${id}`)
          vars.register = data as User
        }
      },
      async create () {
        if (validate(refs, fields)) {
          const { ok } = await api.post('users', vars.register, { debug: true })
          if (ok) {
            return root.$router.push('/admin/usuarios')
          }
        }
      },
      async update (id: number) {
        if (validate(refs, fields)) {
          const { ok } = await api.put(`users/${id}`, vars.register, { debug: true })
          if (ok) {
            return root.$router.push('/admin/usuarios')
          }
        }
      }
    }

    void functions.loadData()

    return {
      ...toRefs(vars),
      ...functions
    }
  }
})
</script>
