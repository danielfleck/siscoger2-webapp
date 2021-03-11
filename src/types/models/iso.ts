/* eslint-disable camelcase */
export type Iso = {
  id?: number
  id_andamento: number
  id_andamentocoger: number
  sjd_ref: number
  sjd_ref_ano: number
  cdopm: string
  fato_data: Date
  abertura_data: Date
  sintese_txt: string
  tipo_penal: string
  doc_tipo: string
  doc_numero: string
  portaria_numero: string
  portaria_data: Date
  exclusao_txt: string
  opm_meta4: string
  relatoriomedico_file: string
  relatoriomedico_data: Date
  solucaoautoridade_file: string
  solucaoautoridade_data: Date
  prioridade: boolean
  completo: boolean
};

export const cleanIso = {
  id: 0,
  id_andamento: 0,
  id_andamentocoger: 0,
  id_municipio: 0,
  id_situacao: 0,
  cdopm: '',
  opm_sigla: '',
  opm_ref: 0,
  opm_ref_ano: 0,
  sjd_ref: 0,
  sjd_ref_ano: 0,
  abertura_data: new Date(),
  fato_data: new Date(),
  autuacao_data: new Date(),
  crime: '',
  tentado: '',
  crime_especificar: '',
  sintese_txt: '', // text
  relato_enc: '',
  relato_enc_data: new Date(),
  relato_cmtopm: '',
  relato_cmtopm_data: new Date(),
  relato_cmtgeral: '',
  relato_cmtgeral_data: new Date(),
  vajme_ref: '',
  justicacomum_ref: '',
  vitima: '',
  confronto_armado_bl: '',
  vitima_qtdd: 0,
  julgamento: '',
  portaria_numero: '',
  exclusao_txt: '', // text
  relato_enc_file: '',
  relato_cmtopm_file: '',
  relato_cmtgeral_file: '',
  defensor_oab: '',
  defensor_nome: '',
  relcomplementar_file: '',
  relcomplementar_data: new Date(),
  opm_meta4: '',
  bou_ano: 0,
  bou_numero: 0,
  prioridade: 0,
  completo: false,
  tipo_penal: '',
  doc_tipo: '',
  doc_numero: '',
  portaria_data: new Date()
}
