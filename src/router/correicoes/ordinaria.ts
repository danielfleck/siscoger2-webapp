export default [
  {
    path: '/correicao_ordinaria',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/correicao/ordinaria/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/correicao/ordinaria/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/correicao/ordinaria/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
