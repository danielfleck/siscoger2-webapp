import { policialpunidoRoute } from 'src/routenames'

export default [
  {
    path: `/${policialpunidoRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/policiais/punidos/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/policiais/punidos/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/policiais/punidos/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
