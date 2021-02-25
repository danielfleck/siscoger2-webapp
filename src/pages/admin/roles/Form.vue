<template>
  <page :breadcrumbs="[
    { label: 'Lista papeis', link: '/admin/papeis' },
    { label: 'Criar', link: '/admin/papeis/inserir' },
    ]">
      <form class="row">
        <div class="q-pa-md col-12">
          <InputText label="Papel" v-model="register.role" ref="role" required/>
        </div>
        <q-card v-for="(groups, index) in permissions" class="q-pa-md col-lg-3 col-md-4 col-xs-12" :key="index">
          <q-card-section>
            <div class="text-h6">{{ groups[0].group || 'outros' }}</div>
          </q-card-section>
          <q-card-section >
            <InputSelect
              :label="groups[0].group"
              v-model="permissionsChecked[group]"
              optionLabel="permission"
              useChips
              stackLabel
              multiple
              required
              :options="groups"
            />
          </q-card-section>
        </q-card>
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
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-void */
import { defineComponent, reactive, toRefs } from '@vue/composition-api'

import Page from 'components/pages/Page.vue'
import Prioridade from 'components/form/Prioridade.vue'
import InputDate from 'components/form/InputDate.vue'
import InputText from 'components/form/InputText.vue'
import InputSelect from 'components/form/InputSelect.vue'

import { api, validate } from 'src/services'
import { Permission, Role } from 'src/types'

const fields: string[] = ['role']

export default defineComponent({
  name: 'FormRole',
  components: {
    Page,
    Prioridade,
    InputDate,
    InputText,
    InputSelect
  },
  setup (_, { refs, root }) {
    const vars = reactive({
      register: {
        role: '',
        permissions: [] as Permission[]
      } as Role,
      permissions: [] as Permission[],
      permissionsChecked: [] as Permission[]
    })

    function checkPermissions (value) {
      vars.register.permissions.push(value)
    }

    const functions = {
      async loadData () {
        const { id } = root.$route.params
        const { data } = await api.get('permissions')

        vars.permissions = data.reduce((obj: any, permission: Permission) => {
          const { group, ...rest } = permission
          if (!obj[group]) obj[group] = []
          obj[group].push(permission)
          return obj
        }, {})

        if (id) {
          const { data } = await api.get(`roles/${id}`)
          vars.register = data as Role
        }
      },
      async create () {
        if (validate(refs, fields)) {
          const { ok } = await api.post('roles', { ...vars.register, permissions: vars.permissionsChecked }, { debug: true })
          if (ok) {
            return root.$router.push('/admin/papeis')
          }
        }
      },
      async update (id: number) {
        if (validate(refs, fields)) {
          const { ok } = await api.put(`roles/${id}`, vars.register, { debug: true })
          if (ok) {
            return root.$router.push('/admin/papeis')
          }
        }
      }
    }

    void functions.loadData()

    return {
      ...toRefs(vars),
      checkPermissions,
      ...functions
    }
  }
})
</script>
