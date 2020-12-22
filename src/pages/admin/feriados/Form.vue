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
import { get, post, put } from 'src/libs/api'
import { validate } from 'src/libs/validator'
import Page from 'components/pages/Page.vue'
import InputText from 'components/form/InputText.vue'
import InputDate from 'components/form/InputDate.vue'

type Register = {
  id?: number,
  data: string | Date,
  feriado: string,
}
const fields = [
  'data',
  'feriado'
]
const moduleName = 'feriados'
const FeriadoForm = defineComponent({
  name: 'Form',
  components: { Page, InputText, InputDate },
  setup (_, { refs, root }) {
    const vars = reactive({
      register: {
        id: 0,
        data: '',
        feriado: ''
      } as Register
    })

    const functions = {
      async create () {
        if (validate(refs, fields)) {
          const response = await post(moduleName, vars.register, { complete: true, debug: true })
          if (response.returntype === 'success') {
            root.$router.push('/admin/feriados')
          }
        }
      },
      async update (id: number) {
        if (validate(refs, fields)) {
          const response = await put(`${moduleName}/${id}`, vars.register, { complete: true, debug: true })

          if (response.returntype === 'success') {
            root.$router.push('/admin/feriados')
          }
        }
      },
      async loadData () {
        const { id } = root.$route.params
        if (id) {
          vars.register = await get(`${moduleName}/${id}`)
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
