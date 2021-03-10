import { RequiredFields, Rules } from './'

export const respcivilRules: Rules = {
  toShow: {
    permissions: [/* 'listar-respcivil', 'ver-respcivil' */],
    roles: []
  },
  toCreate: {
    permissions: [/* 'criar-respcivil' */],
    roles: []
  },
  toEdit: {
    permissions: [/* 'editar-respcivil' */],
    roles: []
  },
  toDelete: {
    permissions: [/* 'apagar-respcivil' */],
    roles: []
  },
  toRestore: {
    permissions: [/* 'restaurar-respcivil' */],
    roles: []
  },
  toForceDelete: {
    permissions: [/* 'apagar-definitivo-respcivil' */],
    roles: []
  }
}

export const respcivilRequiredFields: RequiredFields = {
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
