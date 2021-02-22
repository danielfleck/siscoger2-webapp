export default [
  {
    path: '/modificar_senha',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true },
    children: [
      { path: '', component: () => import('pages/ajuda/changePass/Index.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
