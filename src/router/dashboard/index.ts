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
          { path: '', component: () => import('pages/dashboard/General.vue'), meta: { auth: true, roles: [], permissions: [] } },
          { path: 'pendencias-fatd', component: () => import('pages/dashboard/Fatd.vue'), meta: { auth: true, roles: [], permissions: [] } },
          { path: 'pendencias-ipm', component: () => import('pages/dashboard/Ipm.vue'), meta: { auth: true, roles: [], permissions: [] } },
          { path: 'pendencias-sindicancia', component: () => import('pages/dashboard/Sindicancia.vue'), meta: { auth: true, roles: [], permissions: [] } },
          { path: 'pendencias-cd', component: () => import('pages/dashboard/Cd.vue'), meta: { auth: true, roles: [], permissions: [] } }
        ]
      }
    ]
  }
]
