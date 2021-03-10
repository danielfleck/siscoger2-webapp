import { ipmRules } from 'src/rules'

export default [
  {
    path: '/ipm',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, ...ipmRules.toShow },
    children: [
      {
        path: '',
        component: () => import('pages/procedimentos/IPM/list/Index.vue'),
        children: [
          { path: '', component: () => import('pages/procedimentos/IPM/list/List.vue'), meta: { auth: true, ...ipmRules.toShow } },
          { path: 'andamento', component: () => import('pages/procedimentos/IPM/list/Andamento.vue'), meta: { auth: true, ...ipmRules.toShow } },
          { path: 'apagados', component: () => import('pages/procedimentos/IPM/list/Apagados.vue'), meta: { auth: true, ...ipmRules.toShow } },
          { path: 'prazos', component: () => import('pages/procedimentos/IPM/list/Prazos.vue'), meta: { auth: true, ...ipmRules.toShow } },
          { path: 'rel_situacao', component: () => import('pages/procedimentos/IPM/list/RelSituacao.vue'), meta: { auth: true, ...ipmRules.toShow } },
          { path: 'resultado', component: () => import('pages/procedimentos/IPM/list/Resultado.vue'), meta: { auth: true, ...ipmRules.toShow } }
        ]
      }
    ]
  },
  {
    path: '/ipm',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: 'inserir', component: () => import('pages/procedimentos/IPM/form/Create.vue'), meta: { auth: true, ...ipmRules.toCreate } },
      { path: 'editar/:id', component: () => import('pages/procedimentos/IPM/form/Edit.vue'), meta: { auth: true, ...ipmRules.toEdit } }
    ]
  }
]
