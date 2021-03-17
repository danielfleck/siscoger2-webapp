import { RequiredFields, Rules } from '..'

export const sjdRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-sjd', 'ver-sjd' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-sjd' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-sjd' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-sjd' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-sjd' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-sjd' */
    ],
    roles: []
  }
}

export const sjdRequiredFields: RequiredFields = {
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
