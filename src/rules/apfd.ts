import { RequiredFields, Rules } from './'

export const apfdRules: Rules = {
  toShow: {
    permissions: [/* 'listar-apfd', 'ver-apfd' */],
    roles: []
  },
  toCreate: {
    permissions: [/* 'criar-apfd' */],
    roles: []
  },
  toEdit: {
    permissions: [/* 'editar-apfd' */],
    roles: []
  },
  toDelete: {
    permissions: [/* 'apagar-apfd' */],
    roles: []
  },
  toRestore: {
    permissions: [/* 'restaurar-apfd' */],
    roles: []
  },
  toForceDelete: {
    permissions: [/* 'apagar-definitivo-apfd' */],
    roles: []
  }
}

export const apfdRequiredFields: RequiredFields = {
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
