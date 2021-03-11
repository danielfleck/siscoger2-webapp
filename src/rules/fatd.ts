import { RequiredFields, Rules } from './'

export const fatdRules: Rules = {
  toShow: {
    permissions: [/* 'listar-fatd', 'ver-fatd' */],
    roles: []
  },
  toCreate: {
    permissions: [/* 'criar-fatd' */],
    roles: []
  },
  toEdit: {
    permissions: [/* 'editar-fatd' */],
    roles: []
  },
  toDelete: {
    permissions: [/* 'apagar-fatd' */],
    roles: []
  },
  toRestore: {
    permissions: [/* 'restaurar-fatd' */],
    roles: []
  },
  toForceDelete: {
    permissions: [/* 'apagar-definitivo-fatd' */],
    roles: []
  }
}

export const fatdRequiredFields: RequiredFields = {
  toCreate: [
    'id_andamento',
    'id_andamentocoger',
    'sjd_ref',
    'sjd_ref_ano',
    'fato_data',
    'abertura_data',
    'sintese_txt',
    'cdopm',
    'doc_tipo',
    'doc_numero',
    'doc_origem_txt',
    'despacho_numero',
    'portaria_data',
    'fato_file',
    'relatorio_file',
    'sol_cmt_file',
    'sol_cg_file',
    'rec_ato_file',
    'rec_cmt_file',
    'rec_crpm_file',
    'rec_cg_file',
    'opm_meta4',
    'notapunicao_file',
    'publicacaonp',
    'prioridade',
    'situacao_fatd',
    'motivo_fatd',
    'motivo_outros'
  ],
  toEdit: [
    'id_andamento',
    'id_andamentocoger',
    'sjd_ref',
    'sjd_ref_ano',
    'fato_data',
    'abertura_data',
    'sintese_txt',
    'cdopm',
    'doc_tipo',
    'doc_numero',
    'doc_origem_txt',
    'despacho_numero',
    'portaria_data',
    'fato_file',
    'relatorio_file',
    'sol_cmt_file',
    'sol_cg_file',
    'rec_ato_file',
    'rec_cmt_file',
    'rec_crpm_file',
    'rec_cg_file',
    'opm_meta4',
    'notapunicao_file',
    'publicacaonp',
    'prioridade',
    'situacao_fatd',
    'motivo_fatd',
    'motivo_outros'
  ],
  toFinalize: [
    'id_andamento',
    'id_andamentocoger',
    'sjd_ref',
    'sjd_ref_ano',
    'fato_data',
    'abertura_data',
    'sintese_txt',
    'cdopm',
    'doc_tipo',
    'doc_numero',
    'doc_origem_txt',
    'despacho_numero',
    'portaria_data',
    'fato_file',
    'relatorio_file',
    'sol_cmt_file',
    'sol_cg_file',
    'rec_ato_file',
    'rec_cmt_file',
    'rec_crpm_file',
    'rec_cg_file',
    'opm_meta4',
    'notapunicao_file',
    'publicacaonp',
    'prioridade',
    'situacao_fatd',
    'motivo_fatd',
    'motivo_outros'
  ]
}
