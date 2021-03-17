import { defensorRoute } from 'src/routenames'

export default [
  {
    path: `/${defensorRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/relatorios/defensores/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/relatorios/defensores/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/relatorios/defensores/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
