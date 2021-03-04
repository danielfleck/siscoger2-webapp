import { apfdRules } from 'src/rules'

export default [
  {
    path: '/apfd',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, ...apfdRules.toShow },
    children: [
      {
        path: '',
        component: () => import('pages/procedimentos/APFD/list/Index.vue'),
        children: [
          { path: 'lista', component: () => import('pages/procedimentos/APFD/list/List.vue'), meta: { auth: true, ...apfdRules.toShow } },
          { path: 'andamento', component: () => import('pages/procedimentos/APFD/list/Andamento.vue'), meta: { auth: true, ...apfdRules.toShow } },
          { path: 'apagados', component: () => import('pages/procedimentos/APFD/list/Apagados.vue'), meta: { auth: true, ...apfdRules.toShow } },
          { path: 'prazos', component: () => import('pages/procedimentos/APFD/list/Prazos.vue'), meta: { auth: true, ...apfdRules.toShow } },
          { path: 'rel_situacao', component: () => import('pages/procedimentos/APFD/list/RelSituacao.vue'), meta: { auth: true, ...apfdRules.toShow } },
          { path: 'resultado', component: () => import('pages/procedimentos/APFD/list/Resultado.vue'), meta: { auth: true, ...apfdRules.toShow } }
        ]
      }
    ]
  },
  {
    path: '/apfd',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: 'inserir', component: () => import('pages/procedimentos/APFD/form/Create.vue'), meta: { auth: true, ...apfdRules.toCreate } },
      { path: 'editar/:id', component: () => import('pages/procedimentos/APFD/form/Edit.vue'), meta: { auth: true, ...apfdRules.toEdit } }
    ]
  }
]
