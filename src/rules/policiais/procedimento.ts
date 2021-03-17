import { RequiredFields, Rules } from '..'

export const policialprocedimentoRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-policialprocedimento', 'ver-policialprocedimento' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-policialprocedimento' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-policialprocedimento' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-policialprocedimento' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-policialprocedimento' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-policialprocedimento' */
    ],
    roles: []
  }
}

export const policialprocedimentoRequiredFields: RequiredFields = {
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
