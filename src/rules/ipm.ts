import { RequiredFields, Rules } from './'

export const ipmRules: Rules = {
  toShow: {
    permissions: [/* 'listar-ipm', 'ver-ipm' */],
    roles: []
  },
  toCreate: {
    permissions: [/* 'criar-ipm' */],
    roles: []
  },
  toEdit: {
    permissions: [/* 'editar-ipm' */],
    roles: []
  },
  toDelete: {
    permissions: [/* 'apagar-ipm' */],
    roles: []
  },
  toRestore: {
    permissions: [/* 'restaurar-ipm' */],
    roles: []
  },
  toForceDelete: {
    permissions: [/* 'apagar-definitivo-ipm' */],
    roles: []
  }
}

export const ipmRequiredFields: RequiredFields = {
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
