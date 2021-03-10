import { RequiredFields, Rules } from './'

export const roleRules: Rules = {
  toShow: {
    permissions: [/* 'listar-role', 'ver-role' */],
    roles: []
  },
  toCreate: {
    permissions: [/* 'criar-role' */],
    roles: []
  },
  toEdit: {
    permissions: [/* 'editar-role' */],
    roles: []
  },
  toDelete: {
    permissions: [/* 'apagar-role' */],
    roles: []
  },
  toRestore: {
    permissions: [/* 'restaurar-role' */],
    roles: []
  },
  toForceDelete: {
    permissions: [/* 'apagar-definitivo-role' */],
    roles: []
  }
}

export const roleRequiredFields: RequiredFields = {
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
