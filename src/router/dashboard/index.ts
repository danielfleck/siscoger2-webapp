export default [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/dashboard/Index.vue'),
        children: [
          { path: '', component: () => import('pages/dashboard/General.vue') },
          { path: 'pendencias-fatd', component: () => import('pages/dashboard/Fatd.vue') },
          { path: 'pendencias-ipm', component: () => import('pages/dashboard/Ipm.vue') },
          { path: 'pendencias-sindicancia', component: () => import('pages/dashboard/Sindicancia.vue') },
          { path: 'pendencias-cd', component: () => import('pages/dashboard/Cd.vue') },
        ]
      }
    ]
  }
]
