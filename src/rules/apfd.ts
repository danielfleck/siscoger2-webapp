import { RequiredFields, Rules } from './'

export const apfdRules: Rules = {
  toShow: {
    permissions: [/* 'listar-apfd', 'ver-apfd' */],
    roles: []
  },
  toCreate: {
    permissions: [/* 'criar-apfd' */],
    roles: []
  },
  toEdit: {
    permissions: [/* 'editar-apfd' */],
    roles: []
  },
  toDelete: {
    permissions: [/* 'apagar-apfd' */],
    roles: []
  },
  toRestore: {
    permissions: [/* 'restaurar-apfd' */],
    roles: []
  },
  toForceDelete: {
    permissions: [/* 'apagar-definitivo-apfd' */],
    roles: []
  }
}

export const apfdRequiredFields: RequiredFields = {
  toCreate: [
    'tipo',
    'cdopm',
    'fato_data',
    'sintese_txt',
    'tipo_penal',
    'tipo_penal_novo',
    'especificar',
    'doc_tipo',
    'doc_numero',
    'exclusao_txt',
    'opm_meta4',
    'referenciavajme'
  ],
  toEdit: [
    'tipo',
    'cdopm',
    'fato_data',
    'sintese_txt',
    'tipo_penal',
    'tipo_penal_novo',
    'especificar',
    'doc_tipo',
    'doc_numero',
    'exclusao_txt',
    'opm_meta4',
    'referenciavajme'
  ],
  toFinalize: [
    'tipo',
    'cdopm',
    'fato_data',
    'sintese_txt',
    'tipo_penal',
    'tipo_penal_novo',
    'especificar',
    'doc_tipo',
    'doc_numero',
    'exclusao_txt',
    'opm_meta4',
    'referenciavajme'
  ]
}
