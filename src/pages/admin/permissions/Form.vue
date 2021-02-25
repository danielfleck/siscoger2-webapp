<template>
  <page :breadcrumbs="[
    { label: 'Lista Permissões', link: '/admin/permissoes' },
    { label: 'Criar', link: '/admin/permissoes/inserir' },
    ]">
      <form class="row">
        <div v-if="insertion" class="q-pa-md col-12">
          <InputToogle
            v-model="groupToogle"
            label="Inserir grupo"
            tooltip="
              listar-XXX
              ver-XXX
              criar-XXX
              editar-XXX
              apagar-XXX"
            />
        </div>
        <div v-if="!groupToogle" class="q-pa-md col-12">
          <InputText label="Permissão" v-model="register.permission" ref="permission" required/>
        </div>
        <div class="q-pa-md col-12">
          <InputText label="Grupo" v-model="register.group" ref="group" required/>
        </div>
        <div class="q-pa-md col-12">
          <InputText label="Descrição" v-model="register.description" />
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
import { Permission, Role } from 'src/types'
import InputToogle from 'src/components/form/InputToogle.vue'

const fields: string[] = ['permission', 'group']

export default defineComponent({
  name: 'FormPermission',
  components: {
    Page,
    Prioridade,
    InputDate,
    InputText,
    InputSelect,
    InputToogle
  },
  setup (_, { refs, root }) {
    const vars = reactive({
      groupToogle: false,
      insertion: true,
      register: {
        id: 0,
        permission: '',
        description: '',
        group: '',
        roles: [] as Role[]
      } as Permission,
      roles: [] as Role[]
    })

    const functions = {
      async loadData () {
        const { id } = root.$route.params
        const { data } = await api.get('roles')
        vars.roles = data as Role[]
        if (id) {
          vars.insertion = false
          const { data } = await api.get(`permissions/${id}`)
          vars.register = data as Permission
        }
      },
      async create () {
        if (validate(refs, fields)) {
          const group = vars.register.group ? 'group' : ''
          const { ok } = await api.post(`permissions/${group}`, vars.register, { debug: true })
          if (ok) {
            return root.$router.push('/admin/permissoes')
          }
        }
      },
      async update (id: number) {
        if (validate(refs, fields)) {
          const { ok } = await api.put(`permissions/${id}`, vars.register, { debug: true })
          if (ok) {
            return root.$router.push('/admin/permissoes')
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
