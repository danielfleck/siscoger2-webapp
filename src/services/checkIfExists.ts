import { post } from '../libs/api'

export async function checkIfExists (proc: string, params: object, debug = false) {
  return await post(`${proc}/portarias`, params, false, false, debug)
}
