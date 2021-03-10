import { RequiredFields, Rules } from './'

export const cdRules: Rules = {
  toShow: {
    permissions: [/* 'listar-cd', 'ver-cd' */],
    roles: []
  },
  toCreate: {
    permissions: [/* 'criar-cd' */],
    roles: []
  },
  toEdit: {
    permissions: [/* 'editar-cd' */],
    roles: []
  },
  toDelete: {
    permissions: [/* 'apagar-cd' */],
    roles: []
  },
  toRestore: {
    permissions: [/* 'restaurar-cd' */],
    roles: []
  },
  toForceDelete: {
    permissions: [/* 'apagar-definitivo-cd' */],
    roles: []
  }
}

export const cdRequiredFields: RequiredFields = {
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
