<template>
  <sub-menu class="bg-grey-10 text-white" icon="fa fa-folder" group="menu" :content-inset-level="contentInsetLevel" label="Correições">
    <menu-item class="bg-grey-9 text-white" title="Ordinária" link="/correicao_ordinaria"/>
    <menu-item class="bg-grey-9 text-white" title="Extraordinária" link="/correicao_extraordinaria"/>
  </sub-menu>
</template>

<script lang="ts">
import MenuItem from 'components/_main/SideMenu/MenuItem.vue'
import SubMenu from 'components/_main/SideMenu/SubMenu.vue'
import { defineComponent, ref } from '@vue/composition-api'

const MenuCorreicoes = defineComponent({
  name: 'MenuCorreicoes',
  components: { MenuItem, SubMenu },
  setup () {
    const contentInsetLevel = ref(0.4)
    return {
      contentInsetLevel
    }
  }
})

export default MenuCorreicoes
</script>
