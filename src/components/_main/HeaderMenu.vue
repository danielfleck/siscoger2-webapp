<template>
  <div>
    <q-btn-dropdown stretch flat dropdown-icon="fas fa-bell" no-icon-animation>
      <template v-slot:label>
        <q-badge color="negative" floating>36</q-badge>
      </template>
      <q-list>
        <q-item-label header>Pendências</q-item-label>
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
    <q-btn-dropdown stretch flat dropdown-icon="fas fa-cogs">
      <q-list>
        <q-item-label header>Configurações</q-item-label>
        <q-item clickable v-close-popup tabindex="0">
          <q-item-section avatar>
            <q-toggle v-model="dense" label="Formulário Compacto" />
          </q-item-section>
        </q-item>
        <q-item clickable v-close-popup tabindex="0">
          <q-item-section avatar>
            <q-toggle v-model="fab" label="Opções avançadas" />
          </q-item-section>
        </q-item>
         <q-item clickable v-close-popup tabindex="0">
          <q-item-section avatar>
            <q-toggle v-model="dark" label="Modo escuro" />
          </q-item-section>
        </q-item>
        <q-separator/>
        <q-item-label header>Sobre</q-item-label>
        <q-item clickable v-close-popup tabindex="0">
          <q-item-section>
            versão sistema: {{ version }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
    <q-btn-dropdown stretch flat dropdown-icon="fas fa-user" no-icon-animation>
      <q-list>
        <q-item clickable v-close-popup tabindex="0" to="/login">
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
  </div>
</template>

<script lang="ts">
import { appVersion } from '../../config/app'
import { getFab, getDense } from 'src/store/utils'
import { defineComponent, ref, computed } from '@vue/composition-api'
export default defineComponent({
  name: 'HeaderMenu',
  setup (_, { root }) {
    const version = ref(appVersion)
    const pendences = ref([
      { label: 'Gerais', qtd: 10, color: 'negative', link: '/' },
      { label: 'FATD', qtd: 15, color: 'negative', link: '/pendencias-fatd' },
      { label: 'IPM', qtd: 0, color: 'positive', link: '/pendencias-ipm' },
      { label: 'Sindicância', qtd: 8, color: 'amber', link: '/pendencias-sindicancia' },
      { label: 'CD', qtd: 3, color: 'amber', link: '/pendencias-cd' }
    ])
    return {
      version,
      pendences,
      dense: computed({
        get: () => getDense(root),
        set: () => root.$store.dispatch('configs/toogleDense')
      }),
      fab: computed({
        get: () => getFab(root),
        set: () => root.$store.dispatch('configs/toogleFab')
      }),
      dark: computed({
        get: () => root.$q.dark.isActive,
        set: () => root.$q.dark.toggle()
      })
    }
  }
})
</script>

<style >

</style>
