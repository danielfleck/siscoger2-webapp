import { RequiredFields, Rules } from '..'

export const saidiligenciaRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-saidiligencia', 'ver-saidiligencia' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-saidiligencia' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-saidiligencia' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-saidiligencia' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-saidiligencia' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-saidiligencia' */
    ],
    roles: []
  }
}

export const saidiligenciaRequiredFields: RequiredFields = {
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
