import { policialreintegradoRoute } from 'src/routenames'

export default [
  {
    path: `/${policialreintegradoRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/policiais/reintegrados/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/policiais/reintegrados/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/policiais/reintegrados/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
