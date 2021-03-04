import { cdRules } from 'src/rules'

export default [
  {
    path: '/cd',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, ...cdRules.toShow },
    children: [
      {
        path: '',
        component: () => import('pages/processos/CD/list/Index.vue'),
        children: [
          { path: 'lista', component: () => import('pages/processos/CD/list/List.vue'), meta: { auth: true, ...cdRules.toShow } },
          { path: 'andamento', component: () => import('pages/processos/CD/list/Andamento.vue'), meta: { auth: true, ...cdRules.toShow } },
          { path: 'apagados', component: () => import('pages/processos/CD/list/Apagados.vue'), meta: { auth: true, ...cdRules.toShow } },
          { path: 'prazos', component: () => import('pages/processos/CD/list/Prazos.vue'), meta: { auth: true, ...cdRules.toShow } },
          { path: 'rel_situacao', component: () => import('pages/processos/CD/list/RelSituacao.vue'), meta: { auth: true, ...cdRules.toShow } },
          { path: 'resultado', component: () => import('pages/processos/CD/list/Resultado.vue'), meta: { auth: true, ...cdRules.toShow } }
        ]
      }
    ]
  },
  {
    path: '/cd',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: 'inserir', component: () => import('pages/processos/CD/form/Create.vue'), meta: { auth: true, ...cdRules.toCreate } },
      { path: 'editar/:id', component: () => import('pages/processos/CD/form/Edit.vue'), meta: { auth: true, ...cdRules.toEdit } }
    ]
  }
]
