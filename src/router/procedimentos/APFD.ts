import { apfdRoute } from 'src/routenames'
import { apfdRules } from 'src/rules'

export default [
  {
    path: `/${apfdRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, ...apfdRules.toShow },
    children: [
      {
        path: '',
        component: () => import('pages/procedimentos/APFD/list/Index.vue'),
        children: [
          { path: '', component: () => import('pages/procedimentos/APFD/list/List.vue'), meta: { auth: true, ...apfdRules.toShow } },
          { path: 'apagados', component: () => import('pages/procedimentos/APFD/list/Apagados.vue'), meta: { auth: true, ...apfdRules.toDelete } },
          { path: 'rel_situacao', component: () => import('pages/procedimentos/APFD/list/RelSituacao.vue'), meta: { auth: true, ...apfdRules.toShow } }
        ]
      }
    ]
  },
  {
    path: `/${apfdRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: 'inserir', component: () => import('pages/procedimentos/APFD/form/Create.vue'), meta: { auth: true, ...apfdRules.toCreate } },
      { path: 'editar/:id', component: () => import('pages/procedimentos/APFD/form/Edit.vue'), meta: { auth: true, ...apfdRules.toEdit } }
    ]
  }
]
