export default [
  {
    path: '/cj',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/processos/CJ/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/processos/CJ/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/processos/CJ/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
