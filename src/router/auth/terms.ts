// import This from 'components/'
export default [
  {
    path: '/termos',
    meta: { auth: true },
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/auth/Terms/Index.vue') }
    ]
  }
]
