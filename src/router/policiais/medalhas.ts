import { policialmedalhaRoute } from 'src/routenames'

export default [
  {
    path: `/${policialmedalhaRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/policiais/medalhas/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/policiais/medalhas/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/policiais/medalhas/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
