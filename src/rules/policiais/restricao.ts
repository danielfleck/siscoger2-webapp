import { RequiredFields, Rules } from '..'

export const restricaoRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-restricao', 'ver-restricao' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-restricao' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-restricao' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-restricao' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-restricao' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-restricao' */
    ],
    roles: []
  }
}

export const restricaoRequiredFields: RequiredFields = {
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
