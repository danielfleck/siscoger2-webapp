import { RequiredFields, Rules } from './'

export const logRules: Rules = {
  toShow: {
    permissions: [/* 'listar-log', 'ver-log' */],
    roles: []
  },
  toCreate: {
    permissions: [/* 'criar-log' */],
    roles: []
  },
  toEdit: {
    permissions: [/* 'editar-log' */],
    roles: []
  },
  toDelete: {
    permissions: [/* 'apagar-log' */],
    roles: []
  },
  toRestore: {
    permissions: [/* 'restaurar-log' */],
    roles: []
  },
  toForceDelete: {
    permissions: [/* 'apagar-definitivo-log' */],
    roles: []
  }
}

export const logRequiredFields: RequiredFields = {
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
