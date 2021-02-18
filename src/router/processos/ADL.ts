export default [
  {
    path: '/adl',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/processos/ADL/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/processos/ADL/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/processos/ADL/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
