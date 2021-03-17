import { RequiredFields, Rules } from '..'

export const cadastroopmcogerRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-cadastroopmcoger', 'ver-cadastroopmcoger' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-cadastroopmcoger' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-cadastroopmcoger' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-cadastroopmcoger' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-cadastroopmcoger' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-cadastroopmcoger' */
    ],
    roles: []
  }
}

export const cadastroopmcogerRequiredFields: RequiredFields = {
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
