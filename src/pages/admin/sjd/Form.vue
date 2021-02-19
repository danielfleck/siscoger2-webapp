<template>
  <page :breadcrumbs="[
    { label: 'Lista sjds', link: '/sjds' },
    { label: 'Criar', link: '/sjds/inserir' },
    ]">
      <form class="row">
        <!-- <div class="q-pa-md col-12">
          <Prioridade v-model="register.prioridade"/>
        </div>
        <div class="q-pa-md col-4">
          <InputText label="TEXT" v-model="register.TEXT" ref="TEXT" required/>
        </div>
        <div class="q-pa-md col-4">
          <InputDate v-model="register.DATE" label="DATE" />
        </div>
        <div class="q-pa-md col-6">
          <InputSelect label="SELECT" v-model="register.SELECT" :options="[1,2,3]" />
        </div>
        <div class="q-pa-md col-12">
          <InputText label="TEXTAREA" v-model="register.TEXTAREA" ref="sintese_txt" :minLength="200" autogrow required :lorem="200"/>
        </div> -->
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

const fields: string[] = ['']

export default defineComponent({
  name: 'Form',
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
        id: 0
      }
    })

    const functions = {
      async create () {
        if (validate(refs, fields)) {
          const { ok } = await api.post('sjds', vars.register, { debug: true })
          if (ok) {
            return root.$router.push('/sjds')
          }
        }
      },
      async update (id: number) {
        if (validate(refs, fields)) {
          const { ok } = await api.put(`sjds/${id}`, vars.register, { debug: true })
          if (ok) {
            return root.$router.push('/sjds')
          }
        }
      }
    }
    return {
      ...toRefs(vars),
      ...functions
    }
  }
})
</script>
