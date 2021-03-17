import { recursoRoute } from 'src/routenames'
import { recursoRules } from 'src/rules'

export default [
  {
    path: `/${recursoRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, ...recursoRules.toShow },
    children: [
      {
        path: '',
        component: () => import('pages/procedimentos/recursos/list/Index.vue'),
        children: [
          { path: '', component: () => import('pages/procedimentos/recursos/list/List.vue'), meta: { auth: true, ...recursoRules.toShow } },
          { path: 'apagados', component: () => import('pages/procedimentos/recursos/list/Apagados.vue'), meta: { auth: true, ...recursoRules.toDelete } }
        ]
      }
    ]
  },
  {
    path: `/${recursoRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: 'inserir', component: () => import('pages/procedimentos/recursos/form/Form.vue'), meta: { auth: true, ...recursoRules.toCreate } },
      { path: 'editar/:id', component: () => import('pages/procedimentos/recursos/form/Form.vue'), meta: { auth: true, ...recursoRules.toEdit } }
    ]
  }
]
