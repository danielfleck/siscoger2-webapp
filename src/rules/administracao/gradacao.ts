import { RequiredFields, Rules } from '..'

export const gradacaoRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-gradacao', 'ver-gradacao' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-gradacao' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-gradacao' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-gradacao' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-gradacao' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-gradacao' */
    ],
    roles: []
  }
}

export const gradacaoRequiredFields: RequiredFields = {
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
