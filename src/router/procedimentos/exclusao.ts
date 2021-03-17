import { exclusaojudicialRoute } from 'src/routenames'
import { exclusaojudicialRules } from 'src/rules'

export default [
  {
    path: `/${exclusaojudicialRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, ...exclusaojudicialRules.toShow },
    children: [
      {
        path: '',
        component: () => import('pages/procedimentos/exclusao/list/Index.vue'),
        children: [
          { path: '', component: () => import('pages/procedimentos/exclusao/list/List.vue'), meta: { auth: true, ...exclusaojudicialRules.toShow } },
          { path: 'apagados', component: () => import('pages/procedimentos/exclusao/list/Apagados.vue'), meta: { auth: true, ...exclusaojudicialRules.toDelete } }
        ]
      }
    ]
  },
  {
    path: `/${exclusaojudicialRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: 'inserir', component: () => import('pages/procedimentos/exclusao/form/Form.vue'), meta: { auth: true, ...exclusaojudicialRules.toCreate } },
      { path: 'editar/:id', component: () => import('src/pages/procedimentos/exclusao/form/Form.vue'), meta: { auth: true, ...exclusaojudicialRules.toEdit } }
    ]
  }
]
