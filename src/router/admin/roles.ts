import { roleRoute } from 'src/routenames'

export default [
  {
    path: `/admin/${roleRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/admin/roles/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/admin/roles/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/admin/roles/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
