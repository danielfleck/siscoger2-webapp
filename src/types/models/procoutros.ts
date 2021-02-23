/* eslint-disable camelcase */
export type ProcOutros = {
  id?: number;
  sjd_ref: number;
  sjd_ref_ano: number;
  rg_cadastro: string;
  cdopm: string;
  opm_abreviatura: string;
  cdopm_apuracao: string;
  abertura_data: Date;
  data: Date;
  bou_ano: string;
  bou_numero: string;
  id_municipio: number;
  doc_origem: string;
  num_doc_origem: string;
  motivo_abertura: string;
  sintese_txt: string; // text
  relatorio1: string;
  relatorio1_file: string;
  relatorio1_data: Date;
  relatorio2: string;
  relatorio2_file: string;
  relatorio2_data: Date;
  relatorio3: string;
  relatorio3_file: string;
  relatorio3_data: Date;
  desc_outros: string;
  andamento: string;
  andamentocoger: string;
  vtr1_placa: string;
  vtr1_prefixo: string;
  vtr2_placa: string;
  vtr2_prefixo: string;
  digitador: string;
  num_pid: string;
  limite_data: Date;
};
