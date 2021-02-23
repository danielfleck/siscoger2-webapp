import { LocalStorage } from 'quasar'
import { cleanUser, User } from 'src/types'

export const getUser = ():User => {
  return LocalStorage.getItem('user') ?? cleanUser
}

export const getRoles = ():string[] => {
  return LocalStorage.getItem('roles') ?? []
}

export const getPermissions = ():string[] => {
  return LocalStorage.getItem('permissions') ?? []
}

export const getToken = (): string | null => {
  return LocalStorage.getItem('token') ?? null
}

export const getPendences = (pendence: string): number => {
  const verifyIfExistPendence = LocalStorage.getItem(`pendencias-${pendence.toLowerCase()}`)
  return Number(verifyIfExistPendence) ?? 0
}
