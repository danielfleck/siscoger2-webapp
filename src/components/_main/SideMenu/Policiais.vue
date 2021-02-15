<template>
  <sub-menu class="bg-grey-10 text-white" icon="fa fa-taxi" group="menu" :content-inset-level="contentInsetLevel" label="Policiais">
    <menu-item class="bg-grey-9 text-white" title="Ficha de Tramitação" link="/ficha_tramitacao"/>
    <menu-item class="bg-grey-9 text-white" title="Medalhas" link="/policiais_medalhas"/>
    <menu-item class="bg-grey-9 text-white" title="Elogios" link="/policiais_elogios"/>
    <menu-item class="bg-grey-9 text-white" title="Excluídos" link="/policiais_excluidos"/>
    <menu-item class="bg-grey-9 text-white" title="Punidos" link="/policiais_punidos"/>
    <menu-item class="bg-grey-9 text-white" title="Reintegrados" link="/policiais_reintegrados"/>
    <menu-item class="bg-grey-9 text-white" title="Denunciados" link="/policiais_denunciados"/>
    <menu-item class="bg-grey-9 text-white" title="Presos PM/BM" link="/policiais_presos"/>
    <menu-item class="bg-grey-9 text-white" title="Presos Outros" link="/presos_outros"/>
    <menu-item class="bg-grey-9 text-white" title="Procedimentos" link="/policiais_procedimentos"/>
    <menu-item class="bg-grey-9 text-white" title="Comportamento" link="/policiais_comportamentos"/>
    <menu-item class="bg-grey-9 text-white" title="Respondendo" link="/policiais_respondendo"/>
    <menu-item class="bg-grey-9 text-white" title="Restrições" link="/policiais_restricoes"/>
    <menu-item class="bg-grey-9 text-white" title="Suspensos" link="/policiais_suspensos"/>
    <menu-item class="bg-grey-9 text-white" title="Obitos e Lesões" link="/policiais_obitos_lesoes"/>',
    <menu-item class="bg-grey-9 text-white" title="Mortos e feridos" link="/policiais_mortos_feridos"/>'
  </sub-menu>
</template>

<script lang="ts">
import MenuItem from 'components/_main/SideMenu/MenuItem.vue'
import SubMenu from 'components/_main/SideMenu/SubMenu.vue'
import { defineComponent, ref } from '@vue/composition-api'

const MenuPoliciais = defineComponent({
  name: 'MenuPoliciais',
  components: { MenuItem, SubMenu },
  setup () {
    const contentInsetLevel = ref(0.4)
    return {
      contentInsetLevel
    }
  }
})

export default MenuPoliciais
</script>
