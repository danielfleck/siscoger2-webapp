import { buscacogerRoute } from 'src/routenames'

export default [
  {
    path: `/${buscacogerRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/busca/tramitacao_coger/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/busca/tramitacao_coger/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/busca/tramitacao_coger/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
