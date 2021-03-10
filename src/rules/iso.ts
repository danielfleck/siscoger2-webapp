import { RequiredFields, Rules } from './'

export const isoRules: Rules = {
  toShow: {
    permissions: [/* 'listar-iso', 'ver-iso' */],
    roles: []
  },
  toCreate: {
    permissions: [/* 'criar-iso' */],
    roles: []
  },
  toEdit: {
    permissions: [/* 'editar-iso' */],
    roles: []
  },
  toDelete: {
    permissions: [/* 'apagar-iso' */],
    roles: []
  },
  toRestore: {
    permissions: [/* 'restaurar-iso' */],
    roles: []
  },
  toForceDelete: {
    permissions: [/* 'apagar-definitivo-iso' */],
    roles: []
  }
}

export const isoRequiredFields: RequiredFields = {
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
