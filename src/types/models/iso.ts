/* eslint-disable camelcase */
export type Iso = {
  id?: number;
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
};
