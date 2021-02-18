export default [
  {
    path: '/apresentacoes',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/apresentacao/apresentacao/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/apresentacao/apresentacao/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/apresentacao/apresentacao/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
