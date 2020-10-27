/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { post } from '../libs/api'

export async function checkIfExists (proc: string, params: object) {
  return await post(`${proc}/portarias`, params)
}
