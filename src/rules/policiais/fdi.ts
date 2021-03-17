import { RequiredFields, Rules } from '..'

export const fdiRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-fdi', 'ver-fdi' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-fdi' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-fdi' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-fdi' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-fdi' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-fdi' */
    ],
    roles: []
  }
}

export const fdiRequiredFields: RequiredFields = {
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
