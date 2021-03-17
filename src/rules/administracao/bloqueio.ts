import { RequiredFields, Rules } from '..'

export const bloqueioRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-bloqueio', 'ver-bloqueio' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-bloqueio' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-bloqueio' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-bloqueio' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-bloqueio' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-bloqueio' */
    ],
    roles: []
  }
}

export const bloqueioRequiredFields: RequiredFields = {
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
