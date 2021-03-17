import { RequiredFields, Rules } from '..'

export const pendenciaRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-pendencia', 'ver-pendencia' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-pendencia' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-pendencia' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-pendencia' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-pendencia' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-pendencia' */
    ],
    roles: []
  }
}

export const pendenciaRequiredFields: RequiredFields = {
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
