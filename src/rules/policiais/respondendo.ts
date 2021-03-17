import { RequiredFields, Rules } from '..'

export const policialrespondendoRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-policialrespondendo', 'ver-policialrespondendo' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-policialrespondendo' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-policialrespondendo' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-policialrespondendo' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-policialrespondendo' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-policialrespondendo' */
    ],
    roles: []
  }
}

export const policialrespondendoRequiredFields: RequiredFields = {
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
