import { LocalStorage } from 'quasar'

export const acl = {
  setStore ({ token, user, permissions, roles }: unknown) {
    LocalStorage.set('token', token)
    LocalStorage.set('user', user)
    LocalStorage.set('permissions', permissions)
    LocalStorage.set('roles', roles)
  }
}
