import { termosRoute } from 'src/routenames'

// import This from 'components/'
export default [
  {
    path: `/${termosRoute}`,
    meta: { auth: true },
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/auth/Terms/Index.vue') }
    ]
  }
]
