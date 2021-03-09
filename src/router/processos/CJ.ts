import { cjRules } from 'src/rules'

export default [
  {
    path: '/cj',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, ...cjRules.toShow },
    children: [
      {
        path: '',
        component: () => import('pages/processos/CJ/list/Index.vue'),
        children: [
          { path: 'lista', component: () => import('pages/processos/CJ/list/List.vue'), meta: { auth: true, ...cjRules.toShow } },
          { path: 'andamento', component: () => import('pages/processos/CJ/list/Andamento.vue'), meta: { auth: true, ...cjRules.toShow } },
          { path: 'apagados', component: () => import('pages/processos/CJ/list/Apagados.vue'), meta: { auth: true, ...cjRules.toDelete } },
          { path: 'prazos', component: () => import('pages/processos/CJ/list/Prazos.vue'), meta: { auth: true, ...cjRules.toShow } },
          { path: 'rel_situacao', component: () => import('pages/processos/CJ/list/RelSituacao.vue'), meta: { auth: true, ...cjRules.toShow } },
          { path: 'julgamento', component: () => import('src/pages/processos/CJ/list/Julgamento.vue'), meta: { auth: true, ...cjRules.toShow } }
        ]
      }
    ]
  },
  {
    path: '/cj',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: 'inserir', component: () => import('pages/processos/CJ/form/Create.vue'), meta: { auth: true, ...cjRules.toCreate } },
      { path: 'editar/:id', component: () => import('pages/processos/CJ/form/Edit.vue'), meta: { auth: true, ...cjRules.toEdit } }
    ]
  }
]
