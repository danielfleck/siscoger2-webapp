/* eslint-disable camelcase */
export type Adl = {
  id?: number,
  id_andamento: number;
  id_andamentocoger: number;
  id_motivoconselho: number;
  id_decorrenciaconselho: number;
  id_situacaoconselho: number;
  outromotivo: string;
  cdopm: string;
  fato_data: Date;
  abertura_data: Date;
  sintese_txt: string;
  libelo_file: string;
  doc_tipo: string;
  doc_numero: string;
  portaria_numero: string;
  portaria_data: Date;
  parecer_file: string;
  decisao_file: string;
  doc_prorrogacao: string;
  sjd_ref: number;
  sjd_ref_ano: number;
  prescricao_data: Date;
  parecer_comissao: string;
  parecer_cmtgeral: string;
  exclusao_txt: string;
  rec_ato_file: string;
  rec_gov_file: string;
  ac_desempenho_bl: string;
  ac_conduta_bl: string;
  ac_honra_bl: string;
  tjpr_file: string;
  stj_file: string;
  prioridade: boolean | number;
  completo?: boolean;
  deletedAt?: Date;
}
