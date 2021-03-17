import { policialdenunciadoRoute } from 'src/routenames'

export default [
  {
    path: `/${policialdenunciadoRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/policiais/denunciados/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/policiais/denunciados/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/policiais/denunciados/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
