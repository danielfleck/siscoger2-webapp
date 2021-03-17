import { RequiredFields, Rules } from '..'

export const policialelogioRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-policialelogio', 'ver-policialelogio' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-policialelogio' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-policialelogio' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-policialelogio' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-policialelogio' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-policialelogio' */
    ],
    roles: []
  }
}

export const policialelogioRequiredFields: RequiredFields = {
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
