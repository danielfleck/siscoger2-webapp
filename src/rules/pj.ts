import { RequiredFields, Rules } from './'

export const pjRules: Rules = {
  toShow: {
    permissions: [/* 'listar-pj', 'ver-pj' */],
    roles: []
  },
  toCreate: {
    permissions: [/* 'criar-pj' */],
    roles: []
  },
  toEdit: {
    permissions: [/* 'editar-pj' */],
    roles: []
  },
  toDelete: {
    permissions: [/* 'apagar-pj' */],
    roles: []
  },
  toRestore: {
    permissions: [/* 'restaurar-pj' */],
    roles: []
  },
  toForceDelete: {
    permissions: [/* 'apagar-definitivo-pj' */],
    roles: []
  }
}

export const pjRequiredFields: RequiredFields = {
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
