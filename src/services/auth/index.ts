import { LocalStorage } from 'quasar'
import { User } from 'src/types/user'

interface Store {
  token: string
  user: User
  permissions: string[]
  roles: string[]
}

export const setStore = ({ token, user, permissions, roles }: Store) => {
  LocalStorage.set('token', token)
  LocalStorage.set('user', user)
  LocalStorage.set('permissions', permissions)
  LocalStorage.set('roles', roles)
}

export const setToken = (token: string) => LocalStorage.set('token', token)
export const getToken = () => LocalStorage.getItem('token') || ''
export const setUser = (user: User) => LocalStorage.set('user', user)
export const getUser = () => LocalStorage.getItem('user') || {}
export const setPermissions = (permissions: string) => LocalStorage.set('permissions', permissions)
export const getPermissions = () => LocalStorage.getItem('permissions') || []
export const setRoles = (roles: string) => LocalStorage.set('roles', roles)
export const getRoles = () => LocalStorage.getItem('roles') || []
