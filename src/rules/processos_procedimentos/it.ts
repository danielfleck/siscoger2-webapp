import { RequiredFields, Rules } from '..'

export const itRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-it', 'ver-it' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-it' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-it' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-it' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-it' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-it' */
    ],
    roles: []
  }
}

export const itRequiredFields: RequiredFields = {
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
