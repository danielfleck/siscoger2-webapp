import { RequiredFields, Rules } from './'

export const cjRules: Rules = {
  toShow: {
    permissions: [/* 'listar-cj', 'ver-cj' */],
    roles: []
  },
  toCreate: {
    permissions: [/* 'criar-cj' */],
    roles: []
  },
  toEdit: {
    permissions: [/* 'editar-cj' */],
    roles: []
  },
  toDelete: {
    permissions: [/* 'apagar-cj' */],
    roles: []
  },
  toRestore: {
    permissions: [/* 'restaurar-cj' */],
    roles: []
  },
  toForceDelete: {
    permissions: [/* 'apagar-definitivo-cj' */],
    roles: []
  }
}

export const cjRequiredFields: RequiredFields = {
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
