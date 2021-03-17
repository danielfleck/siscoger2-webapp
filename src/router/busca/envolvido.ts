import { buscaenvolvidoRoute } from 'src/routenames'

export default [
  {
    path: `/${buscaenvolvidoRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/busca/envolvido/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/busca/envolvido/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/busca/envolvido/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
