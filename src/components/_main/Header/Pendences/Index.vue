<template>
  <q-btn-dropdown stretch flat dropdown-icon="fas fa-bell" no-icon-animation>
    <template v-slot:label>
      <q-badge color="negative" floating>36</q-badge>
    </template>
    <q-list>
      <q-item-label header>Pendências</q-item-label>
      <HeadPendences label="CD" link="'/pendencias-cd'"/>
      <q-item clickable v-close-popup v-for="pendence in pendences" :key="pendence.label" :to="pendence.link">
        <q-item-section>
          <q-item-label>{{ pendence.label }}</q-item-label>
          <q-item-label caption>{{ pendence.qtd }} Pendências</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="info" :color="pendence.color" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { LocalStorage } from 'quasar'
import { successNotify } from 'src/libs/notify'
import HeadPendences from './Pendences.vue'

const Pendences = defineComponent({
  name: 'HeaderMenu',
  components: { HeadPendences },
  setup (_, { root }) {
    const pendences = ref([
      { label: 'Gerais', qtd: 10, color: 'negative', link: '/' },
      { label: 'FATD', qtd: 15, color: 'negative', link: '/pendencias-fatd' },
      { label: 'IPM', qtd: 0, color: 'positive', link: '/pendencias-ipm' },
      { label: 'Sindicância', qtd: 8, color: 'amber', link: '/pendencias-sindicancia' },
      { label: 'CD', qtd: 3, color: 'amber', link: '/pendencias-cd' }
    ])

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
      pendences,
      ...functions
    }
  }
})

export default Pendences
</script>

<style >

</style>
