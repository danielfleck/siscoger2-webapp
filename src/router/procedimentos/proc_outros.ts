export default [
  {
    path: '/proc_outros',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: '', component: () => import('pages/procedimentos/proc_outros/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'inserir', component: () => import('pages/procedimentos/proc_outros/Form.vue'), meta: { auth: true, roles: [], permissions: [] } },
      { path: 'editar/:id', component: () => import('pages/procedimentos/proc_outros/Form.vue'), meta: { auth: true, roles: [], permissions: [] } }
    ]

  }
]
