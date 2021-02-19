<template>
  <page :breadcrumbs="[
    { label: 'Lista Permissões', link: '/permissoes' },
    { label: 'Criar', link: '/permissoes/inserir' },
    ]">
      <form class="row">
        <div class="q-pa-md col-12">
          <InputText label="Permissão" v-model="register.permission" ref="permission" required/>
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
import { Permission } from 'src/types/permission'

const fields: string[] = ['permission']

export default defineComponent({
  name: 'FormPermission',
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
        id: 0,
        permission: ''
      } as Permission
    })

    const functions = {
      async loadData () {
        const { id } = root.$route.params
        if (id) {
          const { data } = await api.get(`permissions/${id}`)
          vars.register = data as Permission
        }
      },
      async create () {
        if (validate(refs, fields)) {
          const { ok } = await api.post('permissions', vars.register, { debug: true })
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
