import { sobrestamentoRoute } from 'src/routenames'

export default [
  {
    path: `/${sobrestamentoRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      {
        path: '',
        component: () => import('src/pages/relatorios/sobrestamentos/Index.vue'),
        meta: { auth: true, roles: [], permissions: [] },
        children: [
          { path: '', component: () => import('src/pages/relatorios/sobrestamentos/Adl.vue'), meta: { auth: true, roles: [], permissions: [] } },
          { path: 'cd', component: () => import('src/pages/relatorios/sobrestamentos/Cd.vue'), meta: { auth: true, roles: [], permissions: [] } },
          { path: 'cj', component: () => import('src/pages/relatorios/sobrestamentos/Cj.vue'), meta: { auth: true, roles: [], permissions: [] } },
          { path: 'fatd', component: () => import('src/pages/relatorios/sobrestamentos/Fatd.vue'), meta: { auth: true, roles: [], permissions: [] } },
          { path: 'it', component: () => import('src/pages/relatorios/sobrestamentos/It.vue'), meta: { auth: true, roles: [], permissions: [] } },
          { path: 'sindicancia', component: () => import('src/pages/relatorios/sobrestamentos/Sindicancia.vue'), meta: { auth: true, roles: [], permissions: [] } }
        ]
      }
    ]
  }
]
