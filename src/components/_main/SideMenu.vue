<template>
  <q-drawer
      v-model="menu"
      show-if-above
      bordered
      :content-class="$q.dark.isActive ? 'bg-grey-10' : 'bg-grey-10'"
    >
  <q-list class="rounded-borders" >
    <sub-menu class="bg-grey-10 text-white" icon="fa fa-balance-scale" group="menu" :content-inset-level="contentInsetLevel" label="Processos e Procedimentos">
      <sub-menu class="bg-grey-9 text-white" icon="fa fa-file-alt" group="submenu" :content-inset-level="contentInsetLevel" label="Processos">
        <menu-item class="bg-grey-8 text-white" title="Adl" link="/adl"/>
        <menu-item class="bg-grey-8 text-white" title="CD" link="/cd"/>
        <menu-item class="bg-grey-8 text-white" title="CJ" link="/cj"/>
        <menu-item class="bg-grey-8 text-white" title="FATD" link="/fatd"/>
        <menu-item class="bg-grey-8 text-white" title="PAD" link="/pad"/>
      </sub-menu>
      <sub-menu class="bg-grey-9 text-white" icon="far fa-file-alt" group="submenu" :content-inset-level="contentInsetLevel" label="Procedimentos">
        <menu-item class="bg-grey-8 text-white" title="APFD" link="/apfd"/>
        <menu-item class="bg-grey-8 text-white" title="Deserção" link="/desercao"/>
        <menu-item class="bg-grey-8 text-white" title="Exclusão" link="/exclusao"/>
        <menu-item class="bg-grey-8 text-white" title="IPM" link="/ipm"/>
        <menu-item class="bg-grey-8 text-white" title="ISO" link="/iso"/>
        <menu-item class="bg-grey-8 text-white" title="Proc. Outros" link="/proc_outros"/>
        <menu-item class="bg-grey-8 text-white" title="Recursos" link="/recursos"/>
        <menu-item class="bg-grey-8 text-white" title="Sindicância" link="/sindicancias/lista"/>
      </sub-menu>
    </sub-menu>
    <sub-menu class="bg-grey-10 text-white" icon="fa fa-balance-scale" group="menu" :content-inset-level="contentInsetLevel" label="Apresentação em Juízo">
      <menu-item class="bg-grey-9 text-white" title="Emails Agendados" link="/emails_agendados"/>
      <menu-item class="bg-grey-9 text-white" title="Notas COGER" link="/notas_coger"/>
      <menu-item class="bg-grey-9 text-white" title="Apresentações" link="/apresentacoes"/>
      <menu-item class="bg-grey-9 text-white" title="Locais" link="/locais"/>
      <menu-item class="bg-grey-9 text-white" title="Dados Unidade" link="/dados_unidade"/>
    </sub-menu>
    <sub-menu class="bg-grey-10 text-white" icon="fa fa-chart-line" group="menu" :content-inset-level="contentInsetLevel" label="Relatórios">
      <menu-item class="bg-grey-9 text-white" title="Pendências" link="/pendencias"/>
      <menu-item class="bg-grey-9 text-white" title="Pendências - Geral" link="/pendencias_geral"/>
      <menu-item class="bg-grey-9 text-white" title="Prioritários" link="/prioritarios"/>
      <menu-item class="bg-grey-9 text-white" title="Sobrestamentos" link="/sobrestamentos"/>
      <menu-item class="bg-grey-9 text-white" title="Processos" link="/processos"/>
      <menu-item class="bg-grey-9 text-white" title="Postos/Graduações" link="/postos_graduacoes"/>
      <menu-item class="bg-grey-9 text-white" title="Encarregados" link="/encarregados"/>
      <menu-item class="bg-grey-9 text-white" title="Defensores" link="/defensores"/>
      <menu-item class="bg-grey-9 text-white" title="Ofendidos" link="/ofendidos"/>
      <menu-item class="bg-grey-9 text-white" title="E-Protocolo" link="/eprotocolo"/>
      <sub-menu class="bg-grey-9 text-white" icon="perm_identity" group="submenu" :content-inset-level="contentInsetLevel" label="Específicos">
        <menu-item class="bg-grey-8 text-white" title="Assédio/Abuso Sexual" link="/abuso"/>
        <menu-item class="bg-grey-8 text-white" title="Violência Doméstica" link="/violencia_domestica"/>
      </sub-menu>
    </sub-menu>
    <sub-menu class="bg-grey-10 text-white" icon="fa fa-search" group="menu" :content-inset-level="contentInsetLevel" label="Busca">
      <menu-item class="bg-grey-9 text-white" title="PM" link="/busca_pm"/>
      <menu-item class="bg-grey-9 text-white" title="Nominal" link="/busca_nominal"/>
      <menu-item class="bg-grey-9 text-white" title="Ofendido" link="/busca_ofendido"/>
      <menu-item class="bg-grey-9 text-white" title="Envolvido" link="/busca_envolvido"/>
      <menu-item class="bg-grey-9 text-white" title="Tramitação" link="/busca_tramitacao"/>
      <menu-item class="bg-grey-9 text-white" title="Tramitação COGER" link="/busca_coger"/>
    </sub-menu>
    <sub-menu class="bg-grey-10 text-white" icon="fa fa-folder" group="menu" :content-inset-level="contentInsetLevel" label="Correições">
      <menu-item class="bg-grey-9 text-white" title="Ordinária" link="/correicao_ordinaria"/>
      <menu-item class="bg-grey-9 text-white" title="Extraordinária" link="/correicao_extraordinaria"/>
    </sub-menu>
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
    <sub-menu class="bg-grey-10 text-white" icon="fa fa-taxi" group="menu" :content-inset-level="contentInsetLevel" label="SAI">
      <menu-item class="bg-grey-9 text-white" title="Policiais - Investigação" link="/sai"/>
    </sub-menu>
    <sub-menu class="bg-grey-10 text-white" icon="fa fa-database" group="menu" :content-inset-level="contentInsetLevel" label="BI">
      <menu-item class="bg-grey-9 text-white" title="BI" link="/bi"/>
    </sub-menu>
    <sub-menu class="bg-grey-10 text-white" icon="fa fa-question-circle" group="menu" :content-inset-level="contentInsetLevel" label="Ajuda">
      <menu-item class="bg-grey-9 text-white" title="Manual do usuário" link="/manual"/>
      <menu-item class="bg-grey-9 text-white" title="Modificar senha" link="/modificar_senha"/>
    </sub-menu>
    <sub-menu class="bg-grey-10 text-white" icon="fa fa-cogs" group="menu" :content-inset-level="contentInsetLevel" label="Administração">
      <menu-item class="bg-grey-9 text-white" title="Usuários" link="/admin/usuarios"/>
      <menu-item class="bg-grey-9 text-white" title="Papéis" link="/admin/papeis"/>
      <menu-item class="bg-grey-9 text-white" title="Permissões" link="/admin/permissoes"/>
      <menu-item class="bg-grey-9 text-white" title="Controle SJD" link="/admin/sjds"/>
      <menu-item class="bg-grey-9 text-white" title="Termos de compromisso" link="/admin/termos"/>
      <menu-item class="bg-grey-9 text-white" title="Unidades" link="/admin/dados_unidade"/>
      <menu-item class="bg-grey-9 text-white" title="Feriados" link="/admin/feriados"/>
    </sub-menu>
    <menu-item class="bg-grey-10 text-white" title="História SISCOGER" icon="fa fa-quote-left" link="/historia"/>
    <sub-menu class="bg-grey-10 text-white" icon="fa fa-sync" group="menu" :content-inset-level="contentInsetLevel" label="Outras Unidades">
      <menu-item class="bg-grey-9 text-white" title="Listar outra OPM" link="/admin/listar_outra_opm"/>
      <menu-item class="bg-grey-9 text-white" title="Pendências Gerais" link="/admin/pendencias_gerais"/>
    </sub-menu>
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

    <menu-item class="bg-grey-10 text-white" title="Links úteis" icon="fa fa-link" link="/links_uteis"/>
  </q-list>
  </q-drawer>
</template>

<script lang="ts">
import MenuItem from 'components/_main/MenuItem.vue'
import SubMenu from 'components/_main/SubMenu.vue'
import { computed, defineComponent, ref } from '@vue/composition-api'
import { getMenu } from 'src/store/utils'

export default defineComponent({
  name: 'SideMenu',
  components: { MenuItem, SubMenu },
  setup (_, { root }) {
    const contentInsetLevel = ref(0.4)
    return { 
      contentInsetLevel,
      menu: computed({
        get: () => getMenu(root),
        set: () => root.$store.dispatch('configs/toogleMenu')
      })
    }
  }
})
</script>
