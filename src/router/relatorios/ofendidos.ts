import { ofendidoRoute } from 'src/routenames'

export default [
  {
    path: `/${ofendidoRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/relatorios/ofendidos/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/relatorios/ofendidos/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/relatorios/ofendidos/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
