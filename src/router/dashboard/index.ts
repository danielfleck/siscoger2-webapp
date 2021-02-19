export default [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      {
        path: '',
        component: () => import('pages/dashboard/Index.vue'),
        children: [
          { path: '', component: () => import('pages/dashboard/general/Index.vue'), meta: { auth: true, roles: [], permissions: [] } },
          { path: 'pendencias-fatd', component: () => import('pages/dashboard/fatd/Index.vue'), meta: { auth: true, roles: [], permissions: [] } },
          { path: 'pendencias-ipm', component: () => import('pages/dashboard/ipm/Index.vue'), meta: { auth: true, roles: [], permissions: [] } },
          { path: 'pendencias-sindicancia', component: () => import('pages/dashboard/sindicancia/Index.vue'), meta: { auth: true, roles: [], permissions: [] } },
          { path: 'pendencias-cd', component: () => import('pages/dashboard/cd/Index.vue'), meta: { auth: true, roles: [], permissions: [] } }
        ]
      }
    ]
  }
]
