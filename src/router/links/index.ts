import { linksuteisRoute } from 'src/routenames'

export default [
  {
    path: `/${linksuteisRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/links/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/links/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/links/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
