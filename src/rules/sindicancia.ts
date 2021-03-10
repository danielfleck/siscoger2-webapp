import { RequiredFields, Rules } from './'

export const sindicanciaRules: Rules = {
  toShow: {
    permissions: [/* 'listar-sindicancia', 'ver-sindicancia' */],
    roles: []
  },
  toCreate: {
    permissions: [/* 'criar-sindicancia' */],
    roles: []
  },
  toEdit: {
    permissions: [/* 'editar-sindicancia' */],
    roles: []
  },
  toDelete: {
    permissions: [/* 'apagar-sindicancia' */],
    roles: []
  },
  toRestore: {
    permissions: [/* 'restaurar-sindicancia' */],
    roles: []
  },
  toForceDelete: {
    permissions: [/* 'apagar-definitivo-sindicancia' */],
    roles: []
  }
}

export const sindicanciaRequiredFields: RequiredFields = {
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
