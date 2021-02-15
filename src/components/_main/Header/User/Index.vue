<template>
  <q-btn-dropdown stretch flat dropdown-icon="fas fa-user" no-icon-animation>
    <q-list>
      <q-item clickable v-close-popup tabindex="0" @click="logout">
        <q-item-section avatar>
          <q-icon name="fa fa-power-off" />
        </q-item-section>
        <q-item-section>Sair</q-item-section>
      </q-item>
      <q-item clickable v-close-popup tabindex="0" to="#">
        <q-item-section avatar>
          <q-icon name="fa fa-key" />
        </q-item-section>
        <q-item-section>Alterar Senha</q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { LocalStorage } from 'quasar'
import { successNotify } from 'src/libs/notify'

export default defineComponent({
  name: 'HeaderMenu',
  setup (_, { root }) {
    const functions = {
      logout () {
        this.cleanStore()
        successNotify('Deslogado com sucesso')
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        root.$router.push('/login')
      },
      cleanStore () {
        ['token', 'user', 'permissions', 'roles'].map(item => LocalStorage.remove(item))
      }
    }
    return {
      ...functions
    }
  }
})
</script>

<style >

</style>
