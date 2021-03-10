import { RequiredFields, Rules } from './'

export const cdRules: Rules = {
  toShow: {
    permissions: [/* 'listar-cd', 'ver-cd' */],
    roles: []
  },
  toCreate: {
    permissions: [/* 'criar-cd' */],
    roles: []
  },
  toEdit: {
    permissions: [/* 'editar-cd' */],
    roles: []
  },
  toDelete: {
    permissions: [/* 'apagar-cd' */],
    roles: []
  },
  toRestore: {
    permissions: [/* 'restaurar-cd' */],
    roles: []
  },
  toForceDelete: {
    permissions: [/* 'apagar-definitivo-cd' */],
    roles: []
  }
}

export const cdRequiredFields: RequiredFields = {
  toCreate: [
    'motivo_cancelamento',
    'doc_origem_txt',
    'opm',
    'portaria_numero',
    'sintese_txt',
    'portaria_data',
    'prorogacao_dias',
    'motivo_outros',
    'sindicante',
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
    'sindicante',
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
    'sindicante',
    'escrivao'
  ]
}
