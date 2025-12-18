// TypeScript Type Definitions for School Management Frontend

// ============================================
// ENUMS
// ============================================

export enum UserRole {
    SUPERADMIN = 'SUPERADMIN',
    TENANT_ADMIN = 'TENANT_ADMIN',
    ORG_ADMIN = 'ORG_ADMIN',
    BRANCH_ADMIN = 'BRANCH_ADMIN',
    DEPT_ADMIN = 'DEPT_ADMIN',
    STAFF = 'STAFF',
    STUDENT = 'STUDENT',
}

export enum SubscriptionPlan {
    FREE = 'FREE',
    BASIC = 'BASIC',
    PREMIUM = 'PREMIUM',
    ENTERPRISE = 'ENTERPRISE',
}

export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER',
}

export enum AttendanceStatus {
    PRESENT = 'PRESENT',
    ABSENT = 'ABSENT',
    LATE = 'LATE',
    HALF_DAY = 'HALF_DAY',
    LEAVE = 'LEAVE',
}

// ============================================
// AUTH TYPES
// ============================================

export interface User {
    id: string;
    email: string;
    phone?: string;
    role: UserRole;
    tenantId?: number;
    isActive: boolean;
    lastLogin?: string;
    createdAt: string;
    updatedAt: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface RegisterInput {
    email: string;
    phone?: string;
    password: string;
    role: UserRole;
    tenantId?: number;
}

// User Management Types (for admin user CRUD)
export interface UserManagement {
    id: string;
    email: string;
    phone?: string;
    role: UserRole;
    tenantId?: number;
    organizationId?: number;
    branchId?: number;
    departmentId?: number;
    categoryId?: number;
    firstName?: string;
    lastName?: string;
    profilePicture?: string;
    customPermissions?: string[];
    deniedPermissions?: string[];
    isActive: boolean;
    lastLogin?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateUserInput {
    email: string;
    password: string;
    phone?: string;
    role: UserRole;
    tenantId?: number;
    organizationId?: number;
    branchId?: number;
    departmentId?: number;
    categoryId?: number;
    firstName?: string;
    lastName?: string;
    profilePicture?: string;
}

export interface UpdateUserInput {
    email?: string;
    phone?: string;
    role?: UserRole;
    tenantId?: number;
    organizationId?: number;
    branchId?: number;
    departmentId?: number;
    categoryId?: number;
    firstName?: string;
    lastName?: string;
    profilePicture?: string;
    isActive?: boolean;
}


// ============================================
// STRUCTURE ENTITIES
// ============================================

export interface Tenant {
    id: string;
    name: string;
    domainSlug: string;
    subscriptionPlan: SubscriptionPlan;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface TenantInput {
    name: string;
    domainSlug: string;
    subscriptionPlan?: SubscriptionPlan;
}

export interface UpdateTenantInput {
    name?: string;
    domainSlug?: string;
    subscriptionPlan?: SubscriptionPlan;
    isActive?: boolean;
}

export interface Organization {
    id: string;
    tenantId: number;
    name: string;
    region?: string;
    headOfOrg?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface OrganizationInput {
    tenantId: number;
    name: string;
    region?: string;
    headOfOrg?: string;
}

export interface UpdateOrganizationInput {
    tenantId?: number;
    name?: string;
    region?: string;
    headOfOrg?: string;
    isActive?: boolean;
}

export interface Branch {
    id: string;
    organizationId: number;
    tenantId: number;
    name: string;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
    phone?: string;
    email?: string;
    currency: string;
    timezone: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface BranchInput {
    organizationId: number;
    tenantId: number;
    name: string;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
    phone?: string;
    email?: string;
    currency?: string;
    timezone?: string;
}

export interface UpdateBranchInput {
    organizationId?: number;
    tenantId?: number;
    name?: string;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
    phone?: string;
    email?: string;
    currency?: string;
    timezone?: string;
    isActive?: boolean;
}

export interface Department {
    id: string;
    branchId: number;
    name: string;
    code?: string;
    hodName?: string;
    description?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface DepartmentInput {
    branchId: number;
    name: string;
    code?: string;
    hodName?: string;
    description?: string;
}

export interface UpdateDepartmentInput {
    branchId?: number;
    name?: string;
    code?: string;
    hodName?: string;
    description?: string;
    isActive?: boolean;
}

export interface Category {
    id: string;
    departmentId: number;
    name: string;
    description?: string;
    type?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CategoryInput {
    departmentId: number;
    name: string;
    description?: string;
    type?: string;
}

export interface UpdateCategoryInput {
    departmentId?: number;
    name?: string;
    description?: string;
    type?: string;
    isActive?: boolean;
}

// ============================================
// HR & STUDENT TYPES
// ============================================

export interface StaffProfile {
    id: string;
    userId: number;
    tenantId: number;
    branchId: number;
    departmentId?: number;
    categoryId?: number;
    firstName: string;
    lastName: string;
    dateOfBirth?: string;
    gender?: Gender;
    profilePicture?: string;
    designation: string;
    employeeCode: string;
    joiningDate: string;
    salaryGrade?: string;
    qualification?: string;
    experience?: number;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
    emergencyContact?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface StaffProfileInput {
    userId: number;
    tenantId: number;
    branchId: number;
    departmentId?: number;
    categoryId?: number;
    firstName: string;
    lastName: string;
    dateOfBirth?: string;
    gender?: Gender;
    profilePicture?: string;
    designation: string;
    employeeCode: string;
    joiningDate: string;
    salaryGrade?: string;
    qualification?: string;
    experience?: number;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
    emergencyContact?: string;
}

export interface UpdateStaffProfileInput {
    userId?: number;
    tenantId?: number;
    branchId?: number;
    departmentId?: number;
    categoryId?: number;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    gender?: Gender;
    profilePicture?: string;
    designation?: string;
    employeeCode?: string;
    joiningDate?: string;
    salaryGrade?: string;
    qualification?: string;
    experience?: number;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
    emergencyContact?: string;
    isActive?: boolean;
}

export interface Student {
    id: string;
    userId: number;
    tenantId: number;
    branchId: number;
    departmentId?: number;
    categoryId?: number;
    firstName: string;
    lastName: string;
    dateOfBirth?: string;
    gender?: Gender;
    profilePicture?: string;
    admissionNo: string;
    rollNo?: string;
    enrollmentYear: number;
    currentClassId?: number;
    fatherName?: string;
    motherName?: string;
    guardianName?: string;
    guardianPhone?: string;
    guardianEmail?: string;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
    bloodGroup?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface StudentInput {
    userId: number;
    tenantId: number;
    branchId: number;
    departmentId?: number;
    categoryId?: number;
    firstName: string;
    lastName: string;
    dateOfBirth?: string;
    gender?: Gender;
    profilePicture?: string;
    admissionNo: string;
    rollNo?: string;
    enrollmentYear: number;
    currentClassId?: number;
    fatherName?: string;
    motherName?: string;
    guardianName?: string;
    guardianPhone?: string;
    guardianEmail?: string;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
    bloodGroup?: string;
}

export interface UpdateStudentInput {
    userId?: number;
    tenantId?: number;
    branchId?: number;
    departmentId?: number;
    categoryId?: number;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    gender?: Gender;
    profilePicture?: string;
    admissionNo?: string;
    rollNo?: string;
    enrollmentYear?: number;
    currentClassId?: number;
    fatherName?: string;
    motherName?: string;
    guardianName?: string;
    guardianPhone?: string;
    guardianEmail?: string;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
    bloodGroup?: string;
    isActive?: boolean;
}

// ============================================
// ACADEMIC TYPES
// ============================================

export interface AcademicYear {
    id: string;
    branchId: number;
    name: string;
    startDate: string;
    endDate: string;
    isCurrent: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface AcademicYearInput {
    branchId: number;
    name: string;
    startDate: string;
    endDate: string;
    isCurrent?: boolean;
}

export interface UpdateAcademicYearInput {
    branchId?: number;
    name?: string;
    startDate?: string;
    endDate?: string;
    isCurrent?: boolean;
}

export interface Course {
    id: string;
    departmentId: number;
    name: string;
    code?: string;
    description?: string;
    duration?: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CourseInput {
    departmentId: number;
    name: string;
    code?: string;
    description?: string;
    duration?: number;
}

export interface UpdateCourseInput {
    departmentId?: number;
    name?: string;
    code?: string;
    description?: string;
    duration?: number;
    isActive?: boolean;
}

export interface Subject {
    id: string;
    departmentId: number;
    name: string;
    code: string;
    description?: string;
    credits?: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface SubjectInput {
    departmentId: number;
    name: string;
    code: string;
    description?: string;
    credits?: number;
}

export interface UpdateSubjectInput {
    departmentId?: number;
    name?: string;
    code?: string;
    description?: string;
    credits?: number;
    isActive?: boolean;
}

export interface Class {
    id: string;
    branchId: number;
    academicYearId: number;
    courseId: number;
    name: string;
    section?: string;
    maxStudents?: number;
    roomNo?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ClassInput {
    branchId: number;
    academicYearId: number;
    courseId: number;
    name: string;
    section?: string;
    maxStudents?: number;
    roomNo?: string;
}

export interface UpdateClassInput {
    branchId?: number;
    academicYearId?: number;
    courseId?: number;
    name?: string;
    section?: string;
    maxStudents?: number;
    roomNo?: string;
    isActive?: boolean;
}

// ============================================
// PAGINATION
// ============================================

export interface PaginationInput {
    skip?: number;
    take?: number;
}

export interface PageInfo {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    total: number;
}
