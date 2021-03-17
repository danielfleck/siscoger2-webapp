import { RequiredFields, Rules } from '..'

export const policialeprotocoloRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-policialeprotocolo', 'ver-policialeprotocolo' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-policialeprotocolo' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-policialeprotocolo' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-policialeprotocolo' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-policialeprotocolo' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-policialeprotocolo' */
    ],
    roles: []
  }
}

export const policialeprotocoloRequiredFields: RequiredFields = {
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
