import { RequiredFields, Rules } from '..'

export const permissionRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-permission', 'ver-permission' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-permission' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-permission' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-permission' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-permission' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-permission' */
    ],
    roles: []
  }
}

export const permissionRequiredFields: RequiredFields = {
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
