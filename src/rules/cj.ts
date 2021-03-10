import { RequiredFields, Rules } from './'

export const cjRules: Rules = {
  toShow: {
    permissions: [/* 'listar-cj', 'ver-cj' */],
    roles: []
  },
  toCreate: {
    permissions: [/* 'criar-cj' */],
    roles: []
  },
  toEdit: {
    permissions: [/* 'editar-cj' */],
    roles: []
  },
  toDelete: {
    permissions: [/* 'apagar-cj' */],
    roles: []
  },
  toRestore: {
    permissions: [/* 'restaurar-cj' */],
    roles: []
  },
  toForceDelete: {
    permissions: [/* 'apagar-definitivo-cj' */],
    roles: []
  }
}

export const cjRequiredFields: RequiredFields = {
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
