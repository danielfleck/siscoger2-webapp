import { permissionRoute } from 'src/routenames'

export default [
  {
    path: `/admin/${permissionRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/admin/permissions/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/admin/permissions/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/admin/permissions/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
