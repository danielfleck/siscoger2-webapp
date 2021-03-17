import { RequiredFields, Rules } from '../..'

export const desercaoRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-desercao', 'ver-desercao' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-desercao' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-desercao' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-desercao' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-desercao' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-desercao' */
    ],
    roles: []
  }
}

export const desercaoRequiredFields: RequiredFields = {
  toCreate: [
    'decorrenciaconselho',
    'cdopm',
    'fato_data',
    'doc_tipo',
    'doc_numero',
    'termo_exclusao',
    'termo_exclusao_pub',
    'termo_captura',
    'termo_captura_pub',
    'pericia',
    'pericia_pub',
    'termo_inclusao',
    'termo_inclusao_pub',
    'opm_meta4',
    'referenciavajme'
  ],
  toEdit: [
    'decorrenciaconselho',
    'cdopm',
    'fato_data',
    'doc_tipo',
    'doc_numero',
    'termo_exclusao',
    'termo_exclusao_pub',
    'termo_captura',
    'termo_captura_pub',
    'pericia',
    'pericia_pub',
    'termo_inclusao',
    'termo_inclusao_pub',
    'opm_meta4',
    'referenciavajme'
  ],
  toFinalize: [
    'decorrenciaconselho',
    'cdopm',
    'fato_data',
    'doc_tipo',
    'doc_numero',
    'termo_exclusao',
    'termo_exclusao_pub',
    'termo_captura',
    'termo_captura_pub',
    'pericia',
    'pericia_pub',
    'termo_inclusao',
    'termo_inclusao_pub',
    'opm_meta4',
    'referenciavajme'
  ]
}
