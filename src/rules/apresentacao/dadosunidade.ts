import { RequiredFields, Rules } from '..'

export const dadosunidadeRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-dadosunidade', 'ver-dadosunidade' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-dadosunidade' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-dadosunidade' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-dadosunidade' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-dadosunidade' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-dadosunidade' */
    ],
    roles: []
  }
}

export const dadosunidadeRequiredFields: RequiredFields = {
  toCreate: [],
  toEdit: [],
  toFinalize: []
}
