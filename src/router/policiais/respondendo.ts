import { policialrespondendoRoute } from 'src/routenames'

export default [
  {
    path: `/${policialrespondendoRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/policiais/respondendo/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/policiais/respondendo/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/policiais/respondendo/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
