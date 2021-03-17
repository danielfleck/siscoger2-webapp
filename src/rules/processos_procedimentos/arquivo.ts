import { RequiredFields, Rules } from '..'

export const arquivoRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-arquivo', 'ver-arquivo' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-arquivo' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-arquivo' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-arquivo' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-arquivo' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-arquivo' */
    ],
    roles: []
  }
}

export const arquivoRequiredFields: RequiredFields = {
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
