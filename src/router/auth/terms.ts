// import This from 'components/'
export default [
  {
    path: '/terms',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/auth/Terms/Index.vue') }
    ]
  }
]
