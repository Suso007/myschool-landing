// Role Permission Mappings for Frontend Navigation
// Mirrors the backend RolePermissions configuration

import { UserRole } from './types';
import { Permission } from './permissions';

export const RolePermissions: Record<UserRole, Permission[]> = {
    // SUPERADMIN: Full system access
    [UserRole.SUPERADMIN]: [Permission.ALL],

    // TENANT_ADMIN: Full access within their tenant
    [UserRole.TENANT_ADMIN]: [
        Permission.TENANT_READ,
        Permission.TENANT_UPDATE,
        Permission.ORGANIZATION_ALL,
        Permission.BRANCH_ALL,
        Permission.DEPARTMENT_ALL,
        Permission.CATEGORY_ALL,
        Permission.USER_ALL,
        Permission.STAFF_ALL,
        Permission.STUDENT_ALL,
        Permission.ACADEMIC_YEAR_ALL,
        Permission.COURSE_ALL,
        Permission.SUBJECT_ALL,
        Permission.CLASS_ALL,
        Permission.SECTION_ALL,
        Permission.SUBJECT_ALLOCATION_ALL,
        Permission.EXAM_ALL,
        Permission.EXAM_MARKS_ALL,
        Permission.ATTENDANCE_ALL,
        Permission.GRADE_ALL,
        Permission.TIMETABLE_ALL,
        Permission.INVENTORY_ALL,
        Permission.ASSIGNMENT_ALL,
        Permission.REPORTS_ALL,
        Permission.ANALYTICS_READ,
    ],

    // ORG_ADMIN: Organization-level access
    [UserRole.ORG_ADMIN]: [
        Permission.ORGANIZATION_READ,
        Permission.ORGANIZATION_UPDATE,
        Permission.BRANCH_ALL,
        Permission.DEPARTMENT_ALL,
        Permission.CATEGORY_ALL,
        Permission.USER_READ,
        Permission.STAFF_ALL,
        Permission.STUDENT_ALL,
        Permission.COURSE_ALL,
        Permission.SUBJECT_ALL,
        Permission.CLASS_ALL,
        Permission.SECTION_ALL,
        Permission.ACADEMIC_YEAR_ALL,
        Permission.ATTENDANCE_ALL,
        Permission.GRADE_ALL,
        Permission.EXAM_ALL,
        Permission.EXAM_MARKS_ALL,
        Permission.TIMETABLE_ALL,
        Permission.REPORTS_READ,
        Permission.ANALYTICS_READ,
    ],

    // BRANCH_ADMIN: Branch-level access
    [UserRole.BRANCH_ADMIN]: [
        Permission.BRANCH_READ,
        Permission.BRANCH_UPDATE,
        Permission.DEPARTMENT_ALL,
        Permission.CATEGORY_ALL,
        Permission.USER_READ,
        Permission.STAFF_ALL,
        Permission.STUDENT_ALL,
        Permission.COURSE_ALL,
        Permission.SUBJECT_ALL,
        Permission.CLASS_ALL,
        Permission.SECTION_ALL,
        Permission.ACADEMIC_YEAR_READ,
        Permission.ATTENDANCE_ALL,
        Permission.GRADE_ALL,
        Permission.EXAM_ALL,
        Permission.EXAM_MARKS_ALL,
        Permission.TIMETABLE_ALL,
        Permission.REPORTS_READ,
    ],

    // DEPT_ADMIN: Department-level access
    [UserRole.DEPT_ADMIN]: [
        Permission.DEPARTMENT_READ,
        Permission.DEPARTMENT_UPDATE,
        Permission.CATEGORY_ALL,
        Permission.STAFF_READ,
        Permission.STAFF_CREATE,
        Permission.STUDENT_READ,
        Permission.COURSE_ALL,
        Permission.SUBJECT_ALL,
        Permission.CLASS_READ,
        Permission.CLASS_CREATE, Permission.CLASS_UPDATE,
        Permission.ATTENDANCE_READ,
        Permission.ATTENDANCE_CREATE,
        Permission.GRADE_READ,
        Permission.GRADE_CREATE,
        Permission.GRADE_UPDATE,
        Permission.EXAM_READ,
        Permission.TIMETABLE_READ,
    ],

    // STAFF: Limited operational access
    [UserRole.STAFF]: [
        Permission.COURSE_READ,
        Permission.SUBJECT_READ,
        Permission.CLASS_READ,
        Permission.STUDENT_READ,
        Permission.ATTENDANCE_CREATE,
        Permission.ATTENDANCE_READ,
        Permission.GRADE_READ,
        Permission.EXAM_READ,
        Permission.EXAM_MARKS_READ,
        Permission.TIMETABLE_READ,
        Permission.PROFILE_READ,
        Permission.PROFILE_UPDATE,
    ],

    // STUDENT: Personal data access only
    [UserRole.STUDENT]: [
        Permission.PROFILE_READ,
        Permission.PROFILE_UPDATE,
        Permission.ATTENDANCE_READ,
        Permission.EXAM_READ,
        Permission.EXAM_MARKS_READ,
        Permission.GRADE_READ,
        Permission.CLASS_READ,
        Permission.TIMETABLE_READ,
        Permission.COURSE_READ,
        Permission.SUBJECT_READ,
        Permission.ASSIGNMENT_READ,
        Permission.ASSIGNMENT_SUBMIT,
    ],
};

/**
 * Check if a role has a specific permission
 */
export function hasPermission(role: UserRole, permission: Permission): boolean {
    const permissions = RolePermissions[role] || [];

    // Check for wildcard permission
    if (permissions.includes(Permission.ALL)) {
        return true;
    }

    // Check for exact match
    if (permissions.includes(permission)) {
        return true;
    }

    // Check for resource-level wildcard (e.g., 'tenant:*' should match 'tenant:read')
    const permissionStr = permission as string;

    if (!permissionStr || !permissionStr.includes(':')) {
        return false;
    }

    const [reqResource, reqAction] = permissionStr.split(':');

    if (!reqResource || !reqAction) {
        return false;
    }

    for (const perm of permissions) {
        const permStr = perm as string;

        if (!permStr || !permStr.includes(':')) {
            continue;
        }

        const [permResource, permAction] = permStr.split(':');

        if (permResource === reqResource && permAction === '*') {
            return true;
        }
    }

    return false;
}

/**
 * Check if a role has any of the specified permissions
 */
export function hasAnyPermission(role: UserRole, permissions: Permission[]): boolean {
    return permissions.some(permission => hasPermission(role, permission));
}

/**
 * Check if a role has all of the specified permissions
 */
export function hasAllPermissions(role: UserRole, permissions: Permission[]): boolean {
    return permissions.every(permission => hasPermission(role, permission));
}
