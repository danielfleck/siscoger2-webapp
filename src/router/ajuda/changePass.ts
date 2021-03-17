import { modificarsenhaRoute } from 'src/routenames'

export default [
  {
    path: `/${modificarsenhaRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true },
    children: [
      { path: '', component: () => import('pages/ajuda/changePass/Index.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
