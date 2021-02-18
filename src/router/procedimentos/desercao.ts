export default [
  {
    path: '/desercao',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/procedimentos/desercao/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/procedimentos/desercao/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/procedimentos/desercao/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
