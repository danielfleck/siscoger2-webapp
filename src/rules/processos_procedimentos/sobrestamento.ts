import { RequiredFields, Rules } from '..'

export const sobrestamentoRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-sobrestamento', 'ver-sobrestamento' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-sobrestamento' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-sobrestamento' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-sobrestamento' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-sobrestamento' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-sobrestamento' */
    ],
    roles: []
  }
}

export const sobrestamentoRequiredFields: RequiredFields = {
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
