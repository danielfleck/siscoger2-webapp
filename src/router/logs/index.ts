import { logRoute } from 'src/routenames'

export default [
  {
    path: `/${logRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/logs/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/logs/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/logs/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
