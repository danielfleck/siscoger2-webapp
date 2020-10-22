export default [
  {
    path: '/sindicancias',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/procedimentos/sindicancia/list/Index.vue'),
        children: [
          { path: 'lista', component: () => import('pages/procedimentos/sindicancia/list/List.vue') },
          { path: 'andamento', component: () => import('pages/procedimentos/sindicancia/list/Andamento.vue') },
          { path: 'apagados', component: () => import('pages/procedimentos/sindicancia/list/Apagados.vue') },
          { path: 'prazos', component: () => import('pages/procedimentos/sindicancia/list/Prazos.vue') },
          { path: 'rel_situacao', component: () => import('pages/procedimentos/sindicancia/list/RelSituacao.vue') },
          { path: 'resultado', component: () => import('pages/procedimentos/sindicancia/list/Resultado.vue') }
        ]
      }
    ]
  },
  {
    path: '/sindicancias',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'inserir', component: () => import('pages/procedimentos/sindicancia/form/Create.vue') },
      { path: 'editar/:id', component: () => import('pages/procedimentos/sindicancia/form/Edit.vue') }
    ]
  }
]
