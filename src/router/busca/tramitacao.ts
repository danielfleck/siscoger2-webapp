import { buscatramitacaoRoute } from 'src/routenames'

export default [
  {
    path: `/${buscatramitacaoRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/busca/tramitacao/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/busca/tramitacao/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/busca/tramitacao/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
