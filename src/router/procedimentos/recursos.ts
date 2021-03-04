import { recursoRules } from 'src/rules'

export default [
  {
    path: '/recursos',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, ...recursoRules.toShow },
    children: [
      {
        path: '',
        component: () => import('pages/procedimentos/recursos/list/Index.vue'),
        children: [
          { path: 'lista', component: () => import('pages/procedimentos/recursos/list/List.vue'), meta: { auth: true, ...recursoRules.toShow } },
          { path: 'andamento', component: () => import('pages/procedimentos/recursos/list/Andamento.vue'), meta: { auth: true, ...recursoRules.toShow } },
          { path: 'apagados', component: () => import('pages/procedimentos/recursos/list/Apagados.vue'), meta: { auth: true, ...recursoRules.toShow } },
          { path: 'prazos', component: () => import('pages/procedimentos/recursos/list/Prazos.vue'), meta: { auth: true, ...recursoRules.toShow } },
          { path: 'rel_situacao', component: () => import('pages/procedimentos/recursos/list/RelSituacao.vue'), meta: { auth: true, ...recursoRules.toShow } },
          { path: 'resultado', component: () => import('pages/procedimentos/recursos/list/Resultado.vue'), meta: { auth: true, ...recursoRules.toShow } }
        ]
      }
    ]
  },
  {
    path: '/recursos',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: 'inserir', component: () => import('pages/procedimentos/recursos/form/Create.vue'), meta: { auth: true, ...recursoRules.toCreate } },
      { path: 'editar/:id', component: () => import('pages/procedimentos/recursos/form/Edit.vue'), meta: { auth: true, ...recursoRules.toEdit } }
    ]
  }
]
