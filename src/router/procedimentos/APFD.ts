export default [
  {
    path: '/apfd',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/procedimentos/APFD/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/procedimentos/APFD/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/procedimentos/APFD/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
