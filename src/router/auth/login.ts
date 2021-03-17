import { loginRoute } from 'src/routenames'

// import This from 'components/'
export default [
  {
    path: `/${loginRoute}`,
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/auth/Login/Index.vue') }
    ]
  }
]
