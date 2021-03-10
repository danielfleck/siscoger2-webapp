import { fatdRules } from 'src/rules'

export default [
  {
    path: '/fatd',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, ...fatdRules.toShow },
    children: [
      {
        path: '',
        component: () => import('pages/processos/FATD/list/Index.vue'),
        children: [
          { path: '', component: () => import('pages/processos/FATD/list/List.vue'), meta: { auth: true, ...fatdRules.toShow } },
          { path: 'andamento', component: () => import('pages/processos/FATD/list/Andamento.vue'), meta: { auth: true, ...fatdRules.toShow } },
          { path: 'apagados', component: () => import('pages/processos/FATD/list/Apagados.vue'), meta: { auth: true, ...fatdRules.toDelete } },
          { path: 'prazos', component: () => import('pages/processos/FATD/list/Prazos.vue'), meta: { auth: true, ...fatdRules.toShow } },
          { path: 'rel_situacao', component: () => import('pages/processos/FATD/list/RelSituacao.vue'), meta: { auth: true, ...fatdRules.toShow } },
          { path: 'resultado', component: () => import('src/pages/processos/FATD/list/Julgamento.vue'), meta: { auth: true, ...fatdRules.toShow } }
        ]
      }
    ]
  },
  {
    path: '/fatd',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: 'inserir', component: () => import('pages/processos/FATD/form/Create.vue'), meta: { auth: true, ...fatdRules.toCreate } },
      { path: 'editar/:id', component: () => import('pages/processos/FATD/form/Edit.vue'), meta: { auth: true, ...fatdRules.toEdit } }
    ]
  }
]
