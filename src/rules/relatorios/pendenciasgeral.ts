import { RequiredFields, Rules } from '..'

export const pendenciasgeralRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-pendenciasgeral', 'ver-pendenciasgeral' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-pendenciasgeral' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-pendenciasgeral' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-pendenciasgeral' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-pendenciasgeral' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-pendenciasgeral' */
    ],
    roles: []
  }
}

export const pendenciasgeralRequiredFields: RequiredFields = {
  toCreate: [],
  toEdit: [],
  toFinalize: []
}
