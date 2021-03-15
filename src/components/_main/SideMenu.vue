<template>
  <q-drawer
      v-model="menu"
      show-if-above
      bordered
      :content-class="$q.dark.isActive ? 'bg-grey-10' : 'bg-grey-10'"
    >
  <q-list class="rounded-borders text-white" >
    <sub-menu icon="fa fa-balance-scale" group="menu" :content-inset-level="contentInsetLevel" label="Processos e Procedimentos" v-if="acl({ roles: [], permissions: []})" class="bg-grey-10">
      <sub-menu icon="fa fa-file-alt" group="submenu" :content-inset-level="contentInsetLevel" label="Processos" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9">
        <menu-item title="Adl" link="/adl" v-if="acl(adlRules.toShow)" class="bg-grey-8"/>
        <menu-item title="CD" link="/cd" v-if="acl(cdRules.toShow)" class="bg-grey-8"/>
        <menu-item title="CJ" link="/cj" v-if="acl(cjRules.toShow)" class="bg-grey-8"/>
        <menu-item title="FATD" link="/fatd" v-if="acl(fatdRules.toShow)" class="bg-grey-8"/>
        <menu-item title="PAD" link="/pad" v-if="acl(padRules.toShow)" class="bg-grey-8"/>
      </sub-menu>
      <sub-menu icon="far fa-file-alt" group="submenu" :content-inset-level="contentInsetLevel" label="Procedimentos" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9">
        <menu-item title="APFD" link="/apfd" v-if="acl(apfdRules.toShow)" class="bg-grey-8"/>
        <menu-item title="Deserção" link="/desercao" v-if="acl(desercaoRules.toShow)" class="bg-grey-8"/>
        <menu-item title="Exclusão" link="/exclusao" v-if="acl(exclusaojudicialRules.toShow)" class="bg-grey-8"/>
        <menu-item title="IPM" link="/ipm" v-if="acl(ipmRules.toShow)" class="bg-grey-8"/>
        <menu-item title="ISO" link="/iso" v-if="acl(isoRules.toShow)" class="bg-grey-8"/>
        <menu-item title="Proc. Outros" link="/proc_outros" v-if="acl(procoutroRules.toShow)" class="bg-grey-8"/>
        <menu-item title="Sindicância" link="/sindicancias" v-if="acl(sindicanciaRules.toShow)" class="bg-grey-8"/>
      </sub-menu>
    </sub-menu>
    <menu-item title="Recursos" link="/recursos" v-if="acl(recursoRules.toShow)" class="bg-grey-10"/>
    <sub-menu icon="fa fa-balance-scale" group="menu" :content-inset-level="contentInsetLevel" label="Apresentação em Juízo" v-if="acl({ roles: [], permissions: []})" class="bg-grey-10">
      <menu-item title="Emails Agendados" link="/emails_agendados" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
      <menu-item title="Notas COGER" link="/notas_coger" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
      <menu-item title="Apresentações" link="/apresentacoes" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
      <menu-item title="Locais" link="/locais" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
      <menu-item title="Dados Unidade" link="/dados_unidade" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
    </sub-menu>
    <sub-menu icon="fa fa-chart-line" group="menu" :content-inset-level="contentInsetLevel" label="Relatórios" v-if="acl({ roles: [], permissions: []})" class="bg-grey-10">
      <menu-item title="Pendências" link="/" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
      <menu-item title="Pendências - Geral" link="/pendencias_geral" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
      <menu-item title="Prioritários" link="/prioritarios" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
      <menu-item title="Sobrestamentos" link="/sobrestamentos" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
      <menu-item title="Processos" link="/processos" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
      <menu-item title="Postos/Graduações" link="/postos_graduacoes" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
      <menu-item title="Encarregados" link="/encarregados" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
      <menu-item title="Defensores" link="/defensores" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
      <menu-item title="Ofendidos" link="/ofendidos" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
      <menu-item title="E-Protocolo" link="/eprotocolo" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
      <sub-menu icon="perm_identity" group="submenu" :content-inset-level="contentInsetLevel" label="Específicos" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9">
        <menu-item title="Assédio/Abuso Sexual" link="/abuso" v-if="acl({ roles: [], permissions: []})" class="bg-grey-8"/>
        <menu-item title="Violência Doméstica" link="/violencia_domestica" v-if="acl({ roles: [], permissions: []})" class="bg-grey-8"/>
      </sub-menu>
    </sub-menu>
    <sub-menu icon="fa fa-search" group="menu" :content-inset-level="contentInsetLevel" label="Busca" v-if="acl({ roles: [], permissions: []})" class="bg-grey-10">
      <menu-item title="PM" link="/busca_pm" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
      <menu-item title="Nominal" link="/busca_nominal" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
      <menu-item title="Ofendido" link="/busca_ofendido" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
      <menu-item title="Envolvido" link="/busca_envolvido" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
      <menu-item title="Tramitação" link="/busca_tramitacao" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
      <menu-item title="Tramitação COGER" link="/busca_coger" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
    </sub-menu>
    <sub-menu icon="fa fa-folder" group="menu" :content-inset-level="contentInsetLevel" label="Correições" v-if="acl({ roles: [], permissions: []})" class="bg-grey-10">
      <menu-item title="Ordinária" link="/correicao_ordinaria" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
      <menu-item title="Extraordinária" link="/correicao_extraordinaria" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
    </sub-menu>
    <sub-menu icon="fa fa-taxi" group="menu" :content-inset-level="contentInsetLevel" label="Policiais" v-if="acl({ roles: [], permissions: []})" class="bg-grey-10">
      <menu-item title="Ficha de Tramitação" link="/ficha_tramitacao" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
      <menu-item title="Medalhas" link="/policiais_medalhas" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
      <menu-item title="Elogios" link="/policiais_elogios" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
      <menu-item title="Excluídos" link="/policiais_excluidos" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
      <menu-item title="Punidos" link="/policiais_punidos" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
      <menu-item title="Reintegrados" link="/policiais_reintegrados" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
      <menu-item title="Denunciados" link="/policiais_denunciados" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
      <menu-item title="Presos PM/BM" link="/policiais_presos" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
      <menu-item title="Presos Outros" link="/presos_outros" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
      <menu-item title="Procedimentos" link="/policiais_procedimentos" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
      <menu-item title="Comportamento" link="/policiais_comportamentos" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
      <menu-item title="Respondendo" link="/policiais_respondendo" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
      <menu-item title="Restrições" link="/policiais_restricoes" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
      <menu-item title="Suspensos" link="/policiais_suspensos" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
      <menu-item title="Obitos e Lesões" link="/policiais_obitos_lesoes" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
      <menu-item title="Mortos e feridos" link="/policiais_mortos_feridos" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
    </sub-menu>
    <sub-menu icon="fa fa-taxi" group="menu" :content-inset-level="contentInsetLevel" label="SAI" v-if="acl({ roles: [], permissions: []})" class="bg-grey-10">
      <menu-item title="Policiais - Investigação" link="/sai" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
    </sub-menu>
    <sub-menu icon="fa fa-database" group="menu" :content-inset-level="contentInsetLevel" label="BI" v-if="acl({ roles: [], permissions: []})" class="bg-grey-10">
      <menu-item title="BI" link="/bi" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
    </sub-menu>
    <sub-menu icon="fa fa-question-circle" group="menu" :content-inset-level="contentInsetLevel" label="Ajuda" v-if="acl({ roles: [], permissions: []})" class="bg-grey-10">
      <menu-item title="Manual do usuário" link="/manual" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
      <menu-item title="Modificar senha" link="/modificar_senha" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
    </sub-menu>
    <sub-menu icon="fa fa-cogs" group="menu" :content-inset-level="contentInsetLevel" label="Administração" v-if="acl({ roles: [], permissions: []})" class="bg-grey-10">
      <menu-item title="Usuários" link="/admin/usuarios" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
      <menu-item title="Papéis" link="/admin/papeis" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
      <menu-item title="Permissões" link="/admin/permissoes" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
      <menu-item title="Controle SJD" link="/admin/sjds" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
      <menu-item title="Termos de compromisso" link="/admin/termos" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
      <menu-item title="Unidades" link="/admin/dados_unidade" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
      <menu-item title="Feriados" link="/admin/feriados" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
    </sub-menu>
    <menu-item title="História SISCOGER" icon="fa fa-quote-left" link="/historia" v-if="acl({ roles: [], permissions: []})" class="bg-grey-10"/>
    <sub-menu icon="fa fa-sync" group="menu" :content-inset-level="contentInsetLevel" label="Outras Unidades" v-if="acl({ roles: [], permissions: []})" class="bg-grey-10">
      <menu-item title="Listar outra OPM" link="/admin/listar_outra_opm" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
      <menu-item title="Pendências Gerais" link="/admin/pendencias_gerais" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9"/>
    </sub-menu>
    <sub-menu icon="fa fa-bug" group="menu" :content-inset-level="contentInsetLevel" label="LOGS" v-if="acl({ roles: [], permissions: []})" class="bg-grey-10">
      <sub-menu icon="fa fa-bug" group="submenu" :content-inset-level="contentInsetLevel" label="Processos/Procedimentos" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9">
        <menu-item title="ADL" link="/log/adl" v-if="acl({ roles: [], permissions: []})" class="bg-grey-8"/>
        <menu-item title="APFD" link="/log/apfd" v-if="acl({ roles: [], permissions: []})" class="bg-grey-8"/>
        <menu-item title="CD" link="/log/cd" v-if="acl({ roles: [], permissions: []})" class="bg-grey-8"/>
        <menu-item title="CJ" link="/log/cj" v-if="acl({ roles: [], permissions: []})" class="bg-grey-8"/>
        <menu-item title="Deserção" link="/log/desercao" v-if="acl({ roles: [], permissions: []})" class="bg-grey-8"/>
        <menu-item title="Exclusão" link="/log/exclusao" v-if="acl({ roles: [], permissions: []})" class="bg-grey-8"/>
        <menu-item title="FATD" link="/log/fatd" v-if="acl({ roles: [], permissions: []})" class="bg-grey-8"/>
        <menu-item title="IPM" link="/log/ipm" v-if="acl({ roles: [], permissions: []})" class="bg-grey-8"/>
        <menu-item title="ISO" link="/log/iso" v-if="acl({ roles: [], permissions: []})" class="bg-grey-8"/>
        <menu-item title="IT" link="/log/it" v-if="acl({ roles: [], permissions: []})" class="bg-grey-8"/>
        <menu-item title="Movimento" link="/log/movimento" v-if="acl({ roles: [], permissions: []})" class="bg-grey-8"/>
        <menu-item title="PAD" link="/log/pad" v-if="acl({ roles: [], permissions: []})" class="bg-grey-8"/>
        <menu-item title="Proc. Outros" link="/log/proc_outro" v-if="acl({ roles: [], permissions: []})" class="bg-grey-8"/>
        <menu-item title="Sindicância" link="/log/sindicancia" v-if="acl({ roles: [], permissions: []})" class="bg-grey-8"/>
        <menu-item title="Recurso" link="/log/recurso" v-if="acl({ roles: [], permissions: []})" class="bg-grey-8"/>
      </sub-menu>
      <sub-menu icon="fa fa-bug" group="submenu" :content-inset-level="contentInsetLevel" label="Apresentações em juizo" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9">
        <menu-item title="Notas COGER" link="/log/nota_coger" v-if="acl({ roles: [], permissions: []})" class="bg-grey-8"/>
        <menu-item title="Apresentação" link="/log/apresentacao" v-if="acl({ roles: [], permissions: []})" class="bg-grey-8"/>
        <menu-item title="Locais" link="/log/locais" v-if="acl({ roles: [], permissions: []})" class="bg-grey-8"/>
        <menu-item title="Email" link="/log/email" v-if="acl({ roles: [], permissions: []})" class="bg-grey-8"/>
      </sub-menu>
      <sub-menu icon="fa fa-bug" group="submenu" :content-inset-level="contentInsetLevel" label="Administração" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9">
        <menu-item title="Acessos" link="/log/acesso" v-if="acl({ roles: [], permissions: []})" class="bg-grey-8"/>
        <menu-item title="Apagado" link="/log/apagados" v-if="acl({ roles: [], permissions: []})" class="bg-grey-8"/>
        <menu-item title="Bloqueios" link="/log/bloqueios" v-if="acl({ roles: [], permissions: []})" class="bg-grey-8"/>
        <menu-item title="Papeis" link="/log/papeis" v-if="acl({ roles: [], permissions: []})" class="bg-grey-8"/>
        <menu-item title="Permissões" link="/log/permissoes" v-if="acl({ roles: [], permissions: []})" class="bg-grey-8"/>
        <menu-item title="Cadastro OPM COGER" link="/log/cadastro_opm_coger" v-if="acl({ roles: [], permissions: []})" class="bg-grey-8"/>
        <menu-item title="Feriados" link="/log/feriados" v-if="acl({ roles: [], permissions: []})" class="bg-grey-8"/>
        <menu-item title="Upload de Arquivos" link="/log/uploads" v-if="acl({ roles: [], permissions: []})" class="bg-grey-8"/>
      </sub-menu>
      <sub-menu icon="fa fa-bug" group="submenu" :content-inset-level="contentInsetLevel" label="Policiais" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9">
        <sub-menu icon="fa fa-bug" group="subsubmenu" :content-inset-level="contentInsetLevel" label="FDI" v-if="acl({ roles: [], permissions: []})" class="bg-grey-8">
          <menu-item title="Acesso FDI" link="/log/fdi" v-if="acl({ roles: [], permissions: []})" class="bg-grey-7"/>
          <menu-item title="Protocolo" link="/log/protocolo" v-if="acl({ roles: [], permissions: []})" class="bg-grey-7"/>
          <menu-item title="Comportamento PM" link="/log/comportamento_pm" v-if="acl({ roles: [], permissions: []})" class="bg-grey-7"/>
          <menu-item title="Denuncia Civil" link="/log/denuncia_civil" v-if="acl({ roles: [], permissions: []})" class="bg-grey-7"/>
          <menu-item title="Elogio" link="/log/elogio" v-if="acl({ roles: [], permissions: []})" class="bg-grey-7"/>
          <menu-item title="Restrição" link="/log/restricao" v-if="acl({ roles: [], permissions: []})" class="bg-grey-7"/>
          <menu-item title="Punição" link="/log/punicao" v-if="acl({ roles: [], permissions: []})" class="bg-grey-7"/>
          <menu-item title="Tramitação OPM" link="/log/tramitacao_opm" v-if="acl({ roles: [], permissions: []})" class="bg-grey-7"/>
          <menu-item title="Tramitação COGER" link="/log/tramitacao_coger" v-if="acl({ roles: [], permissions: []})" class="bg-grey-7"/>
          <menu-item title="Medalha" link="/log/medalha" v-if="acl({ roles: [], permissions: []})" class="bg-grey-7"/>
        </sub-menu>
        <sub-menu icon="fa fa-bug" group="subsubmenu" :content-inset-level="contentInsetLevel" label="Geral" v-if="acl({ roles: [], permissions: []})" class="bg-grey-9">
          <menu-item title="Reintegrado" link="/log/reintegrado" v-if="acl({ roles: [], permissions: []})" class="bg-grey-8"/>
          <menu-item title="Óbitos e lesões" link="/log/obitos_lesoes" v-if="acl({ roles: [], permissions: []})" class="bg-grey-8"/>
          <menu-item title="Preso" link="/log/preso" v-if="acl({ roles: [], permissions: []})" class="bg-grey-8"/>
          <menu-item title="SAI" link="/log/sai" v-if="acl({ roles: [], permissions: []})" class="bg-grey-8"/>
          <menu-item title="Suspenso" link="/log/suspenso" v-if="acl({ roles: [], permissions: []})" class="bg-grey-8"/>
        </sub-menu>
      </sub-menu>
    </sub-menu>

    <menu-item title="Links úteis" icon="fa fa-link" link="/links_uteis" v-if="acl({ roles: [], permissions: []})" class="bg-grey-10"/>
  </q-list>
  </q-drawer>
</template>

<script lang="ts">
import MenuItem from 'src/components/_main/MenuItem.vue'
import SubMenu from 'src/components/_main/SubMenu.vue'
import { computed, defineComponent, ref } from '@vue/composition-api'
import { getMenu } from 'src/store/utils'
import { acl as ACL } from 'src/services'
import {
  adlRules,
  andamentoRules,
  andamentocogerRules,
  apfdRules,
  arquivoRules,
  authRules,
  cdRules,
  cjRules,
  comportamentoRules,
  decorrenciaconselhoRules,
  denunciacivilRules,
  desercaoRules,
  envolvidoRules,
  exclusaojudicialRules,
  falecimentoRules,
  fatdRules,
  feriadoRules,
  gradacaoRules,
  ipmRules,
  isoRules,
  ligacaoRules,
  logRules,
  motivoconselhoRules,
  movimentoRules,
  ofendidoRules,
  padRules,
  pendenciaRules,
  permissionRules,
  pjRules,
  postoRules,
  presoRules,
  presotipoRules,
  procoutroRules,
  recursoRules,
  reintegradoRules,
  respcivilRules,
  restricaoRules,
  resultadoRules,
  roleRules,
  saiRules,
  saidiligenciaRules,
  situacaoRules,
  sobrestamentoRules,
  uploadRules,
  userRules,
  sindicanciaRules
} from 'src/rules'

export default defineComponent({
  name: 'SideMenu',
  components: { MenuItem, SubMenu },
  setup (_, { root }) {
    const contentInsetLevel = ref(0.4)

    function acl ({ roles, permissions }: { roles: string[], permissions: string[]}) {
      return ACL.hasAnyRoleOrPermission({ roles, permissions })
    }

    const rules = {
      adlRules,
      andamentoRules,
      andamentocogerRules,
      apfdRules,
      arquivoRules,
      authRules,
      cdRules,
      cjRules,
      comportamentoRules,
      decorrenciaconselhoRules,
      denunciacivilRules,
      desercaoRules,
      envolvidoRules,
      exclusaojudicialRules,
      falecimentoRules,
      fatdRules,
      feriadoRules,
      gradacaoRules,
      ipmRules,
      isoRules,
      ligacaoRules,
      logRules,
      motivoconselhoRules,
      movimentoRules,
      ofendidoRules,
      padRules,
      pendenciaRules,
      permissionRules,
      pjRules,
      postoRules,
      presoRules,
      presotipoRules,
      procoutroRules,
      recursoRules,
      reintegradoRules,
      respcivilRules,
      restricaoRules,
      resultadoRules,
      roleRules,
      saiRules,
      saidiligenciaRules,
      situacaoRules,
      sobrestamentoRules,
      uploadRules,
      userRules,
      sindicanciaRules
    }

    return {
      contentInsetLevel,
      acl,
      ...rules,
      menu: computed({
        get: () => getMenu(root),
        set: () => root.$store.dispatch('configs/toogleMenu')
      })
    }
  }
})
</script>
