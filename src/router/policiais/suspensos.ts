import { policialsuspensoRoute } from 'src/routenames'

export default [
  {
    path: `/${policialsuspensoRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/policiais/suspensos/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/policiais/suspensos/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/policiais/suspensos/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
