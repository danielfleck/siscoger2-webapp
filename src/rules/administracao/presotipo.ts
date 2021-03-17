import { RequiredFields, Rules } from '..'

export const presotipoRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-presotipo', 'ver-presotipo' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-presotipo' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-presotipo' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-presotipo' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-presotipo' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-presotipo' */
    ],
    roles: []
  }
}

export const presotipoRequiredFields: RequiredFields = {
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
