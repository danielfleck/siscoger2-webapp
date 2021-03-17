import { RequiredFields, Rules } from '../..'

export const adlRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-adl', 'ver-adl' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-adl' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-adl' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-adl' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-adl' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-adl' */
    ],
    roles: []
  }
}

export const adlRequiredFields: RequiredFields = {
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
