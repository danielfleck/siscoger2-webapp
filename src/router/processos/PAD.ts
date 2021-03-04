import { padRules } from 'src/rules'

export default [
  {
    path: '/pad',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, ...padRules.toShow },
    children: [
      {
        path: '',
        component: () => import('pages/processos/PAD/list/Index.vue'),
        children: [
          { path: 'lista', component: () => import('pages/processos/PAD/list/List.vue'), meta: { auth: true, ...padRules.toShow } },
          { path: 'andamento', component: () => import('pages/processos/PAD/list/Andamento.vue'), meta: { auth: true, ...padRules.toShow } },
          { path: 'apagados', component: () => import('pages/processos/PAD/list/Apagados.vue'), meta: { auth: true, ...padRules.toShow } },
          { path: 'prazos', component: () => import('pages/processos/PAD/list/Prazos.vue'), meta: { auth: true, ...padRules.toShow } },
          { path: 'rel_situacao', component: () => import('pages/processos/PAD/list/RelSituacao.vue'), meta: { auth: true, ...padRules.toShow } },
          { path: 'resultado', component: () => import('pages/processos/PAD/list/Resultado.vue'), meta: { auth: true, ...padRules.toShow } }
        ]
      }
    ]
  },
  {
    path: '/pad',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: 'inserir', component: () => import('pages/processos/PAD/form/Create.vue'), meta: { auth: true, ...padRules.toCreate } },
      { path: 'editar/:id', component: () => import('pages/processos/PAD/form/Edit.vue'), meta: { auth: true, ...padRules.toEdit } }
    ]
  }
]
