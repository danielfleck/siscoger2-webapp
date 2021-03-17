import { RequiredFields, Rules } from '..'

export const saiRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-sai', 'ver-sai' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-sai' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-sai' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-sai' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-sai' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-sai' */
    ],
    roles: []
  }
}

export const saiRequiredFields: RequiredFields = {
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
