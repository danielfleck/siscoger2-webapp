import { policialcomportamentoRoute } from 'src/routenames'

export default [
  {
    path: `/${policialcomportamentoRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/policiais/comportamento/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/policiais/comportamento/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/policiais/comportamento/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
