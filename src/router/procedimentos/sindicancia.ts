import { sindicanciaRules } from 'src/rules'

export default [
  {
    path: '/sindicancias',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: sindicanciaRules.toShow.roles, permissions: sindicanciaRules.toShow.permissions },
    children: [
      {
        path: '',
        component: () => import('pages/procedimentos/sindicancia/list/Index.vue'),
        children: [
          { path: 'lista', component: () => import('pages/procedimentos/sindicancia/list/List.vue'), meta: { auth: true, roles: sindicanciaRules.toShow.roles, permissions: sindicanciaRules.toShow.permissions } },
          { path: 'andamento', component: () => import('pages/procedimentos/sindicancia/list/Andamento.vue'), meta: { auth: true, roles: sindicanciaRules.toShow.roles, permissions: sindicanciaRules.toShow.permissions } },
          { path: 'apagados', component: () => import('pages/procedimentos/sindicancia/list/Apagados.vue'), meta: { auth: true, roles: sindicanciaRules.toShow.roles, permissions: sindicanciaRules.toShow.permissions } },
          { path: 'prazos', component: () => import('pages/procedimentos/sindicancia/list/Prazos.vue'), meta: { auth: true, roles: sindicanciaRules.toShow.roles, permissions: sindicanciaRules.toShow.permissions } },
          { path: 'rel_situacao', component: () => import('pages/procedimentos/sindicancia/list/RelSituacao.vue'), meta: { auth: true, roles: sindicanciaRules.toShow.roles, permissions: sindicanciaRules.toShow.permissions } },
          { path: 'resultado', component: () => import('pages/procedimentos/sindicancia/list/Resultado.vue'), meta: { auth: true, roles: sindicanciaRules.toShow.roles, permissions: sindicanciaRules.toShow.permissions } }
        ]
      }
    ]
  },
  {
    path: '/sindicancias',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: 'inserir', component: () => import('pages/procedimentos/sindicancia/form/Create.vue'), meta: { auth: true, roles: sindicanciaRules.toCreate.roles, permissions: sindicanciaRules.toCreate.permissions } },
      { path: 'editar/:id', component: () => import('pages/procedimentos/sindicancia/form/Edit.vue'), meta: { auth: true, roles: sindicanciaRules.toEdit.roles, permissions: sindicanciaRules.toEdit.permissions } }
    ]
  }
]
