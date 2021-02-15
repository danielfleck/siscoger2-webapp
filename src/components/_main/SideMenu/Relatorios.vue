<template>
  <sub-menu class="bg-grey-10 text-white" icon="fa fa-chart-line" group="menu" :content-inset-level="contentInsetLevel" label="Relatórios">
    <menu-item class="bg-grey-9 text-white" title="Pendências" link="/pendencias"/>
    <menu-item class="bg-grey-9 text-white" title="Pendências - Geral" link="/pendencias_geral"/>
    <menu-item class="bg-grey-9 text-white" title="Prioritários" link="/prioritarios"/>
    <menu-item class="bg-grey-9 text-white" title="Sobrestamentos" link="/sobrestamentos"/>
    <menu-item class="bg-grey-9 text-white" title="Processos" link="/processos"/>
    <menu-item class="bg-grey-9 text-white" title="Postos/Graduações" link="/postos_graduacoes"/>
    <menu-item class="bg-grey-9 text-white" title="Encarregados" link="/encarregados"/>
    <menu-item class="bg-grey-9 text-white" title="Defensores" link="/defensores"/>
    <menu-item class="bg-grey-9 text-white" title="Ofendidos" link="/ofendidos"/>
    <menu-item class="bg-grey-9 text-white" title="E-Protocolo" link="/eprotocolo"/>
    <sub-menu class="bg-grey-9 text-white" icon="perm_identity" group="submenu" :content-inset-level="contentInsetLevel" label="Específicos">
      <menu-item class="bg-grey-8 text-white" title="Assédio/Abuso Sexual" link="/abuso"/>
      <menu-item class="bg-grey-8 text-white" title="Violência Doméstica" link="/violencia_domestica"/>
    </sub-menu>
  </sub-menu>
</template>

<script lang="ts">
import MenuItem from 'components/_main/SideMenu/MenuItem.vue'
import SubMenu from 'components/_main/SideMenu/SubMenu.vue'
import { defineComponent, ref } from '@vue/composition-api'

const MenuRelatorios = defineComponent({
  name: 'MenuRelatorios',
  components: { MenuItem, SubMenu },
  setup () {
    const contentInsetLevel = ref(0.4)
    return {
      contentInsetLevel
    }
  }
})

export default MenuRelatorios
</script>
