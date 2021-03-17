import { falecimentoRoute } from 'src/routenames'

export default [
  {
    path: `/${falecimentoRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/policiais/obitos_lesoes/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/policiais/obitos_lesoes/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/policiais/obitos_lesoes/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
