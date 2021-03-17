import { RequiredFields, Rules } from '../..'

export const exclusaojudicialRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-exclusaojudicial', 'ver-exclusaojudicial' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-exclusaojudicial' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-exclusaojudicial' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-exclusaojudicial' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-exclusaojudicial' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-exclusaojudicial' */
    ],
    roles: []
  }
}

export const exclusaojudicialRequiredFields: RequiredFields = {
  toCreate: [
    'rg',
    'cargo',
    'nome',
    'cdopm_quandoexcluido',
    'origem_proc',
    'origem_sjd_ref',
    'origem_sjd_ref_ano',
    'origem_opm',
    'processo',
    'complemento',
    'vara',
    'numerounico',
    'data',
    'exclusao_data',
    'obs_txt',
    'portaria_numero',
    'bg_numero',
    'bg_ano'
  ],
  toEdit: [
    'rg',
    'cargo',
    'nome',
    'cdopm_quandoexcluido',
    'origem_proc',
    'origem_sjd_ref',
    'origem_sjd_ref_ano',
    'origem_opm',
    'processo',
    'complemento',
    'vara',
    'numerounico',
    'data',
    'exclusao_data',
    'obs_txt',
    'portaria_numero',
    'bg_numero',
    'bg_ano'
  ],
  toFinalize: [
    'rg',
    'cargo',
    'nome',
    'cdopm_quandoexcluido',
    'origem_proc',
    'origem_sjd_ref',
    'origem_sjd_ref_ano',
    'origem_opm',
    'processo',
    'complemento',
    'vara',
    'numerounico',
    'data',
    'exclusao_data',
    'obs_txt',
    'portaria_numero',
    'bg_numero',
    'bg_ano'
  ]
}
