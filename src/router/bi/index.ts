import { biRoute } from 'src/routenames'

export default [
  {
    path: `/${biRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/bi/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/bi/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/bi/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
