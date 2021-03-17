import { pendenciasgeralRoute } from 'src/routenames'

export default [
  {
    path: `/${pendenciasgeralRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/relatorios/pendencias_geral/List.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
