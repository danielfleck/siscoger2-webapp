<template>
  <q-drawer
      v-model="menu"
      show-if-above
      bordered
      :content-class="$q.dark.isActive ? 'bg-grey-10' : 'bg-grey-10'"
    >
  <q-list class="rounded-borders text-white" >
    <sub-menu icon="fa fa-balance-scale" group="menu" :content-inset-level="contentInsetLevel" label="Processos e Procedimentos" v-if="acl(processosProcedimentosGroupRules)" class="bg-grey-10">
      <sub-menu icon="fa fa-file-alt" group="submenu" :content-inset-level="contentInsetLevel" label="Processos" v-if="acl(processosGroupRules)" class="bg-grey-9">
        <menu-item title="Adl" :link="`/${adlRoute}`" v-if="acl(adlRules.toShow)" class="bg-grey-8"/>
        <menu-item title="CD" :link="`/${cdRoute}`" v-if="acl(cdRules.toShow)" class="bg-grey-8"/>
        <menu-item title="CJ" :link="`/${cjRoute}`" v-if="acl(cjRules.toShow)" class="bg-grey-8"/>
        <menu-item title="FATD" :link="`/${fatdRoute}`" v-if="acl(fatdRules.toShow)" class="bg-grey-8"/>
        <menu-item title="PAD" :link="`/${padRoute}`" v-if="acl(padRules.toShow)" class="bg-grey-8"/>
      </sub-menu>
      <sub-menu icon="far fa-file-alt" group="submenu" :content-inset-level="contentInsetLevel" label="Procedimentos" v-if="acl(procedimentosGroupRules)" class="bg-grey-9">
        <menu-item title="APFD" :link="`/${apfdRoute}`" v-if="acl(apfdRules.toShow)" class="bg-grey-8"/>
        <menu-item title="Deserção" :link="`/${desercaoRoute}`" v-if="acl(desercaoRules.toShow)" class="bg-grey-8"/>
        <menu-item title="Exclusão" :link="`/${exclusaojudicialRoute}`" v-if="acl(exclusaojudicialRules.toShow)" class="bg-grey-8"/>
        <menu-item title="IPM" :link="`/${ipmRoute}`" v-if="acl(ipmRules.toShow)" class="bg-grey-8"/>
        <menu-item title="ISO" :link="`/${isoRoute}`" v-if="acl(isoRules.toShow)" class="bg-grey-8"/>
        <menu-item title="Proc. Outros" :link="`/${procoutrosRoute}`" v-if="acl(procoutroRules.toShow)" class="bg-grey-8"/>
        <menu-item title="Sindicância" :link="`/${sindicanciaRoute}`" v-if="acl(sindicanciaRules.toShow)" class="bg-grey-8"/>
      </sub-menu>
    </sub-menu>
    <menu-item title="Recursos" :link="`/${recursoRoute}`" v-if="acl(recursoRules.toShow)" class="bg-grey-10"/>
    <sub-menu icon="fa fa-balance-scale" group="menu" :content-inset-level="contentInsetLevel" label="Apresentação em Juízo" v-if="acl(apresentacaoEmJuizoGroup)" class="bg-grey-10">
      <menu-item title="Emails Agendados" :link="`/${emailagendadoRoute}`" v-if="acl(emailagendadoRules.toShow)" class="bg-grey-9"/>
      <menu-item title="Notas COGER" :link="`/${notacogerRoute}`" v-if="acl(notacogeRules.toShow)" class="bg-grey-9"/>
      <menu-item title="Apresentações" :link="`/${apresentacaoRoute}`" v-if="acl(apresentacaoRules.toShow)" class="bg-grey-9"/>
      <menu-item title="Locais" :link="`/${localapresentacaoRoute}`" v-if="acl(localapresentacaoRules.toShow)" class="bg-grey-9"/>
      <menu-item title="Dados Unidade" :link="`/${dadosunidadeRoute}`" v-if="acl(dadosunidadeRules.toShow)" class="bg-grey-9"/>
    </sub-menu>
    <sub-menu icon="fa fa-chart-line" group="menu" :content-inset-level="contentInsetLevel" label="Relatórios" v-if="acl(relatoriosGroupRules)" class="bg-grey-10">
      <menu-item title="Pendências" :link="`/${homeRoute}`" class="bg-grey-9"/>
      <menu-item title="Pendências - Geral" :link="`/${pendenciasgeralRoute}`" v-if="acl(pendenciasgeralRules.toShow)" class="bg-grey-9"/>
      <menu-item title="Prioritários" :link="`/${prioritarioRoute}`" v-if="acl(prioritarioRules.toShow)" class="bg-grey-9"/>
      <menu-item title="Sobrestamentos" :link="`/${sobrestamentoRoute}`" v-if="acl(sobrestamentoRules.toShow)" class="bg-grey-9"/>
      <menu-item title="Processos" :link="`/${processoRoute}`" v-if="acl(processoRules.toShow)" class="bg-grey-9"/>
      <menu-item title="Postos/Graduações" :link="`/${postosgraduacaoRoute}`" v-if="acl(postosgraduacaoRules.toShow)" class="bg-grey-9"/>
      <menu-item title="Encarregados" :link="`/${encarregadoRoute}`" v-if="acl(encarregadoRules.toShow)" class="bg-grey-9"/>
      <menu-item title="Defensores" :link="`/${defensorRoute}`" v-if="acl(defensorRules.toShow)" class="bg-grey-9"/>
      <menu-item title="Ofendidos" :link="`/${ofendidoRoute}`" v-if="acl(ofendidoRules.toShow)" class="bg-grey-9"/>
      <menu-item title="E-Protocolo" :link="`/${eprotocoloRoute}`" v-if="acl(eprotocoloRules.toShow)" class="bg-grey-9"/>
      <sub-menu icon="permidentity" group="submenu" :content-inset-level="contentInsetLevel" label="Específicos" class="bg-grey-9">
        <menu-item title="Assédio/Abuso Sexual" :link="`/${abusoRoute}`" class="bg-grey-8"/>
        <menu-item title="Violência Doméstica" :link="`/${violenciadomesticaRoute}`" class="bg-grey-8"/>
      </sub-menu>
    </sub-menu>
    <sub-menu icon="fa fa-search" group="menu" :content-inset-level="contentInsetLevel" label="Busca" v-if="acl(buscasGroupRules)" class="bg-grey-10">
      <menu-item title="PM" :link="`/${buscapmRoute}`" v-if="acl(buscapmRules.toShow)" class="bg-grey-9"/>
      <menu-item title="Nominal" :link="`/${buscanominalRoute}`" v-if="acl(buscanominalRules.toShow)" class="bg-grey-9"/>
      <menu-item title="Ofendido" :link="`/${buscaofendidoRoute}`" v-if="acl(buscaofendidoRules.toShow)" class="bg-grey-9"/>
      <menu-item title="Envolvido" :link="`/${buscaenvolvidoRoute}`" v-if="acl(buscaenvolvidoRules.toShow)" class="bg-grey-9"/>
      <menu-item title="Tramitação" :link="`/${buscatramitacaoRoute}`" v-if="acl(buscatramitacaoRules.toShow)" class="bg-grey-9"/>
      <menu-item title="Tramitação COGER" :link="`/${buscacogerRoute}`" v-if="acl(buscacogerRules.toShow)" class="bg-grey-9"/>
    </sub-menu>
    <sub-menu icon="fa fa-folder" group="menu" :content-inset-level="contentInsetLevel" label="Correições" v-if="acl(correicoesGroupRules)" class="bg-grey-10">
      <menu-item title="Ordinária" :link="`/${correicaoordinariaRoute}`" v-if="acl(correicaoordinariaRules.toShow)" class="bg-grey-9"/>
      <menu-item title="Extraordinária" :link="`/${correicaoextraordinariaRoute}`" v-if="acl(correicaoextraordinariaRules.toShow)" class="bg-grey-9"/>
    </sub-menu>
    <sub-menu icon="fa fa-taxi" group="menu" :content-inset-level="contentInsetLevel" label="Policiais" v-if="acl(policiaisGroupRules)" class="bg-grey-10">
      <menu-item title="Ficha de Tramitação" :link="`/${fdiRoute}`" v-if="acl(fdiRules.toShow)" class="bg-grey-9"/>
      <menu-item title="Medalhas" :link="`/${policialmedalhaRoute}`" v-if="acl(policialmedalhaRules.toShow)" class="bg-grey-9"/>
      <menu-item title="Elogios" :link="`/${policialelogioRoute}`" v-if="acl(policialelogioRules.toShow)" class="bg-grey-9"/>
      <menu-item title="Excluídos" :link="`/${policialexcluidoRoute}`" v-if="acl(policialexcluidoRules.toShow)" class="bg-grey-9"/>
      <menu-item title="Punidos" :link="`/${policialpunidoRoute}`" v-if="acl(policialpunidoRules.toShow)" class="bg-grey-9"/>
      <menu-item title="Reintegrados" :link="`/${policialreintegradoRoute}`" v-if="acl(policialreintegradoRules.toShow)" class="bg-grey-9"/>
      <menu-item title="Denunciados" :link="`/${policialdenunciadoRoute}`" v-if="acl(policialdenunciadoRules.toShow)" class="bg-grey-9"/>
      <menu-item title="Presos PM/BM" :link="`/${policialpresoRoute}`" v-if="acl(policialpresoRules.toShow)" class="bg-grey-9"/>
      <menu-item title="Presos Outros" :link="`/${presosoutrosRoute}`" v-if="acl(presosoutrosRules.toShow)" class="bg-grey-9"/>
      <menu-item title="Procedimentos" :link="`/${policialprocedimentoRoute}`" v-if="acl(policialprocedimentoRules.toShow)" class="bg-grey-9"/>
      <menu-item title="Comportamento" :link="`/${policialcomportamentoRoute}`" v-if="acl(policialcomportamentoRules.toShow)" class="bg-grey-9"/>
      <menu-item title="Respondendo" :link="`/${policialrespondendoRoute}`" v-if="acl(policialrespondendoRules.toShow)" class="bg-grey-9"/>
      <menu-item title="Restrições" :link="`/${policialrestricaoRoute}`" v-if="acl(policialrestricaoRules.toShow)" class="bg-grey-9"/>
      <menu-item title="Suspensos" :link="`/${policialsuspensoRoute}`" v-if="acl(policialsuspensoRules.toShow)" class="bg-grey-9"/>
      <menu-item title="Obitos e Lesões" :link="`/${falecimentoRoute}`" v-if="acl(falecimentoRules.toShow)" class="bg-grey-9"/>
    </sub-menu>
    <sub-menu icon="fa fa-taxi" group="menu" :content-inset-level="contentInsetLevel" label="SAI" v-if="acl(saiRules.toShow)" class="bg-grey-10">
      <menu-item title="Policiais - Investigação" :link="`/${saiRoute}`" v-if="acl(saiRules.toShow)" class="bg-grey-9"/>
    </sub-menu>
    <sub-menu icon="fa fa-database" group="menu" :content-inset-level="contentInsetLevel" label="BI" v-if="acl(biRules.toShow)" class="bg-grey-10">
      <menu-item title="BI" :link="`/${biRoute}`" v-if="acl(biRules.toShow)" class="bg-grey-9"/>
    </sub-menu>
    <sub-menu icon="fa fa-question-circle" group="menu" :content-inset-level="contentInsetLevel" label="Ajuda" v-if="ajudaGroupRules" class="bg-grey-10">
      <menu-item title="Manual do usuário" :link="`/${manualRoute}`" v-if="acl(manualRules.toShow)" class="bg-grey-9"/>
      <menu-item title="Modificar senha" :link="`/${modificarsenhaRoute}`" v-if="acl(modificarsenhaRules.toShow)" class="bg-grey-9"/>
    </sub-menu>
    <sub-menu icon="fa fa-cogs" group="menu" :content-inset-level="contentInsetLevel" label="Administração" v-if="acl(administracaoGroupRules)" class="bg-grey-10">
      <menu-item title="Usuários" :link="`/admin/${userRoute}`" v-if="acl(userRules.toShow)" class="bg-grey-9"/>
      <menu-item title="Papéis" :link="`/admin/${roleRoute}`" v-if="acl(roleRules.toShow)" class="bg-grey-9"/>
      <menu-item title="Permissões" :link="`/admin/${permissionRoute}`" v-if="acl(permissionRules.toShow)" class="bg-grey-9"/>
      <menu-item title="Controle SJD" :link="`/admin/${sjdRoute}`" v-if="acl(sjdRules.toShow)" class="bg-grey-9"/>
      <menu-item title="Termos de compromisso" :link="`/admin/${termoRoute}`" v-if="acl(termoRules.toShow)" class="bg-grey-9"/>
      <menu-item title="Unidades" :link="`/admin/${dadosunidadeRoute}`" v-if="acl(dadosunidadeRules.toShow)" class="bg-grey-9"/>
      <menu-item title="Feriados" :link="`/admin/${feriadoRoute}`" v-if="acl(feriadoRules.toShow)" class="bg-grey-9"/>
    </sub-menu>
    <menu-item title="História SISCOGER" icon="fa fa-quote-left" :link="`/${historiaRoute}`" v-if="acl(historiaRules.toShow)" class="bg-grey-10"/>
    <sub-menu icon="fa fa-sync" group="menu" :content-inset-level="contentInsetLevel" label="Outras Unidades" class="bg-grey-10">
      <menu-item title="Listar outra OPM" :link="`/admin/${listaroutraOpm}`" v-if="acl(listaroutaRules.toShow)" class="bg-grey-9"/>
      <menu-item title="Pendências Gerais" :link="`/admin/${pendenciasRoute}`" v-if="acl(pendenciaRules.toShow)" class="bg-grey-9"/>
    </sub-menu>
    <sub-menu icon="fa fa-bug" group="menu" :content-inset-level="contentInsetLevel" label="LOGS" v-if="acl(logGroupRules)" class="bg-grey-10">
      <sub-menu icon="fa fa-bug" group="submenu" :content-inset-level="contentInsetLevel" label="Processos/Procedimentos" v-if="acl(logProcessosProcedimentosGroupRules)" class="bg-grey-9">
        <menu-item title="ADL" :link="`/log/${adlRoute}`" v-if="acl(adlRules.toShow)" class="bg-grey-8"/>
        <menu-item title="APFD" :link="`/log/${apfdRoute}`" v-if="acl(apfdRules.toShow)" class="bg-grey-8"/>
        <menu-item title="CD" :link="`/log/${cdRoute}`" v-if="acl(cdRules.toShow)" class="bg-grey-8"/>
        <menu-item title="CJ" :link="`/log/${cjRoute}`" v-if="acl(cjRules.toShow)" class="bg-grey-8"/>
        <menu-item title="Deserção" :link="`/log/${desercaoRoute}`" v-if="acl(desercaoRules.toShow)" class="bg-grey-8"/>
        <menu-item title="Exclusão" :link="`/log/${exclusaojudicialRoute}`" v-if="acl(exclusaojudicialRules.toShow)" class="bg-grey-8"/>
        <menu-item title="FATD" :link="`/log/${fatdRoute}`" v-if="acl(fatdRules.toShow)" class="bg-grey-8"/>
        <menu-item title="IPM" :link="`/log/${ipmRoute}`" v-if="acl(ipmRules.toShow)" class="bg-grey-8"/>
        <menu-item title="ISO" :link="`/log/${isoRoute}`" v-if="acl(isoRules.toShow)" class="bg-grey-8"/>
        <menu-item title="IT" :link="`/log/${itRoute}`" v-if="acl(itRules.toShow)" class="bg-grey-8"/>
        <menu-item title="Movimento" :link="`/log/${movimentoRoute}`" v-if="acl(movimentoRules.toShow)" class="bg-grey-8"/>
        <menu-item title="PAD" :link="`/log/${padRoute}`" v-if="acl(padRules.toShow)" class="bg-grey-8"/>
        <menu-item title="Proc. Outros" :link="`/log/${procoutroRoute}`" v-if="acl(procoutroRules.toShow)" class="bg-grey-8"/>
        <menu-item title="Sindicância" :link="`/log/${sindicanciaRoute}`" v-if="acl(sindicanciaRules.toShow)" class="bg-grey-8"/>
        <menu-item title="Recurso" :link="`/log/${recursoRoute}`" v-if="acl(recursoRules.toShow)" class="bg-grey-8"/>
      </sub-menu>
      <sub-menu icon="fa fa-bug" group="submenu" :content-inset-level="contentInsetLevel" label="Apresentações em juizo" v-if="acl(logApresentacaoGroupRules)" class="bg-grey-9">
        <menu-item title="Notas COGER" :link="`/log/${notacogerRoute}`" v-if="acl(notacogerRules.toShow)" class="bg-grey-8"/>
        <menu-item title="Apresentação" :link="`/log/${apresentacaoRoute}`" v-if="acl(apresentacaoRules.toShow)" class="bg-grey-8"/>
        <menu-item title="Locais" :link="`/log/${locaisRoute}`" v-if="acl(locaisRules.toShow)" class="bg-grey-8"/>
        <menu-item title="Email" :link="`/log/${emailRoute}`" v-if="acl(emailRules.toShow)" class="bg-grey-8"/>
      </sub-menu>
      <sub-menu icon="fa fa-bug" group="submenu" :content-inset-level="contentInsetLevel" label="Administração" v-if="acl(logAdministracaoGroupRules)" class="bg-grey-9">
        <menu-item title="Acessos" :link="`/log/${acessoRoute}`" v-if="acl(acessoRules.toShow)" class="bg-grey-8"/>
        <menu-item title="Bloqueios" :link="`/log/${bloqueioRoute}`" v-if="acl(bloqueioRules.toShow)" class="bg-grey-8"/>
        <menu-item title="Papeis" :link="`/log/${roleRoute}`" v-if="acl(roleRules.toShow)" class="bg-grey-8"/>
        <menu-item title="Permissões" :link="`/log/${permissionRoute}`" v-if="acl(permissionRules.toShow)" class="bg-grey-8"/>
        <menu-item title="Cadastro OPM COGER" :link="`/log/${cadastroopmcogerRoute}`" v-if="acl(cadastroopmcogerRules.toShow)" class="bg-grey-8"/>
        <menu-item title="Feriados" :link="`/log/${feriadoRoute}`" v-if="acl(feriadoRules.toShow)" class="bg-grey-8"/>
        <menu-item title="Upload de Arquivos" :link="`/log/${uploadRoute}`" v-if="acl(uploadRules.toShow)" class="bg-grey-8"/>
      </sub-menu>
      <sub-menu icon="fa fa-bug" group="submenu" :content-inset-level="contentInsetLevel" label="Policiais" v-if="acl(logPoliciaisGroupRules)" class="bg-grey-9">
        <sub-menu icon="fa fa-bug" group="subsubmenu" :content-inset-level="contentInsetLevel" label="FDI" v-if="acl(logFDIGroupRules)" class="bg-grey-8">
          <menu-item title="Acesso FDI" :link="`/log/${fdiRoute}`" v-if="acl(fdiRules.toShow)" class="bg-grey-7"/>
          <menu-item title="Protocolo" :link="`/log/${policialeprotocoloRoute}`" v-if="acl(policialeprotocoloRules.toShow)" class="bg-grey-7"/>
          <menu-item title="Comportamento PM" :link="`/log/${policialcomportamentoRoute}`" v-if="acl(policialcomportamentoRules.toShow)" class="bg-grey-7"/>
          <menu-item title="Denuncia Civil" :link="`/log/${denunciacivilRoute}`" v-if="acl(denunciacivilRules.toShow)" class="bg-grey-7"/>
          <menu-item title="Elogio" :link="`/log/${policialelogioRoute}`" v-if="acl(policialelogioRules.toShow)" class="bg-grey-7"/>
          <menu-item title="Restrição" :link="`/log/${policialrestricaoRoute}`" v-if="acl(policialrestricaoRules.toShow)" class="bg-grey-7"/>
          <menu-item title="Punição" :link="`/log/${policialpunidoRoute}`" v-if="acl(policialpunidoRules.toShow)" class="bg-grey-7"/>
          <menu-item title="Tramitação OPM" :link="`/log/${tramitacaoopmRoute}`" v-if="acl(tramitacaoopmRules.toShow)" class="bg-grey-7"/>
          <menu-item title="Tramitação COGER" :link="`/log/${tramitacaocogerRoute}`" v-if="acl(tramitacaocogerRules.toShow)" class="bg-grey-7"/>
          <menu-item title="Medalha" :link="`/log/${policialmedalhaRoute}`" v-if="acl(policialmedalhaRules.toShow)" class="bg-grey-7"/>
        </sub-menu>
        <sub-menu icon="fa fa-bug" group="subsubmenu" :content-inset-level="contentInsetLevel" label="Geral" v-if="acl(logPoliciaisGeralGroupRules)" class="bg-grey-9">
          <menu-item title="Reintegrado" :link="`/log/${reintegradoRoute}`" v-if="acl(reintegradoRules.toShow)" class="bg-grey-8"/>
          <menu-item title="Óbitos e lesões" :link="`/log/${falecimentoRoute}`" v-if="acl(falecimentoRules.toShow)" class="bg-grey-8"/>
          <menu-item title="Preso" :link="`/log/${presoRoute}`" v-if="acl(presoRules.toShow)" class="bg-grey-8"/>
          <menu-item title="SAI" :link="`/log/${saiRoute}`" v-if="acl(saiRules.toShow)" class="bg-grey-8"/>
          <menu-item title="Suspenso" :link="`/log/${policialsuspensoRoute}`" v-if="acl(policialsuspensoRules.toShow)" class="bg-grey-8"/>
        </sub-menu>
      </sub-menu>
    </sub-menu>

    <menu-item title="Links úteis" icon="fa fa-link" :link="`/${linksuteisRoute}`" class="bg-grey-10"/>
  </q-list>
  </q-drawer>
</template>

<script lang="ts">
import MenuItem from 'src/components/main/MenuItem.vue'
import SubMenu from 'src/components/main/SubMenu.vue'
import { computed, defineComponent, ref } from '@vue/composition-api'
import { getMenu } from 'src/store/utils'
import { acl as ACL } from 'src/services'
import * as routename from 'src/routenames'
import * as rules from 'src/rules'

export default defineComponent({
  name: 'SideMenu',
  components: { MenuItem, SubMenu },
  setup (_, { root }) {
    const contentInsetLevel = ref(0.4)

    function acl ({ roles, permissions }: { roles: string[], permissions: string[]}) {
      return ACL.hasAnyRoleOrPermission({ roles, permissions })
    }

    return {
      contentInsetLevel,
      acl,
      ...routename,
      ...rules,
      menu: computed({
        get: () => getMenu(root),
        set: () => root.$store.dispatch('configs/toogleMenu')
      })
    }
  }
})
</script>
