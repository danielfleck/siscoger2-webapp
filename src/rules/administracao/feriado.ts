import { RequiredFields, Rules } from '..'

export const feriadoRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-feriado', 'ver-feriado' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-feriado' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-feriado' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-feriado' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-feriado' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-feriado' */
    ],
    roles: []
  }
}

export const feriadoRequiredFields: RequiredFields = {
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
