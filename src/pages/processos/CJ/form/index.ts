/* eslint-disable camelcase */
import { andamentocj, andamentoCogercj, motivoAberturacj, prorogacao, tipoBoletim } from 'src/config/selects'
export const selects = { andamentoCogercj, andamentocj, motivoAberturacj, prorogacao, tipoBoletim }
export type Register = {
  id?: number
  sintese_txt: string
  prioridade: boolean | number
  id_andamento: number
  id_andamentocoger: string | number
  motivo_cancelamento: string
  doc_origem_txt: string
  fato_data: string | Date
  cdopm: string
  portaria_numero: string
  portaria_data: string | Date
  doc_tipo: string
  doc_numero: string
  abertura_data: string | Date
  prorogacao: string | boolean
  prorogacao_dias: number
  motivo_abertura: string
  motivo_outros: string
  completo: boolean | number
}
