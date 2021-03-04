import { exclusaojudicialRules } from 'src/rules'

export default [
  {
    path: '/exclusao',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, ...exclusaojudicialRules.toShow },
    children: [
      {
        path: '',
        component: () => import('pages/procedimentos/exclusao/list/Index.vue'),
        children: [
          { path: 'lista', component: () => import('pages/procedimentos/exclusao/list/List.vue'), meta: { auth: true, ...exclusaojudicialRules.toShow } },
          { path: 'andamento', component: () => import('pages/procedimentos/exclusao/list/Andamento.vue'), meta: { auth: true, ...exclusaojudicialRules.toShow } },
          { path: 'apagados', component: () => import('pages/procedimentos/exclusao/list/Apagados.vue'), meta: { auth: true, ...exclusaojudicialRules.toShow } },
          { path: 'prazos', component: () => import('pages/procedimentos/exclusao/list/Prazos.vue'), meta: { auth: true, ...exclusaojudicialRules.toShow } },
          { path: 'rel_situacao', component: () => import('pages/procedimentos/exclusao/list/RelSituacao.vue'), meta: { auth: true, ...exclusaojudicialRules.toShow } },
          { path: 'resultado', component: () => import('pages/procedimentos/exclusao/list/Resultado.vue'), meta: { auth: true, ...exclusaojudicialRules.toShow } }
        ]
      }
    ]
  },
  {
    path: '/exclusao',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: 'inserir', component: () => import('pages/procedimentos/exclusao/form/Create.vue'), meta: { auth: true, ...exclusaojudicialRules.toCreate } },
      { path: 'editar/:id', component: () => import('pages/procedimentos/exclusao/form/Edit.vue'), meta: { auth: true, ...exclusaojudicialRules.toEdit } }
    ]
  }
]
