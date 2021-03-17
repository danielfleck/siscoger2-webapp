import { userRoute } from 'src/routenames'

export default [
  {
    path: `/admin/${userRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/admin/user/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/admin/user/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/admin/user/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
