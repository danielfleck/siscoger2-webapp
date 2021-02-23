<template>
  <page :breadcrumbs="[]">
      <form class="row">
        <div class="q-pa-md col-12">
          <InputPassword label="senha" v-model="register.password" ref="password" required/>
        </div>
        <div class="q-pa-md col-12">
          <InputPassword label="confirmação da senha" v-model="register.confirmPassword" ref="confirmPassword" required/>
        </div>
      </form>
      <q-btn
        @click="update"
        color="positive"
        label="Atualizar"
        class="full-width"
        icon="fa fa-pen"
      />
  </page>
</template>
<script lang="ts">

interface Register {
  id?: number
  password: string
  confirmPassword: string
}

import { defineComponent, reactive, toRefs } from '@vue/composition-api'

import Page from 'components/pages/Page.vue'

import { api, errorNotify, getUser, validate } from 'src/services'
import InputPassword from 'src/components/form/InputPassword.vue'

const fields: string[] = ['password', 'confirmPassword']

const routeBackend = 'users'
const routeFront = '/'

export default defineComponent({
  name: 'Form',
  components: {
    Page,
    InputPassword
  },
  setup (_, { refs, root }) {
    const vars = reactive({
      register: {
        id: 0,
        password: '',
        confirmPassword: ''
      } as Register,
      errorMsg: '',
      user: getUser()
    })

    const functions = {
      async update () {
        const isEqual = this.checkIfIsEqual()
        if (validate(refs, fields) && isEqual) {
          const data = { ...vars.user, password: vars.register.password }
          const { ok } = await api.put(`${routeBackend}/${vars.user.id}`, data, { debug: true })
          if (ok) {
            return root.$router.push(routeFront)
          }
        }
      },
      checkIfIsEqual () {
        if (vars.register.password !== vars.register.confirmPassword) {
          errorNotify('Senhas não conferem')
          return false
        }
        return true
      }
    }

    return {
      ...toRefs(vars),
      ...functions
    }
  }
})
</script>
