import { RequiredFields, Rules } from './'

export const reintegradoRules: Rules = {
  toShow: {
    permissions: [/* 'listar-reintegrado', 'ver-reintegrado' */],
    roles: []
  },
  toCreate: {
    permissions: [/* 'criar-reintegrado' */],
    roles: []
  },
  toEdit: {
    permissions: [/* 'editar-reintegrado' */],
    roles: []
  },
  toDelete: {
    permissions: [/* 'apagar-reintegrado' */],
    roles: []
  },
  toRestore: {
    permissions: [/* 'restaurar-reintegrado' */],
    roles: []
  },
  toForceDelete: {
    permissions: [/* 'apagar-definitivo-reintegrado' */],
    roles: []
  }
}

export const reintegradoRequiredFields: RequiredFields = {
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
