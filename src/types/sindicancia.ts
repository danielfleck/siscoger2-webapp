/* eslint-disable camelcase */
export type Sindicancia = {
  id?: number
  id_andamentocoger: number
  id_andamento: number
  sjd_ref: number
  sjd_ref_ano: number
  fato_data?: Date
  abertura_data?: Date
  sintese_txt: string
  cdopm: string
  doc_tipo: string
  doc_numero: string
  doc_origem_txt: string
  portaria_numero: string
  portaria_data?: Date
  sol_cmt_file?: string
  sol_cmt_data?: Date
  sol_cmtgeral_file?: string
  sol_cmtgeral_data?: Date
  opm_meta4: string
  relatorio_file: string
  relatorio_data?: Date
  prioridade: boolean
  motivo_cancelamento: string
  motivo_abertura: string
  motivo_outros: string
  prorogacao: boolean
  prorogacao_dias: number
  completo: boolean
  diasuteis_sobrestado?: number
  motivo_sobrestado?: string
  prazo_decorrido?: number
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}
