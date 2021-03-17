import { RequiredFields, Rules } from '..'

export const tramitacaocogerRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-tramitacaocoger', 'ver-tramitacaocoger' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-tramitacaocoger' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-tramitacaocoger' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-tramitacaocoger' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-tramitacaocoger' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-tramitacaocoger' */
    ],
    roles: []
  }
}

export const tramitacaocogerRequiredFields: RequiredFields = {
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
