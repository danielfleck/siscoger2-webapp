import { RequiredFields, Rules } from '..'

export const ligacaoRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-ligacao', 'ver-ligacao' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-ligacao' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-ligacao' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-ligacao' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-ligacao' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-ligacao' */
    ],
    roles: []
  }
}

export const ligacaoRequiredFields: RequiredFields = {
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
