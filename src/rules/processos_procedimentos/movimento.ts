import { RequiredFields, Rules } from '..'

export const movimentoRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-movimento', 'ver-movimento' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-movimento' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-movimento' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-movimento' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-movimento' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-movimento' */
    ],
    roles: []
  }
}

export const movimentoRequiredFields: RequiredFields = {
  toCreate: [
    'id_motivoconselho',
    'id_decorrenciaconselho',
    'id_situacaoconselho',
    'outromotivo',
    'portaria_numero',
    'sintese_txt',
    'portaria_data'
  ],
  toEdit: [
    'id_motivoconselho',
    'id_decorrenciaconselho',
    'id_situacaoconselho',
    'outromotivo',
    'portaria_numero',
    'sintese_txt',
    'portaria_data'
  ],
  toFinalize: [
    'id_motivoconselho',
    'id_decorrenciaconselho',
    'id_situacaoconselho',
    'outromotivo',
    'portaria_numero',
    'sintese_txt',
    'portaria_data'
  ]
}
