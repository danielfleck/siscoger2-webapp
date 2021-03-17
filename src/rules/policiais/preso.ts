import { RequiredFields, Rules } from '..'

export const presoRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-preso', 'ver-preso' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-preso' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-preso' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-preso' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-preso' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-preso' */
    ],
    roles: []
  }
}

export const presoRequiredFields: RequiredFields = {
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
