import { Permission } from './permission'

/* eslint-disable camelcase */
export type Role = {
  id?: number
  role: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date,
  permissions?: Permission[]
}
