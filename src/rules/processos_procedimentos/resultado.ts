import { RequiredFields, Rules } from '..'

export const resultadoRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-resultado', 'ver-resultado' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-resultado' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-resultado' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-resultado' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-resultado' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-resultado' */
    ],
    roles: []
  }
}

export const resultadoRequiredFields: RequiredFields = {
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
