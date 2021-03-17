import { RequiredFields, Rules } from '..'

export const policialpunidoRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-policialpunido', 'ver-policialpunido' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-policialpunido' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-policialpunido' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-policialpunido' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-policialpunido' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-policialpunido' */
    ],
    roles: []
  }
}

export const policialpunidoRequiredFields: RequiredFields = {
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
