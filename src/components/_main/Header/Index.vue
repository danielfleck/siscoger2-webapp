<template>
  <q-header elevated>
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="toogleMenu"
      />
      <q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs" to="/">
        <q-icon name="img:logo-sem-fundo.png" size="28px" />
        <q-toolbar-title shrink class="text-weight-bold">
          {{ name }}
        </q-toolbar-title>
      </q-btn>
      <q-space />

      <SearchBar />
      <q-space />

      <div class="q-gutter-sm row items-center no-wrap">
        <Pendences />
        <Configs />
        <User />
      </div>
    </q-toolbar>
  </q-header>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import SearchBar from './SearchBar/Index.vue'
import Configs from './Configs/Index.vue'
import Pendences from './Pendences/Index.vue'
import User from './User/Index.vue'
import { appName } from '../../../config/app'

const Header = defineComponent({
  name: 'Header',
  components: { SearchBar, User, Configs, Pendences },
  setup (_, { root } ) {
    const name = ref(appName)
    return { 
      name,
      toogleMenu: () => root.$store.dispatch('configs/toogleMenu')
    }
  }
})

export default Header
</script>

<style >

</style>
