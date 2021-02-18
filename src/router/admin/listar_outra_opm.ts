export default [
  {
    path: '/admin/listar_outra_opm',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/admin/listar_outra_opm/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/admin/listar_outra_opm/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/admin/listar_outra_opm/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
