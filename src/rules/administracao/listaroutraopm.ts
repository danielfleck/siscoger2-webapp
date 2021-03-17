import { RequiredFields, Rules } from '..'

export const listaroutraRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-listaroutra', 'ver-listaroutra' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-listaroutra' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-listaroutra' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-listaroutra' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-listaroutra' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-listaroutra' */
    ],
    roles: []
  }
}

export const listaroutraRequiredFields: RequiredFields = {
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
