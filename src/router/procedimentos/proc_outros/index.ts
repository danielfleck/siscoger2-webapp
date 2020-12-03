// export default [
//   {
//     path: '/MODULEROUTE',
//     component: () => import('layouts/MainLayout.vue'),
//     meta: { auth: true },
//     children: [
//       {
//         path: '',
//         component: () => import('path/to/page/list/Index.vue'),
//         children: [
//           { path: 'lista', component: () => import('path/to/page/list/List.vue'), meta: { auth: true } },
//           { path: 'andamento', component: () => import('path/to/page/list/Andamento.vue'), meta: { auth: true } },
//           { path: 'apagados', component: () => import('path/to/page/list/Apagados.vue'), meta: { auth: true } },
//           { path: 'prazos', component: () => import('path/to/page/list/Prazos.vue'), meta: { auth: true } },
//           { path: 'rel_situacao', component: () => import('path/to/page/list/RelSituacao.vue'), meta: { auth: true } },
//           { path: 'resultado', component: () => import('path/to/page/list/Resultado.vue'), meta: { auth: true } }
//         ]
//       }
//     ]
//   },
//   {
//     path: '/MODULEROUTE',
//     component: () => import('layouts/MainLayout.vue'),
//     meta: { auth: true },
//     children: [
//       { path: 'inserir', component: () => import('path/to/page/form/Create.vue'), meta: { auth: true } },
//       { path: 'editar/:id', component: () => import('path/to/page/form/Edit.vue'), meta: { auth: true } }
//     ]
//   }
// ]
