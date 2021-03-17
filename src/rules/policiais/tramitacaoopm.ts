import { RequiredFields, Rules } from '..'

export const tramitacaoopmRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-tramitacaoopm', 'ver-tramitacaoopm' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-tramitacaoopm' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-tramitacaoopm' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-tramitacaoopm' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-tramitacaoopm' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-tramitacaoopm' */
    ],
    roles: []
  }
}

export const tramitacaoopmRequiredFields: RequiredFields = {
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
