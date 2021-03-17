import { presosoutrosRoute } from 'src/routenames'

export default [
  {
    path: `/${presosoutrosRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/policiais/presos_outros/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/policiais/presos_outros/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/policiais/presos_outros/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
