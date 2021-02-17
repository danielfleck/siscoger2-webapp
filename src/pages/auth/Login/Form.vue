<template>
  <q-card-section >
    <div class="col-12">
      <input-text 
        v-if="ldap"
        v-model="registry.username"
        ref="username"
        data-cy="username"
        icon="mail"
        label="Nome de usuário"
        placeholder="Digite seu nome de usuário (ex: nome@pm.pr.gov.br)"
        required
      />
      <input-text 
        v-else 
        v-model="registry.rg"
        ref="rg"
        data-cy="username"
        mask="############"
        label="RG"
        placeholder="Digite seu RG"
        icon="fa fa-user"
        required
      />
    </div>
    <div class="col-12">
      <input-password 
        data-cy="password"
        ref="password"
        v-model="registry.password"
        label="Digite sua senha"
        required
      />
    </div>
    <div class="col-12">
      <q-btn data-cy="button" color="light-blue-7" class="full-width" label="Login" @click="login" />
      <div class="text-center text-dark">ou</div>
      <ldap @onChangeMode="changeMode" :ldap="ldap"/>
    </div>
  </q-card-section>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-floating-promises */
import { defineComponent, reactive, toRefs } from '@vue/composition-api'
import { post } from 'src/libs/api'
import { errorNotify, successNotify } from 'src/libs/notify'
import { api, setStore } from 'src/services'

import { validate } from 'src/libs/validator'
import InputText from 'src/components/form/InputText.vue'
import InputPassword from 'src/components/form/InputPassword.vue'
import Ldap from './Ldap.vue'
import { Auth, AuthResponse } from 'src/types/auth'

const fields = ['rg', 'password', 'username']

export default defineComponent({
  name: 'FormLogin',
  components: { InputText, InputPassword, Ldap },
  setup (_, { refs, root }) {
    const vars = reactive({
      isPwd: true,
      ldap: false,
      registry: {
        rg: '',
        username: '',
        password: ''
      } as Auth
    })
    const functions = {
      async login () {
        if (validate(refs, fields)) {
          if (vars.ldap) {
            this.loginLdap()
          } else {
            this.loginSiscoger()
          }
        }
      },
      async loginSiscoger () {
        const response = await api.post('auth/login', vars.registry, { silent: true  })

        if (!response.ok) { 
          errorNotify('usuário ou senha inválidos'); 
          return 
        }

        const data = response.data as unknown as AuthResponse
        setStore(data)
        successNotify(`Bem vindo ${data.user.name}!`)
        this.redirectAfterLogin(data.user.terms)

      },
      loginLdap () {
        // TODO
      },
      changeMode () {
        vars.ldap = !vars.ldap
      },
      redirectAfterLogin (terms: boolean) {
        if (!terms) {
          root.$router.push('/termos')
          return
        }
        root.$router.push('/')
      }
    }

    return {
      ...toRefs(vars),
      ...functions
    }
  }
})
</script>
