import { eprotocoloRoute } from 'src/routenames'

export default [
  {
    path: `/${eprotocoloRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/relatorios/eprotocolo/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/relatorios/eprotocolo/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/relatorios/eprotocolo/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
