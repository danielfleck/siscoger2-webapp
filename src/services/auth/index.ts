import { LocalStorage } from 'quasar'
import { cleanUser, User } from 'src/types/user'

interface Store {
  token: string
  user: User
  permissions: string[]
  roles: string[]
}

export const setStore = ({ token, user, permissions, roles }: Store):void => {
  LocalStorage.set('token', token)
  LocalStorage.set('user', user)
  LocalStorage.set('permissions', permissions)
  LocalStorage.set('roles', roles)
}

export const setToken = (token: string):void => LocalStorage.set('token', token)
export const getToken = (): string => LocalStorage.getItem('token') || ''
export const setUser = (user: User):void => LocalStorage.set('user', user)
export const getUser = ():User => LocalStorage.getItem('user') || cleanUser
export const setPermissions = (permissions: string):void => LocalStorage.set('permissions', permissions)
export const getPermissions = ():string[] => LocalStorage.getItem('permissions') || []
export const setRoles = (roles: string):void => LocalStorage.set('roles', roles)
export const getRoles = ():string[] => LocalStorage.getItem('roles') || []

export const getPermissionsBefore = ():string[] => {
  const permissions = window.localStorage.getItem('permissions')
  return permissions ? permissions as unknown as string[] : []
}
export const getRolesBefore = ():string[] => {
  const roles = window.localStorage.getItem('roles')
  return roles ? roles as unknown as string[] : []
}
