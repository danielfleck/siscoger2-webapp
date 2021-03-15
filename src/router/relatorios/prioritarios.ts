export default [
  {
    path: '/prioritarios',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      {
        path: '',
        component: () => import('src/pages/relatorios/prioritarios/Index.vue'),
        meta: { auth: true, roles: [], permissions: [] },
        children: [
          { path: '', component: () => import('src/pages/relatorios/prioritarios/processos/Index.vue'), meta: { auth: true, roles: [], permissions: [] } },
          { path: 'procedimentos', component: () => import('src/pages/relatorios/prioritarios/procedimentos/Index.vue'), meta: { auth: true, roles: [], permissions: [] } }
        ]
      }
    ]
  }
]
