/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// import ADL from './processos/ADL'
// import CD from './processos/CD'
// import CJ from './processos/CJ'
// import FATD from './processos/FATD'
// import PAD from './processos/PAD'
// import defensores from './relatorios/defensores'
// import encarregados from './relatorios/encarregados'
// import eprotocolo from './relatorios/eprotocolo'
// import assedio from './relatorios/especificos/assedio'
// import violencia from './relatorios/especificos/violencia'
// import ofendidos from './relatorios/ofendidos'
// import pendencias from './relatorios/pendencias'
// import pendenciasGeral from './relatorios/pendencias_geral'
// import postoGraduacoes from './relatorios/posto_graduacoes'
// import prioritarios from './relatorios/prioritarios'
// import processos from './relatorios/processos'
// import sobrestamentos from './relatorios/sobrestamentos'
// import sai from './sai'
import { RouteConfig } from 'vue-router'
import feriados from './admin/feriados'
// import permissions from './admin/permissions'
// import roles from './admin/roles'
// import sjd from './admin/sjd'
// import unidades from './admin/unidades'
// import user from './admin/user'
// import apresentacao from './apresentacao/apresentacao'
// import dadosOpm from './apresentacao/dados_opm'
// import locais from './apresentacao/locais'
// import notas from './apresentacao/notas'
import auth from './auth/login'
// import PM from './busca/PM'
// import envolvido from './busca/envolvido'
// import nominal from './busca/nominal'
// import ofendido from './busca/ofendido'
// import tramitacao from './busca/tramitacao'
// import tramitacaoCoger from './busca/tramitacao_coger'
// import extraordinaria from './correicoes/extraordinaria'
// import ordinaria from './correicoes/ordinaria'
import dashboard from './dashboard'
// import links from './links'
// import logs from './logs'
// import FDI from './policiais/FDI'
// import comportamento from './policiais/comportamento'
// import denunciados from './policiais/denunciados'
// import elogios from './policiais/elogios'
// import excluidos from './policiais/excluidos'
// import medalhas from './policiais/medalhas'
// import obitosLesoes from './policiais/obitos_lesoes'
// import presos from './policiais/presos'
// import presosOutros from './policiais/presos_outros'
// import procedimentos from './policiais/procedimentos'
// import punidos from './policiais/punidos'
// import reintegrados from './policiais/reintegrados'
// import respondendo from './policiais/respondendo'
// import restricoes from './policiais/restricoes'
// import suspensos from './policiais/suspensos'
// import APFD from './procedimentos/APFD'
// import IPM from './procedimentos/IPM'
// import ISO from './procedimentos/ISO'
// import desercao from './procedimentos/desercao'
// import exclusao from './procedimentos/exclusao'
// import procOutros from './procedimentos/proc_outros'
// import recursos from './procedimentos/recursos'
import sindicancia from './procedimentos/sindicancia'

const routes: RouteConfig[] = [
  ...feriados,
  // ...permissions,
  // ...roles,
  // ...sjd,
  // ...unidades,
  // ...user,
  // ...apresentacao,
  // ...dadosOpm,
  // ...locais,
  // ...notas,
  ...auth,
  // ...PM,
  // ...envolvido,
  // ...nominal,
  // ...ofendido,
  // ...tramitacao,
  // ...tramitacaoCoger,
  // ...extraordinaria,
  // ...ordinaria,
  ...dashboard,
  // ...links,
  // ...logs,
  // ...FDI,
  // ...comportamento,
  // ...denunciados,
  // ...elogios,
  // ...excluidos,
  // ...medalhas,
  // ...obitosLesoes,
  // ...presos,
  // ...presosOutros,
  // ...procedimentos,
  // ...punidos,
  // ...reintegrados,
  // ...respondendo,
  // ...restricoes,
  // ...suspensos,
  // ...APFD,
  // ...IPM,
  // ...ISO,
  // ...desercao,
  // ...exclusao,
  // ...procOutros,
  // ...recursos,
  ...sindicancia,
  // ...ADL,
  // ...CD,
  // ...CJ,
  // ...FATD,
  // ...PAD,
  // ...defensores,
  // ...encarregados,
  // ...eprotocolo,
  // ...assedio,
  // ...violencia,
  // ...ofendidos,
  // ...pendencias,
  // ...pendenciasGeral,
  // ...postoGraduacoes,
  // ...prioritarios,
  // ...processos,
  // ...sobrestamentos,
  // ...sai,

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
