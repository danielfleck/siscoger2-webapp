import { Role } from './role'

/* eslint-disable camelcase */
export type Permission = {
  id?: number
  permission: string
  description: string,
  group: string,
  createdAt: Date
  updatedAt: Date
  deletedAt: Date,
  roles?: Role[]
}
