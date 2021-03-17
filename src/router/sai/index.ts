import { saiRoute } from 'src/routenames'

export default [
  {
    path: `/${saiRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/sai/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/sai/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/sai/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
