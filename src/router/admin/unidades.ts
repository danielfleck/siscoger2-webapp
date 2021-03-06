import { dadosunidadeRoute } from 'src/routenames'

export default [
  {
    path: `/admin/${dadosunidadeRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/admin/unidades/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/admin/unidades/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/admin/unidades/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
