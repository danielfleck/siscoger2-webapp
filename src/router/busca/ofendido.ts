import { buscaofendidoRoute } from 'src/routenames'

export default [
  {
    path: `/${buscaofendidoRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/busca/ofendido/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/busca/ofendido/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/busca/ofendido/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
