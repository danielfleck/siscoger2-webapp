export default [
  {
    path: '/fatd',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/processos/FATD/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/processos/FATD/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/processos/FATD/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
