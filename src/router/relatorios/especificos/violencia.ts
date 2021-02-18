export default [
  {
    path: '/violencia_domestica',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/relatorios/especificos/violencia/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/relatorios/especificos/violencia/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/relatorios/especificos/violencia/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
