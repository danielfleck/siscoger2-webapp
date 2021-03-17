import { policialexcluidoRoute } from 'src/routenames'

export default [
  {
    path: `/${policialexcluidoRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/policiais/excluidos/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/policiais/excluidos/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/policiais/excluidos/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
