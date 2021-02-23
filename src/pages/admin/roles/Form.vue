<template>
  <page :breadcrumbs="[
    { label: 'Lista ROUTE', link: '/ROUTE' },
    { label: 'Criar', link: '/ROUTE/inserir' },
    ]">
      <form class="row">
        <div class="q-pa-md col-12">
          <InputText label="Papel" v-model="register.role" ref="role" required/>
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
import { Role } from 'src/types'

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
        role: ''
      } as Role
    })

    const functions = {
      async loadData () {
        const { id } = root.$route.params
        if (id) {
          const { data } = await api.get(`roles/${id}`)
          vars.register = data as Role
        }
      },
      async create () {
        if (validate(refs, fields)) {
          const { ok } = await api.post('roles', vars.register, { debug: true })
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
      ...functions
    }
  }
})
</script>
