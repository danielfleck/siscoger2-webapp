<template>
  <sub-menu class="bg-grey-10 text-white" icon="fa fa-bug" group="menu" :content-inset-level="contentInsetLevel" label="LOGS">
    <sub-menu class="bg-grey-9 text-white" icon="fa fa-bug" group="submenu" :content-inset-level="contentInsetLevel" label="Processos/Procedimentos">
      <menu-item class="bg-grey-8 text-white" title="ADL" link="/log/adl"/>
      <menu-item class="bg-grey-8 text-white" title="APFD" link="/log/apfd"/>
      <menu-item class="bg-grey-8 text-white" title="CD" link="/log/cd"/>
      <menu-item class="bg-grey-8 text-white" title="CJ" link="/log/cj"/>
      <menu-item class="bg-grey-8 text-white" title="Deserção" link="/log/desercao"/>
      <menu-item class="bg-grey-8 text-white" title="Exclusão" link="/log/exclusao"/>
      <menu-item class="bg-grey-8 text-white" title="FATD" link="/log/fatd"/>
      <menu-item class="bg-grey-8 text-white" title="IPM" link="/log/ipm"/>
      <menu-item class="bg-grey-8 text-white" title="ISO" link="/log/iso"/>
      <menu-item class="bg-grey-8 text-white" title="IT" link="/log/it"/>
      <menu-item class="bg-grey-8 text-white" title="Movimento" link="/log/movimento"/>
      <menu-item class="bg-grey-8 text-white" title="PAD" link="/log/pad"/>
      <menu-item class="bg-grey-8 text-white" title="Proc. Outros" link="/log/proc_outro"/>
      <menu-item class="bg-grey-8 text-white" title="Sindicância" link="/log/sindicancia"/>
      <menu-item class="bg-grey-8 text-white" title="Recurso" link="/log/recurso"/>
    </sub-menu>
    <sub-menu class="bg-grey-9 text-white" icon="fa fa-bug" group="submenu" :content-inset-level="contentInsetLevel" label="Apresentações em juizo">
      <menu-item class="bg-grey-8 text-white" title="Notas COGER" link="/log/nota_coger"/>
      <menu-item class="bg-grey-8 text-white" title="Apresentação" link="/log/apresentacao"/>
      <menu-item class="bg-grey-8 text-white" title="Locais" link="/log/locais"/>
      <menu-item class="bg-grey-8 text-white" title="Email" link="/log/email"/>
    </sub-menu>
    <sub-menu class="bg-grey-9 text-white" icon="fa fa-bug" group="submenu" :content-inset-level="contentInsetLevel" label="Administração">
      <menu-item class="bg-grey-8 text-white" title="Acessos" link="/log/acesso"/>
      <menu-item class="bg-grey-8 text-white" title="Apagado" link="/log/apagados"/>
      <menu-item class="bg-grey-8 text-white" title="Bloqueios" link="/log/bloqueios"/>
      <menu-item class="bg-grey-8 text-white" title="Papeis" link="/log/papeis"/>
      <menu-item class="bg-grey-8 text-white" title="Permissões" link="/log/permissoes"/>
      <menu-item class="bg-grey-8 text-white" title="Cadastro OPM COGER" link="/log/cadastro_opm_coger"/>
      <menu-item class="bg-grey-8 text-white" title="Feriados" link="/log/feriados"/>
      <menu-item class="bg-grey-8 text-white" title="Upload de Arquivos" link="/log/uploads"/>
    </sub-menu>
    <sub-menu class="bg-grey-9 text-white" icon="fa fa-bug" group="submenu" :content-inset-level="contentInsetLevel" label="Policiais">
      <sub-menu class="bg-grey-8 text-white" icon="fa fa-bug" group="submenu" :content-inset-level="contentInsetLevel" label="FDI">
        <menu-item class="bg-grey-7 text-white" title="Acesso FDI" link="/log/fdi"/>
        <menu-item class="bg-grey-7 text-white" title="Protocolo" link="/log/protocolo"/>
        <menu-item class="bg-grey-7 text-white" title="Comportamento PM" link="/log/comportamento_pm"/>
        <menu-item class="bg-grey-7 text-white" title="Denuncia Civil" link="/log/denuncia_civil"/>
        <menu-item class="bg-grey-7 text-white" title="Elogio" link="/log/elogio"/>
        <menu-item class="bg-grey-7 text-white" title="Restrição" link="/log/restricao"/>
        <menu-item class="bg-grey-7 text-white" title="Punição" link="/log/punicao"/>
        <menu-item class="bg-grey-7 text-white" title="Tramitação OPM" link="/log/tramitacao_opm"/>
        <menu-item class="bg-grey-7 text-white" title="Tramitação COGER" link="/log/tramitacao_coger"/>
        <menu-item class="bg-grey-7 text-white" title="Medalha" link="/log/medalha"/>
      </sub-menu>
      <sub-menu class="bg-grey-9 text-white" icon="fa fa-bug" group="submenu" :content-inset-level="contentInsetLevel" label="Geral">
        <menu-item class="bg-grey-8 text-white" title="Reintegrado" link="/log/reintegrado"/>
        <menu-item class="bg-grey-8 text-white" title="Óbitos e lesões" link="/log/obitos_lesoes"/>
        <menu-item class="bg-grey-8 text-white" title="Preso" link="/log/preso"/>
        <menu-item class="bg-grey-8 text-white" title="SAI" link="/log/sai"/>
        <menu-item class="bg-grey-8 text-white" title="Suspenso" link="/log/suspenso"/>
      </sub-menu>
    </sub-menu>
  </sub-menu>
</template>

<script lang="ts">
import MenuItem from 'components/_main/SideMenu/MenuItem.vue'
import SubMenu from 'components/_main/SideMenu/SubMenu.vue'
import { defineComponent, ref } from '@vue/composition-api'

const MenuLogs = defineComponent({
  name: 'MenuLogs',
  components: { MenuItem, SubMenu },
  setup () {
    const contentInsetLevel = ref(0.4)
    return {
      contentInsetLevel
    }
  }
})

export default MenuLogs
</script>
