/* eslint-disable camelcase */
import { andamentoCogerSindicancia, andamentoSindicancia, motivoAberturaSindicancia, prorogacao, tipoBoletim } from 'src/config/selects'
export const selects = { andamentoCogerSindicancia, andamentoSindicancia, motivoAberturaSindicancia, prorogacao, tipoBoletim }
export type Register = {
  id?: number
  sintese_txt: string
  prioridade: boolean | number
  id_andamento: 6
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
  prorogacao: string
  prorogacao_dias: number
  motivo_abertura: string
  motivo_outros: string
  completo: boolean | number
}
