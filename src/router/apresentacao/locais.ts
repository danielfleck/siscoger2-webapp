import { localapresentacaoRoute } from 'src/routenames'

export default [
  {
    path: `/${localapresentacaoRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/apresentacao/locais/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/apresentacao/locais/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/apresentacao/locais/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
