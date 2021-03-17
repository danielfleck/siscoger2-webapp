import { RequiredFields, Rules } from '..'

export const acessoRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-acesso', 'ver-acesso' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-acesso' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-acesso' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-acesso' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-acesso' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-acesso' */
    ],
    roles: []
  }
}

export const acessoRequiredFields: RequiredFields = {
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
