export default [
  {
    path: '/sindicancias',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: ['listar-sidicancias', 'ver-sindicancias'] },
    children: [
      {
        path: '',
        component: () => import('pages/procedimentos/sindicancia/list/Index.vue'),
        children: [
          { path: 'lista', component: () => import('pages/procedimentos/sindicancia/list/List.vue'), meta: { auth: true, roles: [], permissions: ['listar-sidicancias', 'ver-sindicancias'] } },
          { path: 'andamento', component: () => import('pages/procedimentos/sindicancia/list/Andamento.vue'), meta: { auth: true, roles: [], permissions: ['listar-sidicancias', 'ver-sindicancias'] } },
          { path: 'apagados', component: () => import('pages/procedimentos/sindicancia/list/Apagados.vue'), meta: { auth: true, roles: [], permissions: ['listar-sidicancias', 'ver-sindicancias'] } },
          { path: 'prazos', component: () => import('pages/procedimentos/sindicancia/list/Prazos.vue'), meta: { auth: true, roles: [], permissions: ['listar-sidicancias', 'ver-sindicancias'] } },
          { path: 'rel_situacao', component: () => import('pages/procedimentos/sindicancia/list/RelSituacao.vue'), meta: { auth: true, roles: [], permissions: ['listar-sidicancias', 'ver-sindicancias'] } },
          { path: 'resultado', component: () => import('pages/procedimentos/sindicancia/list/Resultado.vue'), meta: { auth: true, roles: [], permissions: ['listar-sidicancias', 'ver-sindicancias'] } }
        ]
      }
    ]
  },
  {
    path: '/sindicancias',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: ['listar-sidicancias', 'ver-sindicancias'] },
    children: [
      { path: 'inserir', component: () => import('pages/procedimentos/sindicancia/form/Create.vue'), meta: { auth: true, roles: [], permissions: ['listar-sidicancias', 'ver-sindicancias'] } },
      { path: 'editar/:id', component: () => import('pages/procedimentos/sindicancia/form/Edit.vue'), meta: { auth: true, roles: [], permissions: ['listar-sidicancias', 'ver-sindicancias'] } }
    ]
  }
]
