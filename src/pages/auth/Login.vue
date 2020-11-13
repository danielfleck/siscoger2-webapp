<template>
   <q-page class="window-height window-width row justify-center items-center">
     <!-- <q-icon name="img:logo-sem-fundo.png" size="100px"/> -->
    <div class="column">
      <div class="row">
        <div class="col-12">
          <div class="text-h4 text-white q-my-md">SISCOGER</div>
        </div>
      </div>
      <q-card bordered class="q-pa-lg">
        <q-card-section >
          <div class="col-12">
            <q-input v-if="ldap" ref="username" outlined clearable  v-model="registry.username" placeholder="Digite seu nome de usuário (ex: nome@pm.pr.gov.br)" :rules="[val => !!val || 'Usuário é obrigatório']" >
              <template v-slot:prepend>
                <q-icon color="grey-9" name="mail" />
              </template>
            </q-input>
            <q-input v-else ref="rg" mask="############" outlined clearable  v-model="registry.rg" placeholder="Digite seu RG" :rules="[val => !!val || 'Rg é obrigatório']" >
              <template v-slot:prepend>
                <q-icon color="grey-9" name="fa fa-user" />
              </template>
            </q-input>
          </div>
          <div class="col-12">
            <q-input ref="pass" outlined clearable  v-model="registry.pass" :type="isPwd ? 'password' : 'text'" placeholder="Digite sua senha" :rules="[val => !!val || 'Senha é obrigatória']">
              <template v-slot:prepend>
                <q-icon color="grey-9" name="vpn_key" />
              </template>
              <template v-slot:append>
                <q-icon
                  color="grey-9"
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </div>
          <div class="col-12">
            <q-btn color="light-blue-7" class="full-width" label="Login" @click="login"/>
              <div class="text-center text-dark">ou</div>
            <q-btn id="btnToogle" :disable="!ldapIsActive" color="green-7" class="full-width" :label="ldap ? 'Login com SISCOGER' : 'Login via Expresso'" @click="changeMode"/>
            <q-tooltip
              v-if="!ldapIsActive"
              target="btnToogle"
              content-class="bg-black"
            >
              Conexão com Expresso encontra-se fora do ar<br/>
              assim que for reestabelecida essa opção estará<br/>
              disponível novamente
            </q-tooltip>
          </div>
        </q-card-section>
        <q-card-section class="text-center q-pa-none">
            <p class="text-grey-6">Não tem acesso ao sistema?</p>
            <p class="text-grey-6">
              Leia a Orientacao
              <a href="http://10.47.0.26/acesso/index.php/orientacoes" class="text-grey-8" style="text-decoration:none">002/2019/COGER</a>
              e envie um E-PROTOCOLO
            </p>
          </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-floating-promises */
import { defineComponent, reactive, toRefs } from '@vue/composition-api'

import { validate, resetValidation } from 'src/libs/validator'
const fields = ['rg', 'pass', 'username']

export default defineComponent({
  name: 'Login',
  setup (_, { refs, root }) {
    const vars = reactive({
      isPwd: true,
      ldap: false,
      ldapIsActive: false,
      registry: {
        rg: null,
        username: '',
        pass: ''
      }
    })
    const functions = {
      login () {
        if (validate(refs, fields)) {
          root.$router.push('/')
        }
      },
      changeMode () {
        resetValidation(refs, fields)
        vars.ldap = !vars.ldap
      },
      verifyIfLdapIsActive () {
        vars.ldapIsActive = false
        return true
      }
    }

    functions.verifyIfLdapIsActive()

    return {
      ...toRefs(vars),
      ...functions
    }
  }
})
</script>
