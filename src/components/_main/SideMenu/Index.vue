<template>
  <q-drawer
      v-model="menu"
      show-if-above
      bordered
      :content-class="$q.dark.isActive ? 'bg-grey-10' : 'bg-grey-10'"
    >
    <q-list class="rounded-borders" >
      <ProcessosEProcedimentos />
      <Apresentacao />
      <Relatorios />
      <Busca />
      <Correicoes />
      <Policiais />
      <Sai />
      <Bi />
      <Ajuda />
      <Administracao />
      <Historia />
      <OutrasOpm />
      <Logs />
      <LinksUteis />
    </q-list>
  </q-drawer>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

import MenuItem from 'components/_main/SideMenu/MenuItem.vue'
import SubMenu from 'components/_main/SideMenu/SubMenu.vue'
import ProcessosEProcedimentos from './Proc.vue'
import Apresentacao from './Apresentacao.vue'
import Relatorios from './Relatorios.vue'
import Busca from './Busca.vue'
import Correicoes from './Correicoes.vue'
import Policiais from './Policiais.vue'
import Sai from './Sai.vue'
import Bi from './BI.vue'
import Ajuda from './Ajuda.vue'
import Administracao from './Administracao.vue'
import Historia from './Historia.vue'
import OutrasOpm from './OutrasOPM.vue'
import Logs from './Logs.vue'
import LinksUteis from './Links.vue'

import { getMenu } from 'src/store/utils'

export default defineComponent({
  name: 'SideMenu',
  components: {
    MenuItem,
    SubMenu,
    ProcessosEProcedimentos,
    Apresentacao,
    Relatorios,
    Busca,
    Correicoes,
    Policiais,
    Sai,
    Bi,
    Ajuda,
    Administracao,
    Historia,
    OutrasOpm,
    Logs,
    LinksUteis
  },
  setup (_, { root }) {
    return {
      menu: computed({
        get: () => getMenu(root),
        set: () => root.$store.dispatch('configs/toogleMenu')
      })
    }
  }
})
</script>
