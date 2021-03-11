import { RequiredFields, Rules } from './'

export const sindicanciaRules: Rules = {
  toShow: {
    permissions: [/* 'listar-sindicancia', 'ver-sindicancia' */],
    roles: []
  },
  toCreate: {
    permissions: [/* 'criar-sindicancia' */],
    roles: []
  },
  toEdit: {
    permissions: [/* 'editar-sindicancia' */],
    roles: []
  },
  toDelete: {
    permissions: [/* 'apagar-sindicancia' */],
    roles: []
  },
  toRestore: {
    permissions: [/* 'restaurar-sindicancia' */],
    roles: []
  },
  toForceDelete: {
    permissions: [/* 'apagar-definitivo-sindicancia' */],
    roles: []
  }
}

export const sindicanciaRequiredFields: RequiredFields = {
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
