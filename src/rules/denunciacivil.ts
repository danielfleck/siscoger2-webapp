import { RequiredFields, Rules } from './'

export const denunciacivilRules: Rules = {
  toShow: {
    permissions: [/* 'listar-denunciacivil', 'ver-denunciacivil' */],
    roles: []
  },
  toCreate: {
    permissions: [/* 'criar-denunciacivil' */],
    roles: []
  },
  toEdit: {
    permissions: [/* 'editar-denunciacivil' */],
    roles: []
  },
  toDelete: {
    permissions: [/* 'apagar-denunciacivil' */],
    roles: []
  },
  toRestore: {
    permissions: [/* 'restaurar-denunciacivil' */],
    roles: []
  },
  toForceDelete: {
    permissions: [/* 'apagar-definitivo-denunciacivil' */],
    roles: []
  }
}

export const denunciacivilRequiredFields: RequiredFields = {
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
