import { RequiredFields, Rules } from '..'

export const authRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-auth', 'ver-auth' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-auth' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-auth' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-auth' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-auth' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-auth' */
    ],
    roles: []
  }
}

export const authRequiredFields: RequiredFields = {
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
