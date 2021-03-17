import { RequiredFields, Rules } from '..'

export const andamentocogerRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-andamentocoger', 'ver-andamentocoger' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-andamentocoger' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-andamentocoger' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-andamentocoger' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-andamentocoger' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-andamentocoger' */
    ],
    roles: []
  }
}

export const andamentocogerRequiredFields: RequiredFields = {
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
