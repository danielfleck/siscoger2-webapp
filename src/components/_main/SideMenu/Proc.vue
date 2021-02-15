<template>
  <sub-menu class="bg-grey-10 text-white" icon="fa fa-balance-scale" group="menu" :content-inset-level="contentInsetLevel" label="Processos e Procedimentos">
    <sub-menu class="bg-grey-9 text-white" icon="fa fa-file-alt" group="submenu" :content-inset-level="contentInsetLevel" label="Processos">
      <menu-item class="bg-grey-8 text-white" title="Adl" link="/adl"/>
      <menu-item class="bg-grey-8 text-white" title="CD" link="/cd"/>
      <menu-item class="bg-grey-8 text-white" title="CJ" link="/cj"/>
      <menu-item class="bg-grey-8 text-white" title="FATD" link="/fatd"/>
      <menu-item class="bg-grey-8 text-white" title="PAD" link="/pad"/>
    </sub-menu>
    <sub-menu class="bg-grey-9 text-white" icon="far fa-file-alt" group="submenu" :content-inset-level="contentInsetLevel" label="Procedimentos">
      <menu-item class="bg-grey-8 text-white" title="APFD" link="/apfd"/>
      <menu-item class="bg-grey-8 text-white" title="Deserção" link="/desercao"/>
      <menu-item class="bg-grey-8 text-white" title="Exclusão" link="/exclusao"/>
      <menu-item class="bg-grey-8 text-white" title="IPM" link="/ipm"/>
      <menu-item class="bg-grey-8 text-white" title="ISO" link="/iso"/>
      <menu-item class="bg-grey-8 text-white" title="Proc. Outros" link="/proc_outros"/>
      <menu-item class="bg-grey-8 text-white" title="Recursos" link="/recursos"/>
      <menu-item class="bg-grey-8 text-white" title="Sindicância" link="/sindicancias/lista"/>
    </sub-menu>
  </sub-menu>
</template>

<script lang="ts">
import MenuItem from 'components/_main/SideMenu/MenuItem.vue'
import SubMenu from 'components/_main/SideMenu/SubMenu.vue'
import { defineComponent, ref } from '@vue/composition-api'

const MenuProc = defineComponent({
  name: 'MenuProc',
  components: { MenuItem, SubMenu },
  setup () {
    const contentInsetLevel = ref(0.4)
    return {
      contentInsetLevel
    }
  }
})

export default MenuProc
</script>
