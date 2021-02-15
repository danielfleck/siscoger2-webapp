<template>
  <sub-menu class="bg-grey-10 text-white" icon="fa fa-balance-scale" group="menu" :content-inset-level="contentInsetLevel" label="Apresentação em Juízo">
    <menu-item class="bg-grey-9 text-white" title="Emails Agendados" link="/emails_agendados"/>
    <menu-item class="bg-grey-9 text-white" title="Notas COGER" link="/notas_coger"/>
    <menu-item class="bg-grey-9 text-white" title="Apresentações" link="/apresentacoes"/>
    <menu-item class="bg-grey-9 text-white" title="Locais" link="/locais"/>
    <menu-item class="bg-grey-9 text-white" title="Dados Unidade" link="/dados_unidade"/>
  </sub-menu>
</template>

<script lang="ts">
import MenuItem from 'components/_main/SideMenu/MenuItem.vue'
import SubMenu from 'components/_main/SideMenu/SubMenu.vue'
import { defineComponent, ref } from '@vue/composition-api'

const MenuApresentacao = defineComponent({
  name: 'MenuApresentacao',
  components: { MenuItem, SubMenu },
  setup () {
    const contentInsetLevel = ref(0.4)
    return {
      contentInsetLevel
    }
  }
})

export default MenuApresentacao
</script>
