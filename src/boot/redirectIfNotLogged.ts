/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { errorNotify } from 'src/libs/notify'

export default ({ urlPath }: any) => {
  // ...
  const isAuthorized = window.localStorage.getItem('token')
  if (!isAuthorized && !urlPath.startsWith('/login')) {
    errorNotify('Não autenticado')
    return Promise.reject({ url: '/login' })
  }
}
