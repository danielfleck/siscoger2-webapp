import { emailagendadoRoute } from 'src/routenames'

export default [
  {
    path: `/${emailagendadoRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/apresentacao/emails/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/apresentacao/emails/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/apresentacao/emails/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
