import { RequiredFields, Rules } from '..'

export const buscaenvolvidoRules: Rules = {
  toShow: {
    permissions: [
      /* 'listar-buscaenvolvido', 'ver-buscaenvolvido' */
    ],
    roles: []
  },
  toCreate: {
    permissions: [
      /* 'criar-buscaenvolvido' */
    ],
    roles: []
  },
  toEdit: {
    permissions: [
      /* 'editar-buscaenvolvido' */
    ],
    roles: []
  },
  toDelete: {
    permissions: [
      /* 'apagar-buscaenvolvido' */
    ],
    roles: []
  },
  toRestore: {
    permissions: [
      /* 'restaurar-buscaenvolvido' */
    ],
    roles: []
  },
  toForceDelete: {
    permissions: [
      /* 'apagar-definitivo-buscaenvolvido' */
    ],
    roles: []
  }
}

export const buscaenvolvidoRequiredFields: RequiredFields = {
  toCreate: [],
  toEdit: [],
  toFinalize: []
}
