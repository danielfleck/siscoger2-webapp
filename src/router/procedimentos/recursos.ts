export default [
  {
    path: '/recursos',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/procedimentos/recursos/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/procedimentos/recursos/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/procedimentos/recursos/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
