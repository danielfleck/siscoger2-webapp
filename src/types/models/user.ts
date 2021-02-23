import { Role } from './role'

/* eslint-disable camelcase */
export type User = {
  id?: number,
  name: string,
  rg: string,
  cpf: string,
  class: string,
  position: string,
  group: string,
  subgroup: string,
  opm_code: string,
  cdopm: string,
  block: boolean,
  terms: boolean,
  email: string,
  createdAt: string,
  updatedAt: string | null,
  roles: Role[]
}

export const cleanUser = {
  id: 0,
  name: '',
  rg: '',
  cpf: '',
  class: '',
  position: '',
  group: '',
  subgroup: '',
  opm_code: '',
  cdopm: '',
  block: false,
  terms: false,
  email: '',
  createdAt: '',
  updatedAt: ''
}
