import { pendenciasgeralRoute } from 'src/routenames'

export default [
  {
    path: `/${pendenciasgeralRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/relatorios/pendencias/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/relatorios/pendencias/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/relatorios/pendencias/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
