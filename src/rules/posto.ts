import { RequiredFields, Rules } from './'

export const postoRules: Rules = {
  toShow: {
    permissions: [/* 'listar-posto', 'ver-posto' */],
    roles: []
  },
  toCreate: {
    permissions: [/* 'criar-posto' */],
    roles: []
  },
  toEdit: {
    permissions: [/* 'editar-posto' */],
    roles: []
  },
  toDelete: {
    permissions: [/* 'apagar-posto' */],
    roles: []
  },
  toRestore: {
    permissions: [/* 'restaurar-posto' */],
    roles: []
  },
  toForceDelete: {
    permissions: [/* 'apagar-definitivo-posto' */],
    roles: []
  }
}

export const postoRequiredFields: RequiredFields = {
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
