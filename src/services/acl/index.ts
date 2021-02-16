import { Permission } from 'src/types/permission'
import { Role } from 'src/types/role'
import { getPermissions, getRoles } from '../auth'

export const acl = {
  hasAnyRole (roles: Role[]): boolean {
    if (!roles.length) return true

    const userRoles = getRoles()
    if (!userRoles.length) return false

    roles.forEach(({ role }) => {
      if (userRoles.includes(role)) {
        return true
      }
    })
    return false
  },
  hasAnyPermission (permissions: Permission[]):boolean {
    if (!permissions.length) return true

    const userPermissions = getPermissions()
    if (!userPermissions.length) return false

    permissions.forEach(({ permission }) => {
      if (userPermissions.includes(permission)) {
        return true
      }
    })
    return false
  },
  hasAnyRoleOrPermission ({ roles, permissions }: { roles: Role[], permissions: Permission[]}):boolean {
    const hasRole = this.hasAnyRole(roles)
    const hasPermission = this.hasAnyPermission(permissions)
    return hasRole || hasPermission
  }
}
