import { RequiredFields, Rules } from '..'

export const presosoutrosRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-presosoutros', 'ver-presosoutros' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-presosoutros' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-presosoutros' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-presosoutros' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-presosoutros' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-presosoutros' */
    ],
    roles: []
  }
}

export const presosoutrosRequiredFields: RequiredFields = {
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
