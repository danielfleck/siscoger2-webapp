<template>
  <menu-item class="bg-grey-10 text-white" title="Links úteis" icon="fa fa-link" link="/links_uteis"/>
</template>

<script lang="ts">
import MenuItem from 'components/_main/SideMenu/MenuItem.vue'
import SubMenu from 'components/_main/SideMenu/SubMenu.vue'
import { defineComponent, ref } from '@vue/composition-api'

const MenuLinks = defineComponent({
  name: 'MenuLinks',
  components: { MenuItem, SubMenu },
  setup () {
    const contentInsetLevel = ref(0.4)
    return {
      contentInsetLevel
    }
  }
})

export default MenuLinks
</script>
