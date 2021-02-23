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
import { errorNotify, successNotify } from 'src/libs/notify'
import { api, setStore } from 'src/services'

import { validate } from 'src/libs/validator'
import InputText from 'src/components/form/InputText.vue'
import InputPassword from 'src/components/form/InputPassword.vue'
import Ldap from './Ldap.vue'
import { Auth, AuthResponse, User } from 'src/types'

const fields = ['rg', 'password', 'username']

export default defineComponent({
  name: 'FormLogin',
  components: { InputText, InputPassword, Ldap },
  setup (_, { refs, root }) {
    const vars = reactive({
      isPwd: true,
      ldap: false,
      atempts: 1,
      totalAtemps: 3,
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
            await this.loginLdap()
          } else {
            await this.loginSiscoger()
          }
        }
      },
      async loginSiscoger () {
        const response = await api.post('auth/login', vars.registry, { silent: true, noRedirect: true })
        console.log(response)

        if (!response.ok) {
          await this.handleAtempts()
          return
        }

        const data = response.data as AuthResponse
        if (data.user.block) {
          errorNotify('usuário bloqueado, entre em contato com SJD')
          return
        }

        setStore(data)
        this.redirectAfterLogin(data.user.terms, data.user.name)
      },
      async loginLdap () {
        // TODO
      },
      async handleAtempts () {
        if (vars.atempts < vars.totalAtemps) {
          errorNotify('usuário ou senha inválidos')
          errorNotify(`tentativa ${vars.atempts} de ${vars.totalAtemps}`)
          vars.atempts++
        } else {
          const { ok, data } = await api.post('users/block', { rg: vars.registry.rg }, { noRedirect: true, silent: true })
          const user = data as User
          if(ok) errorNotify(`Bloqueado usuário ${user.name}, entre em contato com SJD`)
        }
      },
      changeMode () {
        vars.ldap = !vars.ldap
      },
      redirectAfterLogin (terms: boolean, name: string) {
        if (!terms) {
          root.$router.push('/termos')
          return
        }
        root.$router.push('/')
        successNotify(`Bem vindo ${name}!`)
      }
    }

    return {
      ...toRefs(vars),
      ...functions
    }
  }
})
</script>
