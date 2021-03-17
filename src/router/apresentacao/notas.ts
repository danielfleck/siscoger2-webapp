import { notacogerRoute } from 'src/routenames'

export default [
  {
    path: `/${notacogerRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/apresentacao/notas/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/apresentacao/notas/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/apresentacao/notas/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
