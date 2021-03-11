import { RequiredFields, Rules } from './'

export const recursoRules: Rules = {
  toShow: {
    permissions: [/* 'listar-recurso', 'ver-recurso' */],
    roles: []
  },
  toCreate: {
    permissions: [/* 'criar-recurso' */],
    roles: []
  },
  toEdit: {
    permissions: [/* 'editar-recurso' */],
    roles: []
  },
  toDelete: {
    permissions: [/* 'apagar-recurso' */],
    roles: []
  },
  toRestore: {
    permissions: [/* 'restaurar-recurso' */],
    roles: []
  },
  toForceDelete: {
    permissions: [/* 'apagar-definitivo-recurso' */],
    roles: []
  }
}

export const recursoRequiredFields: RequiredFields = {
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
