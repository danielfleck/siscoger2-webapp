<template>
  <menu-item class="bg-grey-10 text-white" title="História SISCOGER" icon="fa fa-quote-left" link="/historia"/>
</template>

<script lang="ts">
import MenuItem from 'components/_main/SideMenu/MenuItem.vue'
import SubMenu from 'components/_main/SideMenu/SubMenu.vue'
import { defineComponent, ref } from '@vue/composition-api'

const MenuHistoria = defineComponent({
  name: 'MenuHistoria',
  components: { MenuItem, SubMenu },
  setup () {
    const contentInsetLevel = ref(0.4)
    return {
      contentInsetLevel
    }
  }
})

export default MenuHistoria
</script>
