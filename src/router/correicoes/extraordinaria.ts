export default [
  {
    path: '/correicao_extraordinaria',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/correicao/extraordinaria/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/correicao/extraordinaria/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/correicao/extraordinaria/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
