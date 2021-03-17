import { buscanominalRoute } from 'src/routenames'

export default [
  {
    path: `/${buscanominalRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/busca/nominal/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/busca/nominal/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/busca/nominal/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
