<template>
  <sub-menu class="bg-grey-10 text-white" icon="fa fa-taxi" group="menu" :content-inset-level="contentInsetLevel" label="SAI">
    <menu-item class="bg-grey-9 text-white" title="Policiais - Investigação" link="/sai"/>
  </sub-menu>
</template>

<script lang="ts">
import MenuItem from 'components/_main/SideMenu/MenuItem.vue'
import SubMenu from 'components/_main/SideMenu/SubMenu.vue'
import { defineComponent, ref } from '@vue/composition-api'

const MenuSai = defineComponent({
  name: 'MenuSai',
  components: { MenuItem, SubMenu },
  setup () {
    const contentInsetLevel = ref(0.4)
    return {
      contentInsetLevel
    }
  }
})

export default MenuSai
</script>
