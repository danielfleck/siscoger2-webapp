import { desercaoRoute } from 'src/routenames'
import { desercaoRules } from 'src/rules'

export default [
  {
    path: `/${desercaoRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, ...desercaoRules.toShow },
    children: [
      {
        path: '',
        component: () => import('pages/procedimentos/desercao/list/Index.vue'),
        children: [
          { path: '', component: () => import('pages/procedimentos/desercao/list/List.vue'), meta: { auth: true, ...desercaoRules.toShow } },
          { path: 'apagados', component: () => import('pages/procedimentos/desercao/list/Apagados.vue'), meta: { auth: true, ...desercaoRules.toDelete } },
          { path: 'rel_situacao', component: () => import('pages/procedimentos/desercao/list/RelSituacao.vue'), meta: { auth: true, ...desercaoRules.toShow } }]
      }
    ]
  },
  {
    path: `/${desercaoRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: 'inserir', component: () => import('pages/procedimentos/desercao/form/Create.vue'), meta: { auth: true, ...desercaoRules.toCreate } },
      { path: 'editar/:id', component: () => import('pages/procedimentos/desercao/form/Edit.vue'), meta: { auth: true, ...desercaoRules.toEdit } }
    ]
  }
]
