import { policialrestricaoRoute } from 'src/routenames'

export default [
  {
    path: `/${policialrestricaoRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/policiais/restricoes/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/policiais/restricoes/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/policiais/restricoes/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
