<template>
  <sub-menu class="bg-grey-10 text-white" icon="fa fa-search" group="menu" :content-inset-level="contentInsetLevel" label="Busca">
    <menu-item class="bg-grey-9 text-white" title="PM" link="/busca_pm"/>
    <menu-item class="bg-grey-9 text-white" title="Nominal" link="/busca_nominal"/>
    <menu-item class="bg-grey-9 text-white" title="Ofendido" link="/busca_ofendido"/>
    <menu-item class="bg-grey-9 text-white" title="Envolvido" link="/busca_envolvido"/>
    <menu-item class="bg-grey-9 text-white" title="Tramitação" link="/busca_tramitacao"/>
    <menu-item class="bg-grey-9 text-white" title="Tramitação COGER" link="/busca_coger"/>
  </sub-menu>
</template>

<script lang="ts">
import MenuItem from 'components/_main/SideMenu/MenuItem.vue'
import SubMenu from 'components/_main/SideMenu/SubMenu.vue'
import { defineComponent, ref } from '@vue/composition-api'

const MenuBusca = defineComponent({
  name: 'MenuBusca',
  components: { MenuItem, SubMenu },
  setup () {
    const contentInsetLevel = ref(0.4)
    return {
      contentInsetLevel
    }
  }
})

export default MenuBusca
</script>
