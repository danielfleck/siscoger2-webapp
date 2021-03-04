import { sindicanciaRules } from 'src/rules'

export default [
  {
    path: '/sindicancias',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, ...sindicanciaRules.toShow },
    children: [
      {
        path: '',
        component: () => import('pages/procedimentos/sindicancia/list/Index.vue'),
        children: [
          { path: 'lista', component: () => import('pages/procedimentos/sindicancia/list/List.vue'), meta: { auth: true, ...sindicanciaRules.toShow } },
          { path: 'andamento', component: () => import('pages/procedimentos/sindicancia/list/Andamento.vue'), meta: { auth: true, ...sindicanciaRules.toShow } },
          { path: 'apagados', component: () => import('pages/procedimentos/sindicancia/list/Apagados.vue'), meta: { auth: true, ...sindicanciaRules.toShow } },
          { path: 'prazos', component: () => import('pages/procedimentos/sindicancia/list/Prazos.vue'), meta: { auth: true, ...sindicanciaRules.toShow } },
          { path: 'rel_situacao', component: () => import('pages/procedimentos/sindicancia/list/RelSituacao.vue'), meta: { auth: true, ...sindicanciaRules.toShow } },
          { path: 'resultado', component: () => import('pages/procedimentos/sindicancia/list/Resultado.vue'), meta: { auth: true, ...sindicanciaRules.toShow } }
        ]
      }
    ]
  },
  {
    path: '/sindicancias',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: 'inserir', component: () => import('pages/procedimentos/sindicancia/form/Create.vue'), meta: { auth: true, ...sindicanciaRules.toCreate } },
      { path: 'editar/:id', component: () => import('pages/procedimentos/sindicancia/form/Edit.vue'), meta: { auth: true, ...sindicanciaRules.toEdit } }
    ]
  }
]
