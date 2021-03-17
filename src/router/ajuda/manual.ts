import { manualRoute } from 'src/routenames'

export default [
  {
    path: `/${manualRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/ajuda/manual/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/ajuda/manual/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/ajuda/manual/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
