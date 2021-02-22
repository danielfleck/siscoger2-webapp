import { getPermissions, getRoles } from '../auth'

export const acl = {
  hasAnyRole (roles: string[], sessionRoles?: string[]): boolean {
    if (!roles.length) return true

    const userRoles = sessionRoles?.length ? sessionRoles : getRoles()
    if (!userRoles.length) return false

    roles.forEach((role) => {
      if (userRoles.includes(role)) {
        return true
      }
    })
    return false
  },
  hasAnyPermission (permissions: string[], sessionPermissions?: string[]):boolean {
    if (!permissions.length) return true

    const userPermissions = sessionPermissions?.length ? sessionPermissions : getPermissions()
    if (!userPermissions.length) return false

    permissions.forEach((permission) => {
      if (userPermissions.includes(permission)) {
        return true
      }
    })
    return false
  },
  hasAnyRoleOrPermission ({ roles, permissions }: { roles: string[], permissions: string[]}):boolean {
    const hasRole = this.hasAnyRole(roles)
    const hasPermission = this.hasAnyPermission(permissions)

    if (roles.length && permissions.length) return hasRole || hasPermission
    if (!roles.length && permissions.length) return hasPermission
    return hasRole
  }
}
