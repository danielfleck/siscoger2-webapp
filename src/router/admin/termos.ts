import { termosRoute } from 'src/routenames'

export default [
  {
    path: `/admin/${termosRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/admin/termos/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/admin/termos/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/admin/termos/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
