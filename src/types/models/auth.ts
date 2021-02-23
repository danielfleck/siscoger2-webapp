import { User } from './user'

export type Auth = {
  rg: string,
  username: string,
  password: string
}

export interface AuthResponse {
  token: string
  user: User
  permissions: string[]
  roles: string[]
}
