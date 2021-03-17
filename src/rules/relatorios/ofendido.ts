import { RequiredFields, Rules } from '..'

export const ofendidoRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-ofendido', 'ver-ofendido' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-ofendido' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-ofendido' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-ofendido' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-ofendido' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-ofendido' */
    ],
    roles: []
  }
}

export const ofendidoRequiredFields: RequiredFields = {
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
