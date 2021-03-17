import { dadosunidadeRoute } from 'src/routenames'

export default [
  {
    path: `/${dadosunidadeRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/apresentacao/dados_opm/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/apresentacao/dados_opm/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/apresentacao/dados_opm/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
