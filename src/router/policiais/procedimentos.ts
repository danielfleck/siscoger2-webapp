import { policialprocedimentoRoute } from 'src/routenames'

export default [
  {
    path: `/${policialprocedimentoRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/policiais/procedimentos/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/policiais/procedimentos/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/policiais/procedimentos/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
