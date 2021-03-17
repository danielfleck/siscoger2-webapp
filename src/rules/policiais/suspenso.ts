import { RequiredFields, Rules } from '..'

export const policialsuspensoRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-policialsuspenso', 'ver-policialsuspenso' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-policialsuspenso' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-policialsuspenso' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-policialsuspenso' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-policialsuspenso' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-policialsuspenso' */
    ],
    roles: []
  }
}

export const policialsuspensoRequiredFields: RequiredFields = {
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
