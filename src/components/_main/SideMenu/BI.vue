<template>
  <sub-menu class="bg-grey-10 text-white" icon="fa fa-database" group="menu" :content-inset-level="contentInsetLevel" label="BI">
    <menu-item class="bg-grey-9 text-white" title="BI" link="/bi"/>
  </sub-menu>
</template>

<script lang="ts">
import MenuItem from 'components/_main/SideMenu/MenuItem.vue'
import SubMenu from 'components/_main/SideMenu/SubMenu.vue'
import { defineComponent, ref } from '@vue/composition-api'

const MenuBI = defineComponent({
  name: 'MenuBI',
  components: { MenuItem, SubMenu },
  setup () {
    const contentInsetLevel = ref(0.4)
    return {
      contentInsetLevel
    }
  }
})

export default MenuBI
</script>
