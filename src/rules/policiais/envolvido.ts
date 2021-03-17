import { RequiredFields, Rules } from '..'

export const envolvidoRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-envolvido', 'ver-envolvido' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-envolvido' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-envolvido' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-envolvido' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-envolvido' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-envolvido' */
    ],
    roles: []
  }
}

export const envolvidoRequiredFields: RequiredFields = {
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
