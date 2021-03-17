import { RequiredFields, Rules } from '../..'

export const isoRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-iso', 'ver-iso' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-iso' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-iso' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-iso' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-iso' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-iso' */
    ],
    roles: []
  }
}

export const isoRequiredFields: RequiredFields = {
  toCreate: [
    'motivo_cancelamento',
    'doc_origem_txt',
    'opm',
    'portaria_numero',
    'sintese_txt',
    'portaria_data',
    'prorogacao_dias',
    'motivo_outros',
    'Encarregado'
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
    'Encarregado'
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
    'Encarregado'
  ]
}
