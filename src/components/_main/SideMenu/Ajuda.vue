<template>
  <sub-menu class="bg-grey-10 text-white" icon="fa fa-question-circle" group="menu" :content-inset-level="contentInsetLevel" label="Ajuda">
    <menu-item class="bg-grey-9 text-white" title="Manual do usuário" link="/manual"/>
    <menu-item class="bg-grey-9 text-white" title="Modificar senha" link="/modificar_senha"/>
  </sub-menu>
</template>

<script lang="ts">
import MenuItem from 'components/_main/SideMenu/MenuItem.vue'
import SubMenu from 'components/_main/SideMenu/SubMenu.vue'
import { defineComponent, ref } from '@vue/composition-api'

const MenuAjuda = defineComponent({
  name: 'MenuAjuda',
  components: { MenuItem, SubMenu },
  setup () {
    const contentInsetLevel = ref(0.4)
    return {
      contentInsetLevel
    }
  }
})

export default MenuAjuda
</script>
