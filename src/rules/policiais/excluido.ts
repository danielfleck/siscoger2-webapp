import { RequiredFields, Rules } from '..'

export const policialexcluidoRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-policialexcluido', 'ver-policialexcluido' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-policialexcluido' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-policialexcluido' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-policialexcluido' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-policialexcluido' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-policialexcluido' */
    ],
    roles: []
  }
}

export const policialexcluidoRequiredFields: RequiredFields = {
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
