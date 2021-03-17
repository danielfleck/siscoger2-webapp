import { RequiredFields, Rules } from '..'

export const termoRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-termo', 'ver-termo' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-termo' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-termo' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-termo' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-termo' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-termo' */
    ],
    roles: []
  }
}

export const termoRequiredFields: RequiredFields = {
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
