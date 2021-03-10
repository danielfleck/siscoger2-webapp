import { RequiredFields, Rules } from './'

export const uploadRules: Rules = {
  toShow: {
    permissions: [/* 'listar-upload', 'ver-upload' */],
    roles: []
  },
  toCreate: {
    permissions: [/* 'criar-upload' */],
    roles: []
  },
  toEdit: {
    permissions: [/* 'editar-upload' */],
    roles: []
  },
  toDelete: {
    permissions: [/* 'apagar-upload' */],
    roles: []
  },
  toRestore: {
    permissions: [/* 'restaurar-upload' */],
    roles: []
  },
  toForceDelete: {
    permissions: [/* 'apagar-definitivo-upload' */],
    roles: []
  }
}

export const uploadRequiredFields: RequiredFields = {
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
