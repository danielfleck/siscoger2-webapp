import { RequiredFields, Rules } from './'

export const situacaoRules: Rules = {
  toShow: {
    permissions: [/* 'listar-situacao', 'ver-situacao' */],
    roles: []
  },
  toCreate: {
    permissions: [/* 'criar-situacao' */],
    roles: []
  },
  toEdit: {
    permissions: [/* 'editar-situacao' */],
    roles: []
  },
  toDelete: {
    permissions: [/* 'apagar-situacao' */],
    roles: []
  },
  toRestore: {
    permissions: [/* 'restaurar-situacao' */],
    roles: []
  },
  toForceDelete: {
    permissions: [/* 'apagar-definitivo-situacao' */],
    roles: []
  }
}

export const situacaoRequiredFields: RequiredFields = {
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
