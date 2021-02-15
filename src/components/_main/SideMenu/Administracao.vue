<template>
  <sub-menu class="bg-grey-10 text-white" icon="fa fa-cogs" group="menu" :content-inset-level="contentInsetLevel" label="Administração">
    <menu-item class="bg-grey-9 text-white" title="Usuários" link="/admin/usuarios"/>
    <menu-item class="bg-grey-9 text-white" title="Papéis" link="/admin/papeis"/>
    <menu-item class="bg-grey-9 text-white" title="Permissões" link="/admin/permissoes"/>
    <menu-item class="bg-grey-9 text-white" title="Controle SJD" link="/admin/sjds"/>
    <menu-item class="bg-grey-9 text-white" title="Termos de compromisso" link="/admin/termos"/>
    <menu-item class="bg-grey-9 text-white" title="Unidades" link="/admin/dados_unidade"/>
    <menu-item class="bg-grey-9 text-white" title="Feriados" link="/admin/feriados"/>
  </sub-menu>
</template>

<script lang="ts">
import MenuItem from 'components/_main/SideMenu/MenuItem.vue'
import SubMenu from 'components/_main/SideMenu/SubMenu.vue'
import { defineComponent, ref } from '@vue/composition-api'

const MenuAdministracao = defineComponent({
  name: 'MenuAdministracao',
  components: { MenuItem, SubMenu },
  setup () {
    const contentInsetLevel = ref(0.4)
    return {
      contentInsetLevel
    }
  }
})

export default MenuAdministracao
</script>
