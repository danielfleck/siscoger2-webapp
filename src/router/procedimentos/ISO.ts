import { isoRules } from 'src/rules'

export default [
  {
    path: '/iso',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, ...isoRules.toShow },
    children: [
      {
        path: '',
        component: () => import('pages/procedimentos/ISO/list/Index.vue'),
        children: [
          { path: 'lista', component: () => import('pages/procedimentos/ISO/list/List.vue'), meta: { auth: true, ...isoRules.toShow } },
          { path: 'andamento', component: () => import('pages/procedimentos/ISO/list/Andamento.vue'), meta: { auth: true, ...isoRules.toShow } },
          { path: 'apagados', component: () => import('pages/procedimentos/ISO/list/Apagados.vue'), meta: { auth: true, ...isoRules.toDelete } },
          { path: 'prazos', component: () => import('pages/procedimentos/ISO/list/Prazos.vue'), meta: { auth: true, ...isoRules.toShow } }
        ]
      }
    ]
  },
  {
    path: '/iso',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: 'inserir', component: () => import('pages/procedimentos/ISO/form/Create.vue'), meta: { auth: true, ...isoRules.toCreate } },
      { path: 'editar/:id', component: () => import('pages/procedimentos/ISO/form/Edit.vue'), meta: { auth: true, ...isoRules.toEdit } }
    ]
  }
]
