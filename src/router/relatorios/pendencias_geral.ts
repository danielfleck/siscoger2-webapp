export default [
  {
    path: '/pendencias_geral',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/relatorios/pendencias_geral/List.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
