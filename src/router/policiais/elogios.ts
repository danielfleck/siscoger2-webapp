import { policialelogioRoute } from 'src/routenames'

export default [
  {
    path: `/${policialelogioRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/policiais/elogios/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/policiais/elogios/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/policiais/elogios/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
