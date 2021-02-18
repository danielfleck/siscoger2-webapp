export default [
  {
    path: '/postos_graduacoes',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/relatorios/posto_graduacoes/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/relatorios/posto_graduacoes/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/relatorios/posto_graduacoes/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
