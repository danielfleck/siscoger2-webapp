export default [
  {
    path: '/iso',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/procedimentos/ISO/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/procedimentos/ISO/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/procedimentos/ISO/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
