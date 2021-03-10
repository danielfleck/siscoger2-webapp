import { RequiredFields, Rules } from './'

export const decorrenciaconselhoRules: Rules = {
  toShow: {
    permissions: [/* 'listar-decorrenciaconselho', 'ver-decorrenciaconselho' */],
    roles: []
  },
  toCreate: {
    permissions: [/* 'criar-decorrenciaconselho' */],
    roles: []
  },
  toEdit: {
    permissions: [/* 'editar-decorrenciaconselho' */],
    roles: []
  },
  toDelete: {
    permissions: [/* 'apagar-decorrenciaconselho' */],
    roles: []
  },
  toRestore: {
    permissions: [/* 'restaurar-decorrenciaconselho' */],
    roles: []
  },
  toForceDelete: {
    permissions: [/* 'apagar-definitivo-decorrenciaconselho' */],
    roles: []
  }
}

export const decorrenciaconselhoRequiredFields: RequiredFields = {
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
