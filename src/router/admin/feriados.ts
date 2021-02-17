export default [
  {
    path: '/admin/feriados',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/admin/feriados/Index.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/admin/feriados/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/admin/feriados/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]
  }
]
