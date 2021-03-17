/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { api } from './api'

export async function checkIfExists (proc: string, params: object) {
  return await api.post(`${proc}/portarias`, params)
}
