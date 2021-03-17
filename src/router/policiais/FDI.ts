import { fdiRoute } from 'src/routenames'

export default [
  {
    path: `/${fdiRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/policiais/FDI/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/policiais/FDI/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/policiais/FDI/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
