export default [
  {
    path: '/pad',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/processos/PAD/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/processos/PAD/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/processos/PAD/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
