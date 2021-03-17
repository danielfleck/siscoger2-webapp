/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { LocalStorage } from 'quasar'
import { pendenciasRoute } from 'src/routenames'
import { Pendencia } from 'src/types'
import { api } from '../api'
import { getUserCdopm } from '../auth'

/* eslint-disable camelcase */
interface AddPendence {
  cdopm?: string
  register: {
    id?: number
    sjd_ref: number,
    sjd_ref_ano?: number,
  }
  proc: string,
  pendencias: string[],
  state: any[]
}

export async function getPendenceById (id: string, debug = false): Promise<any[] | undefined> {
  const { data, ok } = await api.get(`${pendenciasRoute}/${id}`, { silent: true, debug })
  if (ok) {
    const { state } = data as Pendencia
    return state ?? []
  }
}

export async function addPendence ({ pendencias, proc, register, state, cdopm }:AddPendence, debug = false): Promise<Pendencia> {
  const opmCode = cdopm || getUserCdopm()

  const pendencia: Pendencia = {
    cdopm: opmCode,
    id_proc: Number(register.id),
    sjd_ref: register.sjd_ref,
    sjd_ref_ano: register.sjd_ref_ano || new Date().getFullYear(),
    proc,
    pendencias,
    state
  }
  const { data } = await api.post(pendenciasRoute, pendencia, { silent: true, debug })
  const response = data as Pendencia

  return response
}

export async function removePendence (id: string, debug = false) {
  const { ok } = await api.delete(`${pendenciasRoute}/${id}`, { silent: true, debug })
  if (ok) LocalStorage.remove('incompleto')
}

export function incompleteProc (root: any, incompleteId: string) {
  const actualRoute = root.$route.fullPath
  root.$router.push({ query: { incompleto: incompleteId } })
  LocalStorage.set('incompleto', `${String(actualRoute)}?incompleto=${incompleteId}`)
}
