import { adlRoute } from 'src/routenames'
import { adlRules } from 'src/rules'

export default [
  {
    path: `/${adlRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, ...adlRules.toShow },
    children: [
      {
        path: '',
        component: () => import('pages/processos/ADL/list/Index.vue'),
        children: [
          { path: '', component: () => import('pages/processos/ADL/list/List.vue'), meta: { auth: true, ...adlRules.toShow } },
          { path: 'andamento', component: () => import('pages/processos/ADL/list/Andamento.vue'), meta: { auth: true, ...adlRules.toShow } },
          { path: 'apagados', component: () => import('pages/processos/ADL/list/Apagados.vue'), meta: { auth: true, ...adlRules.toShow } },
          { path: 'prazos', component: () => import('pages/processos/ADL/list/Prazos.vue'), meta: { auth: true, ...adlRules.toShow } },
          { path: 'rel_situacao', component: () => import('pages/processos/ADL/list/RelSituacao.vue'), meta: { auth: true, ...adlRules.toShow } },
          { path: 'resultado', component: () => import('pages/processos/ADL/list/Resultado.vue'), meta: { auth: true, ...adlRules.toShow } }
        ]
      }
    ]
  },
  {
    path: `/${adlRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: 'inserir', component: () => import('pages/processos/ADL/form/Create.vue'), meta: { auth: true, ...adlRules.toCreate } },
      { path: 'editar/:id', component: () => import('pages/processos/ADL/form/Edit.vue'), meta: { auth: true, ...adlRules.toEdit } }
    ]
  }
]
