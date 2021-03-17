import { buscapmRoute } from 'src/routenames'

export default [
  {
    path: `/${buscapmRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/busca/PM/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/busca/PM/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/busca/PM/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
