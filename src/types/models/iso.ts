/* eslint-disable camelcase */
export type Iso = {
  id: number;
  id_andamento: number;
  id_andamentocoger: number;
  id_municipio: number;
  id_situacao: number;
  cdopm: string;
  opm_sigla: string;
  opm_ref: number;
  opm_ref_ano: number;
  sjd_ref: number;
  sjd_ref_ano: number;
  abertura_data: Date;
  fato_data: Date;
  autuacao_data: Date;
  crime: string;
  tentado: string;
  crime_especificar: string;
  sintese_txt: string; // text
  relato_enc: string;
  relato_enc_data: Date;
  relato_cmtopm: string;
  relato_cmtopm_data: Date;
  relato_cmtgeral: string;
  relato_cmtgeral_data: Date;
  vajme_ref: string;
  justicacomum_ref: string;
  vitima: string;
  confronto_armado_bl: string;
  vitima_qtdd: number;
  julgamento: string;
  portaria_numero: string;
  exclusao_txt: string; // text
  relato_enc_file: string;
  relato_cmtopm_file: string;
  relato_cmtgeral_file: string;
  defensor_oab: string;
  defensor_nome: string;
  relcomplementar_file: string;
  relcomplementar_data: Date;
  opm_meta4: string;
  bou_ano: number;
  bou_numero: number;
  prioridade: number;
  completo: boolean;
  tipo_penal: string;
  doc_tipo: string;
  doc_numero: string;
  portaria_data: Date;
  deletedAt?: Date;
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
