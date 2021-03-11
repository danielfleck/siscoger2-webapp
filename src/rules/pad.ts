import { RequiredFields, Rules } from './'

export const padRules: Rules = {
  toShow: {
    permissions: [/* 'listar-pad', 'ver-pad' */],
    roles: []
  },
  toCreate: {
    permissions: [/* 'criar-pad' */],
    roles: []
  },
  toEdit: {
    permissions: [/* 'editar-pad' */],
    roles: []
  },
  toDelete: {
    permissions: [/* 'apagar-pad' */],
    roles: []
  },
  toRestore: {
    permissions: [/* 'restaurar-pad' */],
    roles: []
  },
  toForceDelete: {
    permissions: [/* 'apagar-definitivo-pad' */],
    roles: []
  }
}

export const padRequiredFields: RequiredFields = {
  toCreate: [
    'motivo_cancelamento',
    'doc_origem_txt',
    'opm',
    'portaria_numero',
    'sintese_txt',
    'portaria_data',
    'prorogacao_dias',
    'motivo_outros',
    'Presidente',
    'escrivao'
  ],
  toEdit: [
    'motivo_cancelamento',
    'doc_origem_txt',
    'opm',
    'portaria_numero',
    'sintese_txt',
    'portaria_data',
    'prorogacao_dias',
    'motivo_outros',
    'Presidente',
    'escrivao'
  ],
  toFinalize: [
    'motivo_cancelamento',
    'doc_origem_txt',
    'opm',
    'portaria_numero',
    'sintese_txt',
    'portaria_data',
    'prorogacao_dias',
    'motivo_outros',
    'Presidente',
    'escrivao'
  ]
}
