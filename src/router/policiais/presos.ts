import { policialpresoRoute } from 'src/routenames'

export default [
  {
    path: `/${policialpresoRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/policiais/presos/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/policiais/presos/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/policiais/presos/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
