// export default [
//   {
//     path: '/MODULEROUTE',
//     component: () => import('layouts/MainLayout.vue'),
//     meta: { auth: true, roles: [], permissions: [] },
//     children: [
//       {
//         path: '',
//         component: () => import('path/to/page/list/Index.vue'),
//         children: [
//           { path: 'lista', component: () => import('path/to/page/list/List.vue'), meta: { auth: true, roles: [], permissions: [] } },
//           { path: 'andamento', component: () => import('path/to/page/list/Andamento.vue'), meta: { auth: true, roles: [], permissions: [] } },
//           { path: 'apagados', component: () => import('path/to/page/list/Apagados.vue'), meta: { auth: true, roles: [], permissions: [] } },
//           { path: 'prazos', component: () => import('path/to/page/list/Prazos.vue'), meta: { auth: true, roles: [], permissions: [] } },
//           { path: 'rel_situacao', component: () => import('path/to/page/list/RelSituacao.vue'), meta: { auth: true, roles: [], permissions: [] } },
//           { path: 'resultado', component: () => import('path/to/page/list/Resultado.vue'), meta: { auth: true, roles: [], permissions: [] } }
//         ]
//       }
//     ]
//   },
//   {
//     path: '/MODULEROUTE',
//     component: () => import('layouts/MainLayout.vue'),
//     meta: { auth: true, roles: [], permissions: [] },
//     children: [
//       { path: 'inserir', component: () => import('path/to/page/form/Create.vue'), meta: { auth: true, roles: [], permissions: [] } },
//       { path: 'editar/:id', component: () => import('path/to/page/form/Edit.vue'), meta: { auth: true, roles: [], permissions: [] } }
//     ]
//   }
// ]
