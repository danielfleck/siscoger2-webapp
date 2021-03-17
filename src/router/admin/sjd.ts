import { sjdRoute } from 'src/routenames'

export default [
  {
    path: `/admin/${sjdRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/admin/sjd/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/admin/sjd/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/admin/sjd/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
