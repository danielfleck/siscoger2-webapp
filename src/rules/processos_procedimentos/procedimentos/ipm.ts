import { RequiredFields, Rules } from '../..'

export const ipmRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-ipm', 'ver-ipm' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-ipm' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-ipm' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-ipm' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-ipm' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-ipm' */
    ],
    roles: []
  }
}

export const ipmRequiredFields: RequiredFields = {
  toCreate: [
    'id_andamento',
    'id_andamentocoger',
    'id_municipio',
    'id_situacao',
    'cdopm',
    'opm_sigla',
    'opm_ref',
    'opm_ref_ano',
    'sjd_ref',
    'sjd_ref_ano',
    'abertura_data',
    'fato_data',
    'autuacao_data',
    'crime',
    'tentado',
    'crime_especificar',
    'sintese_txt',
    'relato_enc',
    'relato_enc_data',
    'relato_cmtopm',
    'relato_cmtopm_data',
    'relato_cmtgeral',
    'relato_cmtgeral_data',
    'vajme_ref',
    'justicacomum_ref',
    'vitima',
    'confronto_armado_bl',
    'vitima_qtdd',
    'julgamento',
    'portaria_numero',
    'exclusao_txt',
    'relato_enc_file',
    'relato_cmtopm_file',
    'relato_cmtgeral_file',
    'defensor_oab',
    'defensor_nome',
    'relcomplementar_file',
    'relcomplementar_data',
    'opm_meta4'
  ],
  toEdit: [
    'id_andamento',
    'id_andamentocoger',
    'id_municipio',
    'id_situacao',
    'cdopm',
    'opm_sigla',
    'opm_ref',
    'opm_ref_ano',
    'sjd_ref',
    'sjd_ref_ano',
    'abertura_data',
    'fato_data',
    'autuacao_data',
    'crime',
    'tentado',
    'crime_especificar',
    'sintese_txt',
    'relato_enc',
    'relato_enc_data',
    'relato_cmtopm',
    'relato_cmtopm_data',
    'relato_cmtgeral',
    'relato_cmtgeral_data',
    'vajme_ref',
    'justicacomum_ref',
    'vitima',
    'confronto_armado_bl',
    'vitima_qtdd',
    'julgamento',
    'portaria_numero',
    'exclusao_txt',
    'relato_enc_file',
    'relato_cmtopm_file',
    'relato_cmtgeral_file',
    'defensor_oab',
    'defensor_nome',
    'relcomplementar_file',
    'relcomplementar_data',
    'opm_meta4'
  ],
  toFinalize: [
    'id_andamento',
    'id_andamentocoger',
    'id_municipio',
    'id_situacao',
    'cdopm',
    'opm_sigla',
    'opm_ref',
    'opm_ref_ano',
    'sjd_ref',
    'sjd_ref_ano',
    'abertura_data',
    'fato_data',
    'autuacao_data',
    'crime',
    'tentado',
    'crime_especificar',
    'sintese_txt',
    'relato_enc',
    'relato_enc_data',
    'relato_cmtopm',
    'relato_cmtopm_data',
    'relato_cmtgeral',
    'relato_cmtgeral_data',
    'vajme_ref',
    'justicacomum_ref',
    'vitima',
    'confronto_armado_bl',
    'vitima_qtdd',
    'julgamento',
    'portaria_numero',
    'exclusao_txt',
    'relato_enc_file',
    'relato_cmtopm_file',
    'relato_cmtgeral_file',
    'defensor_oab',
    'defensor_nome',
    'relcomplementar_file',
    'relcomplementar_data',
    'opm_meta4'
  ]
}
