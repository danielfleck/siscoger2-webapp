import { RequiredFields, Rules } from './'

export const procoutroRules: Rules = {
  toShow: {
    permissions: [/* 'listar-procoutro', 'ver-procoutro' */],
    roles: []
  },
  toCreate: {
    permissions: [/* 'criar-procoutro' */],
    roles: []
  },
  toEdit: {
    permissions: [/* 'editar-procoutro' */],
    roles: []
  },
  toDelete: {
    permissions: [/* 'apagar-procoutro' */],
    roles: []
  },
  toRestore: {
    permissions: [/* 'restaurar-procoutro' */],
    roles: []
  },
  toForceDelete: {
    permissions: [/* 'apagar-definitivo-procoutro' */],
    roles: []
  }
}

export const procoutroRequiredFields: RequiredFields = {
  toCreate: [
    'motivo_cancelamento',
    'doc_origem_txt',
    'opm',
    'portaria_numero',
    'sintese_txt',
    'portaria_data',
    'prorogacao_dias',
    'motivo_outros',
    'Envolvido',
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
    'Envolvido',
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
    'Envolvido',
    'escrivao'
  ]
}
