import { procoutroRoute } from 'src/routenames'
import { procoutroRules } from 'src/rules'

export default [
  {
    path: `/${procoutroRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, ...procoutroRules.toShow },
    children: [
      {
        path: '',
        component: () => import('pages/procedimentos/proc_outros/list/Index.vue'),
        children: [
          { path: '', component: () => import('pages/procedimentos/proc_outros/list/List.vue'), meta: { auth: true, ...procoutroRules.toShow } },
          { path: 'andamento', component: () => import('pages/procedimentos/proc_outros/list/Andamento.vue'), meta: { auth: true, ...procoutroRules.toShow } },
          { path: 'apagados', component: () => import('pages/procedimentos/proc_outros/list/Apagados.vue'), meta: { auth: true, ...procoutroRules.toDelete } },
          { path: 'prazos', component: () => import('pages/procedimentos/proc_outros/list/Prazos.vue'), meta: { auth: true, ...procoutroRules.toShow } },
          { path: 'envolvidos', component: () => import('src/pages/procedimentos/proc_outros/list/Envolvidos.vue'), meta: { auth: true, ...procoutroRules.toShow } },
          { path: 'resultado', component: () => import('pages/procedimentos/proc_outros/list/Resultado.vue'), meta: { auth: true, ...procoutroRules.toShow } }
        ]
      }
    ]
  },
  {
    path: `/${procoutroRoute}`,
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, roles: [], permissions: [] },
    children: [
      { path: 'inserir', component: () => import('pages/procedimentos/proc_outros/form/Create.vue'), meta: { auth: true, ...procoutroRules.toCreate } },
      { path: 'editar/:id', component: () => import('pages/procedimentos/proc_outros/form/Edit.vue'), meta: { auth: true, ...procoutroRules.toEdit } }
    ]
  }
]
