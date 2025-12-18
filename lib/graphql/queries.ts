// GraphQL Queries - School Management System
import { gql } from '@apollo/client';

// ============================================
// AUTH QUERIES
// ============================================

export const ME = gql`
  query Me {
    me  {
      id
      email
      role
      tenantId
      isActive
      lastLogin
      createdAt
      updatedAt
    }
  }
`;

// ============================================
// STRUCTURE QUERIES
// ============================================

export const GET_TENANT_DATA = gql`
query TenantData {
  tenants {
    id
    name
    domainSlug
    subscriptionPlan
    isActive
    createdAt
    updatedAt
    organizations {
      id
      tenantId
      name
      region
      headOfOrg
      isActive
      createdAt
      updatedAt
    }
    branches {
      id
      organizationId
      tenantId
      name
      address
      city
      state
      pincode
      phone
      email
      currency
      timezone
      isActive
      createdAt
      updatedAt
    }
    departments {
      id
      branchId
      name
      code
      hodName
      description
      isActive
      createdAt
      updatedAt
    }
    categories {
      id
      departmentId
      name
      description
      type
      isActive
      createdAt
      updatedAt
    }
  }
}`;

export const GET_TENANTS = gql`
  query GetTenants($skip: Int, $take: Int) {
    tenants(skip: $skip, take: $take) {
      id
      name
      domainSlug
      subscriptionPlan
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const GET_TENANT = gql`
  query GetTenant($id: ID!) {
    tenant(id: $id) {
      id
      name
      domainSlug
      subscriptionPlan
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const GET_ORGANIZATIONS = gql`
  query GetOrganizations($tenantId: Int, $skip: Int, $take: Int) {
    organizations(tenantId: $tenantId, skip: $skip, take: $take) {
      id
      tenantId
      name
      region
      headOfOrg
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const GET_ORGANIZATION = gql`
  query GetOrganization($id: ID!) {
    organization(id: $id) {
      id
      tenantId
      name
      region
      headOfOrg
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const GET_BRANCHES = gql`
  query GetBranches($organizationId: Int, $tenantId: Int, $skip: Int, $take: Int) {
    branches(organizationId: $organizationId, tenantId: $tenantId, skip: $skip, take: $take) {
      id
      organizationId
      tenantId
      name
      address
      city
      state
      pincode
      phone
      email
      currency
      timezone
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const GET_BRANCH = gql`
  query GetBranch($id: ID!) {
    branch(id: $id) {
      id
      organizationId
      tenantId
      name
      address
      city
      state
      pincode
      phone
      email
      currency
      timezone
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const GET_DEPARTMENTS = gql`
  query GetDepartments($branchId: Int, $skip: Int, $take: Int) {
    departments(branchId: $branchId, skip: $skip, take: $take) {
      id
      branchId
      name
      code
      hodName
      description
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const GET_DEPARTMENT = gql`
  query GetDepartment($id: ID!) {
    department(id: $id) {
      id
      branchId
      name
      code
      hodName
      description
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories($departmentId: Int, $skip: Int, $take: Int) {
    categories(departmentId: $departmentId, skip: $skip, take: $take) {
      id
      departmentId
      name
      description
      type
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const GET_CATEGORY = gql`
  query GetCategory($id: ID!) {
    category(id: $id) {
      id
      departmentId
      name
      description
      type
      isActive
      createdAt
      updatedAt
    }
  }
`;

// ============================================
// HR & STUDENT QUERIES
// ============================================

export const GET_STAFF_PROFILES = gql`
  query GetStaffProfiles($branchId: Int, $departmentId: Int, $skip: Int, $take: Int) {
    staffProfiles(branchId: $branchId, departmentId: $departmentId, skip: $skip, take: $take) {
      id
      userId
      tenantId
      branchId
      departmentId
      categoryId
      firstName
      lastName
      dateOfBirth
      gender
      profilePicture
      designation
      employeeCode
      joiningDate
      salaryGrade
      qualification
      experience
      address
      city
      state
      pincode
      emergencyContact
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const GET_STAFF_PROFILE = gql`
  query GetStaffProfile($id: ID!) {
    staffProfile(id: $id) {
      id
      userId
      tenantId
      branchId
      departmentId
      categoryId
      firstName
      lastName
      dateOfBirth
      gender
      profilePicture
      designation
      employeeCode
      joiningDate
      salaryGrade
      qualification
      experience
      address
      city
      state
      pincode
      emergencyContact
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const GET_STUDENTS = gql`
  query GetStudents($branchId: Int, $departmentId: Int, $skip: Int, $take: Int) {
    students(branchId: $branchId, departmentId: $departmentId, skip: $skip, take: $take) {
      id
      userId
      tenantId
      branchId
      departmentId
      categoryId
      firstName
      lastName
      dateOfBirth
      gender
      profilePicture
      admissionNo
      rollNo
      enrollmentYear
      currentClassId
      fatherName
      motherName
      guardianName
      guardianPhone
      guardianEmail
      address
      city
      state
      pincode
      bloodGroup
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const GET_STUDENT = gql`
  query GetStudent($id: ID!) {
    student(id: $id) {
      id
      userId
      tenantId
      branchId
      departmentId
      categoryId
      firstName
      lastName
      dateOfBirth
      gender
      profilePicture
      admissionNo
      rollNo
      enrollmentYear
      currentClassId
      fatherName
      motherName
      guardianName
      guardianPhone
      guardianEmail
      address
      city
      state
      pincode
      bloodGroup
      isActive
      createdAt
      updatedAt
    }
  }
`;

// ============================================
// ACADEMIC QUERIES
// ============================================

export const GET_ACADEMIC_YEARS = gql`
  query GetAcademicYears($branchId: Int, $skip: Int, $take: Int) {
    academicYears(branchId: $branchId, skip: $skip, take: $take) {
      id
      branchId
      name
      startDate
      endDate
      isCurrent
      createdAt
      updatedAt
    }
  }
`;

export const GET_ACADEMIC_YEAR = gql`
  query GetAcademicYear($id: ID!) {
    academicYear(id: $id) {
      id
      branchId
      name
      startDate
      endDate
      isCurrent
      createdAt
      updatedAt
    }
  }
`;

export const GET_COURSES = gql`
  query GetCourses($departmentId: Int, $skip: Int, $take: Int) {
    courses(departmentId: $departmentId, skip: $skip, take: $take) {
      id
      departmentId
      name
      code
      description
      duration
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const GET_COURSE = gql`
  query GetCourse($id: ID!) {
    course(id: $id) {
      id
      departmentId
      name
      code
      description
      duration
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const GET_SUBJECTS = gql`
  query GetSubjects($departmentId: Int, $skip: Int, $take: Int) {
    subjects(departmentId: $departmentId, skip: $skip, take: $take) {
      id
      departmentId
      name
      code
      description
      credits
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const GET_SUBJECT = gql`
  query GetSubject($id: ID!) {
    subject(id: $id) {
      id
      departmentId
      name
      code
      description
      credits
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const GET_CLASSES = gql`
  query GetClasses($branchId: Int, $academicYearId: Int, $skip: Int, $take: Int) {
    classes(branchId: $branchId, academicYearId: $academicYearId, skip: $skip, take: $take) {
      id
      branchId
      academicYearId
      courseId
      name
      section
      maxStudents
      roomNo
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const GET_CLASS = gql`
  query GetClass($id: ID!) {
    class(id: $id) {
      id
      branchId
      academicYearId
      courseId
      name
      section
      maxStudents
      roomNo
      isActive
      createdAt
      updatedAt
    }
  }
`;

// ============================================
// USER MANAGEMENT QUERIES
// ============================================

export const GET_USERS = gql`
  query GetUsers($role: UserRole, $tenantId: Int, $skip: Int, $take: Int) {
    users(role: $role, tenantId: $tenantId, skip: $skip, take: $take) {
      id
      email
      phone
      role
      tenantId
      organizationId
      branchId
      departmentId
      categoryId
      firstName
      lastName
      profilePicture
      isActive
      lastLogin
      createdAt
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      email
      phone
      role
      tenantId
      organizationId
      branchId
      departmentId
      categoryId
      customPermissions
      deniedPermissions
      firstName
      lastName
      profilePicture
      isActive
      lastLogin
      createdAt
      updatedAt
    }
  }
`;

// ============================================
// TIMETABLE QUERIES
// ============================================

export const GET_TIMETABLE_SLOTS = gql`
  query GetTimetableSlots($branchId: Int, $classId: Int, $staffId: Int, $skip: Int, $take: Int) {
    classTimetable(branchId: $branchId, classId: $classId, staffId: $staffId, skip: $skip, take: $take) {
      id
      branchId
      classId
      subjectId
      staffId
      dayOfWeek
      startTime
      endTime
      roomNo
      isActive
      createdAt
      updatedAt
      subject {
        id
        name
        code
      }
      staff {
        id
        firstName
        lastName
      }
      class {
        id
        name
      }
    }
  }
`;

export const GET_STAFF_TIMETABLE = gql`
  query GetStaffTimetable($staffId: Int!) {
    staffTimetable(staffId: $staffId) {
      id
      branchId
      classId
      subjectId
      staffId
      dayOfWeek
      startTime
      endTime
      roomNo
      isActive
      subject {
        id
        name
        code
      }
      class {
        id
        name
      }
    }
  }
`;

export const GET_SUBSTITUTIONS = gql`
  query GetSubstitutions($date: DateTime, $status: String, $skip: Int, $take: Int) {
    substitutions(date: $date, status: $status, skip: $skip, take: $take) {
      id
      timetableSlotId
      originalStaffId
      substituteStaffId
      date
      reason
      status
      createdAt
      updatedAt
      timetableSlot {
        id
        subject {
          name
        }
        class {
          name
        }
      }
      originalStaff {
        id
        firstName
        lastName
      }
      substituteStaff {
        id
        firstName
        lastName
      }
    }
  }
`;

export const GET_PERIOD_TEMPLATES = gql`
  query GetPeriodTemplates($branchId: Int, $skip: Int, $take: Int) {
    periodTemplates(branchId: $branchId, skip: $skip, take: $take) {
      id
      branchId
      name
      description
      pattern
      createdAt
      updatedAt
    }
  }
`;
