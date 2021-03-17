import { RequiredFields, Rules } from '..'

export const userRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-user', 'ver-user' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-user' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-user' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-user' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-user' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-user' */
    ],
    roles: []
  }
}

export const userRequiredFields: RequiredFields = {
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
