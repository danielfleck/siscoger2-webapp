<template>
  <div>
    <q-btn v-if="!ldapIsActive" color="green-7" class="full-width" label="Login via Expresso fora do ar" disable />
    <q-btn v-else color="green-7" class="full-width" :label="ldap ? 'Login com SISCOGER' : 'Login via Expresso'" @click="changeMode" />
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-floating-promises */
import { defineComponent, reactive, toRefs } from '@vue/composition-api'

export default defineComponent({
  name: 'LdapLogin',
  props: {
    ldap: {
      type: Boolean,
      default: false
    }
  },
  setup (_, { emit }) {
    const vars = reactive({
      ldapIsActive: false,
    })
    const functions = {
      changeMode () {
        emit('onChangeMode', true)
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
