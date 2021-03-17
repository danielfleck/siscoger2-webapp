import { RequiredFields, Rules } from '..'

export const policialmedalhaRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-policialmedalha', 'ver-policialmedalha' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-policialmedalha' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-policialmedalha' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-policialmedalha' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-policialmedalha' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-policialmedalha' */
    ],
    roles: []
  }
}

export const policialmedalhaRequiredFields: RequiredFields = {
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
