<template>
  <page :breadcrumbs="[
    { label: 'Lista', link: '/admin/feriados' },
    { label: 'Criar', link: '/admin/feriados/inserir' },
    ]">
    <form class="row">
      <div class="q-pa-md col-12">
        <input-date v-model="register.data" label="Data da feriado" ref="data" required/>
      </div>
      <div class="q-pa-md col-12">
        <InputText label="Feriado" v-model="register.feriado" ref="feriado" required/>
      </div>
      <div class="q-pa-md col-12">
        <q-btn
          @click="register.id ? update(register.id) : create()"
          color="primary"
          :label="register.id ? 'Editar' : 'Inserir'"
          class="full-width"/>
      </div>
    </form>
  </page>
</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { defineComponent, reactive, toRefs } from '@vue/composition-api'
import { api, validate } from 'src/services'
import Page from 'components/pages/Page.vue'
import InputText from 'components/form/InputText.vue'
import InputDate from 'components/form/InputDate.vue'
import { Feriado } from 'src/types'
import { feriadoRoute } from 'src/routenames'

const fields: string[] = [
  'data',
  'feriado'
]
const moduleName = feriadoRoute
const FeriadoForm = defineComponent({
  name: 'Form',
  components: { Page, InputText, InputDate },
  setup (_, { refs, root }) {
    const vars = reactive({
      register: {
        id: 0,
        data: undefined,
        feriado: ''
      } as Feriado
    })

    const functions = {
      async create () {
        if (validate(refs, fields)) {
          const { ok } = await api.post(moduleName, vars.register, { debug: true })
          if (ok) {
            root.$router.push(`/admin/${moduleName}`)
          }
        }
      },
      async update (id: number) {
        if (validate(refs, fields)) {
          const { ok } = await api.put(`${moduleName}/${id}`, vars.register, { debug: true })

          if (ok) {
            root.$router.push(`/admin/${moduleName}`)
          }
        }
      },
      async loadData () {
        const { id } = root.$route.params
        if (id) {
          const { data } = await api.get(`${moduleName}/${id}`)
          vars.register = data as Feriado
        }
      }
    }

    functions.loadData()

    return {
      ...toRefs(vars),
      ...functions
    }
  }
})

export default FeriadoForm
</script>
